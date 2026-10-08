import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const normalized = email.toLowerCase().trim();

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("email", normalized);

  if (error) {
    console.error("Unsubscribe error:", error);
  }

  // Redirect to unsubscribe confirmation page
  return NextResponse.redirect(new URL("/unsubscribe?done=1", request.url));
}
