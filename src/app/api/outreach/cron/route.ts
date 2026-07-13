import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://defineyourself916.org";

  const adminPassword = process.env.ADMIN_PASSWORD || "";
  const results: Record<string, unknown> = {};

  // Step 1: Send outreach emails (6 rounds of 5)
  let totalEmailed = 0;
  for (let i = 0; i < 6; i++) {
    try {
      const sendRes = await fetch(`${baseUrl}/api/outreach/send`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
      });
      const data = await sendRes.json();
      results[`send_${i + 1}`] = data;
      totalEmailed += data.sent || 0;
      if (data.sent === 0) break;
    } catch (error) {
      results[`send_${i + 1}`] = { error: String(error) };
      break;
    }
  }

  // Step 2: Get today's emailed businesses
  const ptDate = new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });
  const todayStart = new Date(`${ptDate}T00:00:00-07:00`);

  const { data: todaysEmails } = await supabaseAdmin
    .from("outreach_emails")
    .select("to_email, subject, business_id, businesses(name, type, lead_source)")
    .gte("sent_at", todayStart.toISOString())
    .order("sent_at", { ascending: false });

  const { data: readyToEmail } = await supabaseAdmin
    .from("businesses")
    .select("id")
    .eq("status", "discovered")
    .not("email", "is", null);

  // Step 3: Get pipeline stats
  const { data: allBusinesses } = await supabaseAdmin
    .from("businesses")
    .select("status, donated_amount");

  const stats = { total: 0, discovered: 0, contacted: 0, opened: 0, interested: 0, donated: 0, declined: 0, total_raised: 0 };
  if (allBusinesses) {
    stats.total = allBusinesses.length;
    for (const biz of allBusinesses) {
      if (biz.status in stats) stats[biz.status as keyof typeof stats]++;
      if (biz.donated_amount) stats.total_raised += Number(biz.donated_amount);
    }
  }

  const goalProgress = ((stats.total_raised / 100000) * 100).toFixed(1);

  // Step 4: Send daily report
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailedRows = (todaysEmails || [])
    .map((e: Record<string, unknown>) => {
      const biz = e.businesses as Record<string, string> | null;
      const source = biz?.lead_source || "manual";
      const color = source === "apollo" ? "#f3e8ff;color:#6b21a8" : "#dbeafe;color:#1e40af";
      return `<tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${biz?.name || "Unknown"}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${biz?.type || "—"}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${e.to_email}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">
          <span style="background:${color};padding:2px 6px;font-size:11px;font-weight:bold;text-transform:uppercase;">${source}</span>
        </td>
      </tr>`;
    })
    .join("");

  await resend.emails.send({
    from: "Nick Pohl <nick@defineyourself916.org>",
    to: "defineyourself916@gmail.com",
    replyTo: "defineyourself916@gmail.com",
    subject: `Outreach Report — ${totalEmailed} emails sent`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">
        <h1 style="font-size:22px;color:#111;">Daily Outreach Report</h1>
        <p style="color:#666;font-size:14px;">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "America/Los_Angeles" })}</p>

        <div style="background:#f8f8f8;padding:20px;margin:20px 0;">
          <p style="margin:4px 0;"><strong>${totalEmailed}</strong> outreach emails sent</p>
          <p style="margin:4px 0;"><strong>${(readyToEmail || []).length}</strong> in queue for tomorrow</p>
        </div>

        <div style="background:#111;color:#fff;padding:20px;margin:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#999;">$100K Goal</p>
          <p style="margin:8px 0;font-size:32px;font-weight:bold;">$${stats.total_raised.toLocaleString()}</p>
          <p style="margin:0;font-size:14px;color:#999;">${goalProgress}% of goal</p>
        </div>

        ${emailedRows ? `
        <h2 style="font-size:16px;color:#111;">Businesses Emailed</h2>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">
          <tr style="background:#f0f0f0;">
            <th style="padding:6px 12px;text-align:left;">Business</th>
            <th style="padding:6px 12px;text-align:left;">Type</th>
            <th style="padding:6px 12px;text-align:left;">Email</th>
            <th style="padding:6px 12px;text-align:left;">Source</th>
          </tr>
          ${emailedRows}
        </table>
        ` : `<p style="color:#666;">No emails sent today.</p>`}

        <div style="background:#f8f8f8;padding:20px;margin:20px 0;">
          <h2 style="font-size:16px;color:#111;margin-top:0;">Pipeline</h2>
          <table style="width:100%;font-size:14px;">
            <tr><td>Total</td><td style="text-align:right;"><strong>${stats.total}</strong></td></tr>
            <tr><td>Discovered</td><td style="text-align:right;"><strong>${stats.discovered}</strong></td></tr>
            <tr><td>Contacted</td><td style="text-align:right;"><strong>${stats.contacted}</strong></td></tr>
            <tr><td>Interested</td><td style="text-align:right;"><strong>${stats.interested}</strong></td></tr>
            <tr><td>Donated</td><td style="text-align:right;"><strong>${stats.donated}</strong></td></tr>
          </table>
        </div>

        <p style="font-size:12px;color:#999;"><a href="https://defineyourself916.org/admin/outreach" style="color:#111;">View dashboard</a></p>
      </div>
    `,
  });

  // Step 5: Weekly report + grant discovery on Mondays
  const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/Los_Angeles" }).format(new Date());
  if (dayOfWeek === "Monday") {
    try {
      await fetch(`${baseUrl}/api/outreach/weekly-report`, {
        headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
      });
      results.weekly_report = "sent";
    } catch (error) {
      results.weekly_report = { error: String(error) };
    }
    try {
      await fetch(`${baseUrl}/api/grants/discover`, {
        headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
      });
      results.grant_discovery = "sent";
    } catch (error) {
      results.grant_discovery = { error: String(error) };
    }
  }

  return NextResponse.json({
    message: "Daily outreach completed",
    timestamp: new Date().toISOString(),
    emailed: totalEmailed,
    stats,
  });
}
