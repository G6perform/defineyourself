import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get date range for the past week
  const weekEnd = new Date();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  // Emails sent this week
  const { data: weekEmails, count: emailsSent } = await supabaseAdmin
    .from("outreach_emails")
    .select("*", { count: "exact" })
    .gte("sent_at", weekStart.toISOString())
    .lte("sent_at", weekEnd.toISOString());

  // Businesses discovered this week
  const { count: discovered } = await supabaseAdmin
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .gte("discovered_at", weekStart.toISOString());

  // Businesses that moved to interested this week
  const { count: newInterested } = await supabaseAdmin
    .from("businesses")
    .select("*", { count: "exact", head: true })
    .eq("status", "interested")
    .gte("last_activity_at", weekStart.toISOString());

  // Businesses that donated this week
  const { data: newDonors } = await supabaseAdmin
    .from("businesses")
    .select("name, type, donated_amount, donated_at")
    .eq("status", "donated")
    .gte("donated_at", weekStart.toISOString());

  const weekDonated = (newDonors || []).reduce(
    (sum, d) => sum + Number(d.donated_amount || 0),
    0
  );

  // Overall pipeline stats
  const { data: allBusinesses } = await supabaseAdmin
    .from("businesses")
    .select("status, donated_amount");

  const stats = {
    total: 0,
    discovered: 0,
    contacted: 0,
    opened: 0,
    interested: 0,
    donated: 0,
    declined: 0,
    total_raised: 0,
  };

  if (allBusinesses) {
    stats.total = allBusinesses.length;
    for (const biz of allBusinesses) {
      if (biz.status in stats) {
        stats[biz.status as keyof typeof stats]++;
      }
      if (biz.donated_amount) {
        stats.total_raised += Number(biz.donated_amount);
      }
    }
  }

  // Top business types emailed
  const typeCounts: Record<string, number> = {};
  if (weekEmails) {
    for (const e of weekEmails) {
      // We don't have type on emails, so we'll skip type breakdown for now
    }
  }

  const goalProgress = ((stats.total_raised / 100000) * 100).toFixed(1);
  const weekStartStr = weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/Los_Angeles" });
  const weekEndStr = weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/Los_Angeles" });

  const donorRows = (newDonors || [])
    .map(
      (d) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">${d.name}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">${d.type || "—"}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">$${Number(d.donated_amount).toLocaleString()}</td>
        </tr>`
    )
    .join("");

  // Conversion rate
  const conversionRate =
    stats.contacted > 0
      ? ((stats.donated / (stats.contacted + stats.opened + stats.interested + stats.donated + stats.declined)) * 100).toFixed(1)
      : "0.0";

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Nick Pohl <nick@defineyourself916.org>",
    to: "defineyourself916@gmail.com",
    replyTo: "defineyourself916@gmail.com",
    subject: `Weekly Outreach Report — ${weekStartStr} to ${weekEndStr}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <h1 style="font-size:22px;color:#111;">Weekly Outreach Report</h1>
        <p style="color:#666;font-size:14px;">${weekStartStr} — ${weekEndStr}</p>

        <div style="background:#111;color:#fff;padding:24px;margin:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#999;">$100K Goal</p>
          <p style="margin:8px 0;font-size:36px;font-weight:bold;">$${stats.total_raised.toLocaleString()}</p>
          <p style="margin:0;font-size:14px;color:#999;">${goalProgress}% of goal</p>
        </div>

        <div style="background:#f8f8f8;padding:20px;margin:20px 0;">
          <h2 style="font-size:16px;color:#111;margin-top:0;">This Week</h2>
          <table style="width:100%;font-size:14px;">
            <tr><td>Businesses Discovered</td><td style="text-align:right;"><strong>${discovered || 0}</strong></td></tr>
            <tr><td>Emails Sent</td><td style="text-align:right;"><strong>${emailsSent || 0}</strong></td></tr>
            <tr><td>New Interested Leads</td><td style="text-align:right;"><strong>${newInterested || 0}</strong></td></tr>
            <tr><td>New Donations</td><td style="text-align:right;"><strong>${(newDonors || []).length}</strong></td></tr>
            <tr><td>Raised This Week</td><td style="text-align:right;"><strong>$${weekDonated.toLocaleString()}</strong></td></tr>
          </table>
        </div>

        <div style="background:#f8f8f8;padding:20px;margin:20px 0;">
          <h2 style="font-size:16px;color:#111;margin-top:0;">All-Time Pipeline</h2>
          <table style="width:100%;font-size:14px;">
            <tr><td>Total Businesses</td><td style="text-align:right;"><strong>${stats.total}</strong></td></tr>
            <tr><td>Contacted</td><td style="text-align:right;"><strong>${stats.contacted}</strong></td></tr>
            <tr><td>Opened</td><td style="text-align:right;"><strong>${stats.opened}</strong></td></tr>
            <tr><td>Interested</td><td style="text-align:right;"><strong>${stats.interested}</strong></td></tr>
            <tr><td>Donated</td><td style="text-align:right;"><strong>${stats.donated}</strong></td></tr>
            <tr><td>Declined</td><td style="text-align:right;"><strong>${stats.declined}</strong></td></tr>
            <tr><td>Conversion Rate</td><td style="text-align:right;"><strong>${conversionRate}%</strong></td></tr>
          </table>
        </div>

        ${donorRows ? `
        <h2 style="font-size:16px;color:#111;">Donors This Week</h2>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">
          <tr style="background:#f0f0f0;">
            <th style="padding:6px 12px;text-align:left;">Business</th>
            <th style="padding:6px 12px;text-align:left;">Type</th>
            <th style="padding:6px 12px;text-align:left;">Amount</th>
          </tr>
          ${donorRows}
        </table>
        ` : `<p style="color:#666;font-size:14px;">No donations this week yet — keep going!</p>`}

        <p style="margin-top:30px;font-size:12px;color:#999;">
          <a href="https://defineyourself916.org/admin/outreach" style="color:#111;">View full dashboard</a>
        </p>
      </div>
    `,
  });

  return NextResponse.json({
    message: "Weekly report sent",
    week: `${weekStartStr} - ${weekEndStr}`,
    emailsSent,
    discovered,
    newInterested,
    newDonors: (newDonors || []).length,
    weekDonated,
    totalRaised: stats.total_raised,
  });
}
