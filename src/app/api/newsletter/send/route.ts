import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "@/app/api/outreach/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { subject, body } = await request.json();

  if (!subject || !body) {
    return NextResponse.json({ error: "Subject and body required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Get active subscribers
  const { data: subscribers } = await supabase
    .from("newsletter_subscribers")
    .select("email, name")
    .is("unsubscribed_at", null);

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ error: "No active subscribers" }, { status: 400 });
  }

  let sent = 0;
  let failed = 0;

  // Send in batches of 10
  for (let i = 0; i < subscribers.length; i += 10) {
    const batch = subscribers.slice(i, i + 10);
    const promises = batch.map(async (sub) => {
      try {
        const unsubUrl = `https://defineyourself916.org/api/newsletter/unsubscribe?email=${encodeURIComponent(sub.email)}`;
        const htmlWithUnsub = `${body}<div style="text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #e0e0e0;"><p style="color:#999;font-size:12px;">Define Yourself Inc. &middot; Sacramento, CA &middot; 501(c)(3) EIN 88-3419481</p><p style="color:#999;font-size:11px;"><a href="${unsubUrl}" style="color:#999;">Unsubscribe</a></p></div>`;

        await resend.emails.send({
          from: "Define Yourself <nick@defineyourself916.org>",
          to: sub.email,
          subject,
          html: htmlWithUnsub,
        });
        sent++;
      } catch (err) {
        console.error(`Failed to send to ${sub.email}:`, err);
        failed++;
      }
    });
    await Promise.all(promises);
  }

  // Log to history
  await supabase.from("newsletter_history").insert({
    subject,
    body,
    recipients_count: sent,
  });

  return NextResponse.json({ success: true, sent, failed, total: subscribers.length });
}
