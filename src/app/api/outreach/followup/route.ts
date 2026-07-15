import { NextResponse } from "next/server";
import { Resend } from "resend";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const SYSTEM_PROMPT = `You are writing a follow-up email on behalf of Nicholas Pohl, founder of Define Yourself Inc., a 501(c)(3) non-profit (EIN 88-3419481) in Sacramento, CA.

This business was emailed about 5 days ago asking for a donation but didn't respond. This is a gentle follow-up — NOT a copy of the first email.

Rules:
- Keep it SHORT — 2-3 sentences max
- Reference that you reached out earlier
- Don't repeat the full pitch — just a quick nudge
- Be warm and genuine, not pushy
- End with a simple ask (quick call, or donate link)
- Sign as Nick

Example tone:
"Hi — I reached out last week about Define Yourself, our youth sports nonprofit here in Sacramento. Just wanted to make sure it didn't get lost. If you have a minute, I'd love to tell you what we're building for local kids. Either way, appreciate your time."

Nick Pohl
Define Yourself Inc.
(530) 601-6625 | defineyourself916.org`;

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Get settings
  const { data: settings } = await supabaseAdmin
    .from("outreach_settings")
    .select("key, value");

  const config = Object.fromEntries(
    (settings || []).map((s) => [s.key, s.value])
  );
  const followUpDays = parseInt(config.follow_up_days || "5");
  const maxFollowUps = parseInt(config.max_follow_ups || "2");

  // Find businesses contacted X days ago that haven't responded
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - followUpDays);

  const { data: candidates } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("status", "contacted")
    .not("email", "is", null)
    .lte("contacted_at", cutoff.toISOString());

  if (!candidates || candidates.length === 0) {
    return NextResponse.json({ message: "No follow-ups needed", sent: 0 });
  }

  let sent = 0;

  for (const biz of candidates.slice(0, 5)) {
    // Check how many follow-ups already sent
    const { count } = await supabaseAdmin
      .from("outreach_emails")
      .select("*", { count: "exact", head: true })
      .eq("business_id", biz.id);

    // First email + max follow-ups
    if ((count || 0) > maxFollowUps) continue;

    try {
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Write a short follow-up email to ${biz.name}, a ${biz.type || "local business"} in Sacramento. This is follow-up #${(count || 1)}. Keep it to 2-3 sentences. Return ONLY the email body in HTML with <p> tags.`,
          },
        ],
      });

      const emailBody =
        response.content[0].type === "text" ? response.content[0].text : "";

      const followUpNum = (count || 1);
      const subject = followUpNum === 1
        ? `Following up — Define Yourself Inc.`
        : `Quick follow-up — Define Yourself Inc.`;

      const emailResult = await resend.emails.send({
        from: `Nick Pohl <${config.from_email || "nick@defineyourself916.org"}>`,
        to: biz.email!,
        replyTo: config.reply_to || "defineyourself916@gmail.com",
        subject,
        html: emailBody,
      });

      await supabaseAdmin.from("outreach_emails").insert({
        business_id: biz.id,
        resend_id: emailResult.data?.id,
        from_email: config.from_email || "nick@defineyourself916.org",
        to_email: biz.email,
        subject,
        body_html: emailBody,
        status: "sent",
      });

      await supabaseAdmin
        .from("businesses")
        .update({ last_activity_at: new Date().toISOString() })
        .eq("id", biz.id);

      sent++;
    } catch (error) {
      console.error(`Follow-up failed for ${biz.name}:`, error);
    }
  }

  return NextResponse.json({ message: `Sent ${sent} follow-ups`, sent });
}
