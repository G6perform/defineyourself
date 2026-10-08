import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { email, name, source } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const normalized = email.toLowerCase().trim();

  // Check if already subscribed
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("id, unsubscribed_at")
    .eq("email", normalized)
    .single();

  if (existing) {
    if (existing.unsubscribed_at) {
      // Re-subscribe
      await supabase
        .from("newsletter_subscribers")
        .update({ unsubscribed_at: null, name: name || undefined })
        .eq("id", existing.id);
      return NextResponse.json({ success: true, resubscribed: true });
    }
    return NextResponse.json({ success: true, already: true });
  }

  const { error } = await supabase.from("newsletter_subscribers").insert({
    email: normalized,
    name: name || null,
    source: source || "website",
  });

  if (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
