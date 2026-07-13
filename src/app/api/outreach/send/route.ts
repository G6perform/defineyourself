import { NextResponse } from "next/server";
import { Resend } from "resend";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are writing cold outreach emails on behalf of Nicholas Pohl, founder of Define Yourself Inc., a 501(c)(3) non-profit (EIN 88-3419481) in Sacramento, CA.

Define Yourself empowers youth through sport, mentorship, education, financial literacy, and career development. The core programs are:
- Athlete Development Scholarships
- Identification Camps (showcasing underserved athletes to recruiters)
- Elite Athlete Mentorship
- Performance Access (combine testing for underfunded schools)
- Define Yourself Teams (youth sports teams)
- Financial Literacy & Career Development

The key message: "The athletes with the most promise often have the least access. We exist to close that gap."

You are asking local Sacramento businesses for cash donations. Key selling points:
- 501(c)(3) tax-deductible donation
- Supporting local Sacramento youth
- Business gets recognition as a community partner
- Every dollar directly funds programs

Write in Nick's voice — genuine, direct, not overly formal. Keep it short (3-4 paragraphs max). Personalize based on the business name and type. Don't be pushy. End with a clear ask and Nick's contact info.

Sign off as:
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
  const dailyLimit = parseInt(config.daily_email_limit || "20");

  // Check how many emails sent today (Pacific time)
  const ptDate = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
  const todayStart = new Date(`${ptDate}T00:00:00-07:00`);

  const { count: sentToday } = await supabaseAdmin
    .from("outreach_emails")
    .select("*", { count: "exact", head: true })
    .gte("sent_at", todayStart.toISOString());

  const remaining = dailyLimit - (sentToday || 0);
  if (remaining <= 0) {
    return NextResponse.json({
      message: "Daily email limit reached",
      sent: 0,
    });
  }

  // Get discovered businesses with emails that haven't been contacted
  const { data: businesses } = await supabaseAdmin
    .from("businesses")
    .select("*")
    .eq("status", "discovered")
    .not("email", "is", null)
    .limit(Math.min(remaining, 5));

  if (!businesses || businesses.length === 0) {
    return NextResponse.json({
      message: "No new businesses to contact",
      sent: 0,
    });
  }

  let sent = 0;

  for (const biz of businesses) {
    try {
      // Generate personalized email with Claude
      const response = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Write a donation outreach email to ${biz.name}, a ${biz.type || "local business"} in ${biz.city || "Sacramento"}. ${biz.google_rating ? `They have a ${biz.google_rating} star rating on Google.` : ""} Make it personal and genuine. Return ONLY the email body (no subject line, no "Subject:" prefix). Use HTML formatting with <p> tags.`,
          },
        ],
      });

      const emailBody =
        response.content[0].type === "text" ? response.content[0].text : "";

      // Generate subject line
      const subjectResponse = await anthropic.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 100,
        messages: [
          {
            role: "user",
            content: `Write a short, compelling email subject line for a donation request from a youth sports non-profit (Define Yourself Inc.) to ${biz.name}. Return ONLY the subject line, nothing else. No quotes.`,
          },
        ],
      });

      const subject =
        subjectResponse.content[0].type === "text"
          ? subjectResponse.content[0].text.trim()
          : `Supporting Sacramento Youth Through Define Yourself Inc.`;

      // Send email
      const emailResult = await resend.emails.send({
        from: `Nick Pohl <${config.from_email || "nick@defineyourself916.org"}>`,
        to: biz.email!,
        replyTo: config.reply_to || "defineyourself916@gmail.com",
        subject,
        html: emailBody,
      });

      // Log the email
      await supabaseAdmin.from("outreach_emails").insert({
        business_id: biz.id,
        resend_id: emailResult.data?.id,
        from_email: config.from_email || "nick@defineyourself916.org",
        to_email: biz.email,
        subject,
        body_html: emailBody,
        status: "sent",
      });

      // Update business status
      await supabaseAdmin
        .from("businesses")
        .update({
          status: "contacted",
          contacted_at: new Date().toISOString(),
          last_activity_at: new Date().toISOString(),
        })
        .eq("id", biz.id);

      sent++;
    } catch (error) {
      console.error(`Failed to send to ${biz.name}:`, error);
    }
  }

  return NextResponse.json({ message: `Sent ${sent} emails`, sent });
}
