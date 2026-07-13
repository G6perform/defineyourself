import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const DY_NUMBER = "+19162498642";

const SYSTEM_PROMPT = `You are texting on behalf of Nick Pohl, founder of Define Yourself Inc., a 501(c)(3) non-profit in Sacramento that empowers youth through sport, mentorship, education, financial literacy, and career development.

This business previously received a donation request email. They are now texting back showing interest. Your job is to:
- Be warm, genuine, and grateful for their interest
- Answer any questions about Define Yourself
- Explain the tax-deductible donation benefit (EIN 88-3419481)
- Guide them toward making a donation
- Offer to set up a quick call with Nick if they want to learn more
- Share the donation link when appropriate: https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17833

Key facts:
- 501(c)(3), EIN 88-3419481
- Programs: scholarships, ID camps, mentorship, performance access, youth teams, financial literacy, career development
- Based in Sacramento, CA
- Every dollar goes directly to youth athletes who have the drive but not the access
- Nick's direct number: (530) 601-6625

Keep texts short and conversational. Sign as Nick. Don't be pushy.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Dialpad webhook payload
    const inboundNumber = body.from_number || body.caller_number || body.from;
    const message = body.text || body.message || body.body || "";
    const direction = body.direction || "inbound";

    // Ignore outbound messages (our own sends)
    if (direction === "outbound" || !inboundNumber || !message) {
      return NextResponse.json({ ok: true });
    }

    // Clean the phone number
    const cleanNumber = inboundNumber.replace(/\D/g, "").replace(/^1/, "");

    // Find the business by phone number
    const { data: business } = await supabaseAdmin
      .from("businesses")
      .select("*")
      .or(`phone.ilike.%${cleanNumber.slice(-7)}%,phone.ilike.%${cleanNumber.slice(-10)}%`)
      .single();

    // Log inbound text
    await supabaseAdmin.from("outreach_texts").insert({
      business_id: business?.id || null,
      direction: "inbound",
      from_number: inboundNumber,
      to_number: DY_NUMBER,
      message,
    });

    // If we found the business, update status to interested
    if (business && business.status !== "donated") {
      await supabaseAdmin
        .from("businesses")
        .update({
          status: "interested",
          last_activity_at: new Date().toISOString(),
        })
        .eq("id", business.id);
    }

    // Get conversation history
    const { data: history } = await supabaseAdmin
      .from("outreach_texts")
      .select("direction, message, sent_at")
      .eq(business ? "business_id" : "from_number", business ? business.id : inboundNumber)
      .order("sent_at", { ascending: true })
      .limit(20);

    // Build conversation for Claude
    const messages: { role: "user" | "assistant"; content: string }[] = (history || []).map(
      (h) => ({
        role: (h.direction === "inbound" ? "user" : "assistant") as "user" | "assistant",
        content: h.message,
      })
    );

    // Make sure last message is the current inbound
    if (messages.length === 0 || messages[messages.length - 1].content !== message) {
      messages.push({ role: "user", content: message });
    }

    // Generate response with Claude
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const businessContext = business
      ? `\nYou're texting with someone from ${business.name} (${business.type || "local business"}). ${business.notes || ""}`
      : "\nThis number isn't in our system yet — they may have gotten our email and are reaching out.";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: SYSTEM_PROMPT + businessContext,
      messages,
    });

    const replyText =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Send reply via Dialpad API
    if (process.env.DIALPAD_API_KEY) {
      await fetch("https://dialpad.com/api/v2/sms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.DIALPAD_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_numbers: [inboundNumber],
          from_number: DY_NUMBER,
          text: replyText,
        }),
      });
    }

    // Log outbound reply
    await supabaseAdmin.from("outreach_texts").insert({
      business_id: business?.id || null,
      direction: "outbound",
      from_number: DY_NUMBER,
      to_number: inboundNumber,
      message: replyText,
    });

    // Notify Nick via email
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "Nick Pohl <nick@defineyourself916.org>",
        to: "defineyourself916@gmail.com",
        replyTo: "defineyourself916@gmail.com",
        subject: `Text from ${business?.name || inboundNumber} — interested lead`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:500px;">
            <h2 style="font-size:18px;color:#111;">Interested Lead</h2>
            <p style="color:#666;font-size:14px;">${business?.name || "Unknown business"} (${business?.type || ""})</p>
            <div style="background:#f8f8f8;padding:16px;margin:12px 0;">
              <p style="margin:0;font-size:14px;"><strong>Them:</strong> ${message}</p>
            </div>
            <div style="background:#e8f5e9;padding:16px;margin:12px 0;">
              <p style="margin:0;font-size:14px;"><strong>Auto-reply:</strong> ${replyText}</p>
            </div>
            <p style="font-size:12px;color:#999;">
              <a href="https://defineyourself916.org/admin/outreach" style="color:#111;">View dashboard</a>
            </p>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true, replied: true });
  } catch (error) {
    console.error("SMS handler error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
