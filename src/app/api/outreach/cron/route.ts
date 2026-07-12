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
  let totalDiscovered = 0;
  const businessTypes: string[] = [];

  // Step 1a: Discover via Google Places (3 rounds)
  for (let i = 0; i < 3; i++) {
    try {
      const discoverRes = await fetch(`${baseUrl}/api/outreach/discover`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
      });
      const data = await discoverRes.json();
      results[`discovery_${i + 1}`] = data;
      totalDiscovered += data.added || 0;
      if (data.type) businessTypes.push(data.type);
    } catch (error) {
      results[`discovery_${i + 1}`] = { error: String(error) };
    }
  }

  // Step 1b: Discover via Apollo (2 rounds)
  for (let i = 0; i < 2; i++) {
    try {
      const apolloRes = await fetch(`${baseUrl}/api/outreach/discover-apollo`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
      });
      const data = await apolloRes.json();
      results[`apollo_${i + 1}`] = data;
      totalDiscovered += data.added || 0;
      if (data.location) businessTypes.push(`apollo: ${data.location}`);
    } catch (error) {
      results[`apollo_${i + 1}`] = { error: String(error) };
    }
  }

  // Step 2: Deduplicate — remove businesses with duplicate emails
  const { data: allDiscovered } = await supabaseAdmin
    .from("businesses")
    .select("id, email, name")
    .eq("status", "discovered")
    .not("email", "is", null)
    .order("created_at", { ascending: true });

  let dupsRemoved = 0;
  if (allDiscovered) {
    const seenEmails = new Set<string>();
    const seenNames = new Set<string>();
    for (const biz of allDiscovered) {
      const emailLower = biz.email?.toLowerCase();
      const nameLower = biz.name?.toLowerCase();

      if (
        (emailLower && seenEmails.has(emailLower)) ||
        (nameLower && seenNames.has(nameLower))
      ) {
        await supabaseAdmin.from("businesses").delete().eq("id", biz.id);
        dupsRemoved++;
      } else {
        if (emailLower) seenEmails.add(emailLower);
        if (nameLower) seenNames.add(nameLower);
      }
    }
  }

  // Also check discovered against already contacted/emailed businesses
  const { data: contactedEmails } = await supabaseAdmin
    .from("businesses")
    .select("email, name")
    .neq("status", "discovered")
    .not("email", "is", null);

  const contactedEmailSet = new Set(
    (contactedEmails || []).map((b) => b.email?.toLowerCase())
  );
  const contactedNameSet = new Set(
    (contactedEmails || []).map((b) => b.name?.toLowerCase())
  );

  const { data: discoveredAfterDedup } = await supabaseAdmin
    .from("businesses")
    .select("id, email, name")
    .eq("status", "discovered")
    .not("email", "is", null);

  if (discoveredAfterDedup) {
    for (const biz of discoveredAfterDedup) {
      if (
        contactedEmailSet.has(biz.email?.toLowerCase()) ||
        contactedNameSet.has(biz.name?.toLowerCase())
      ) {
        await supabaseAdmin.from("businesses").delete().eq("id", biz.id);
        dupsRemoved++;
      }
    }
  }

  results.dedup = { removed: dupsRemoved };

  // Step 3: Send outreach emails
  let totalEmailed = 0;
  try {
    const sendRes = await fetch(`${baseUrl}/api/outreach/send`, {
      method: "POST",
      headers: { "x-admin-password": adminPassword },
    });
    const data = await sendRes.json();
    results.outreach = data;
    totalEmailed = data.sent || 0;
  } catch (error) {
    results.outreach = { error: String(error) };
  }

  // Step 4: Get the list of businesses that were just emailed
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data: todaysEmails } = await supabaseAdmin
    .from("outreach_emails")
    .select("to_email, subject, business_id, businesses(name, type, lead_source)")
    .gte("sent_at", todayStart.toISOString())
    .order("sent_at", { ascending: false });

  // Also get remaining discovered for next batch preview
  const { data: readyToEmail } = await supabaseAdmin
    .from("businesses")
    .select("name, type, email, lead_source, notes")
    .eq("status", "discovered")
    .not("email", "is", null)
    .order("created_at", { ascending: false })
    .limit(30);

  // Step 5: Get pipeline stats
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

  const goalProgress = ((stats.total_raised / 100000) * 100).toFixed(1);

  // Step 6: Send daily report email
  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailedRows = (todaysEmails || [])
    .map(
      (e: Record<string, unknown>) => {
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
      }
    )
    .join("");

  await resend.emails.send({
    from: "Nick Pohl <nick@defineyourself916.org>",
    to: "defineyourself916@gmail.com",
    replyTo: "defineyourself916@gmail.com",
    subject: `Outreach Report — ${totalEmailed} emails sent, ${totalDiscovered} discovered`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">
        <h1 style="font-size:22px;color:#111;">Daily Outreach Report</h1>
        <p style="color:#666;font-size:14px;">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "America/Los_Angeles" })}</p>

        <div style="background:#f8f8f8;padding:20px;margin:20px 0;">
          <h2 style="font-size:16px;color:#111;margin-top:0;">Today's Activity</h2>
          <p style="margin:4px 0;"><strong>${totalDiscovered}</strong> new businesses discovered</p>
          <p style="margin:4px 0;"><strong>${dupsRemoved}</strong> duplicates removed</p>
          <p style="margin:4px 0;"><strong>${totalEmailed}</strong> outreach emails sent</p>
          <p style="margin:4px 0;"><strong>${(readyToEmail || []).length}</strong> in queue for tomorrow</p>
        </div>

        <div style="background:#111;color:#fff;padding:20px;margin:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#999;">$100K Goal</p>
          <p style="margin:8px 0;font-size:32px;font-weight:bold;">$${stats.total_raised.toLocaleString()}</p>
          <p style="margin:0;font-size:14px;color:#999;">${goalProgress}% of goal</p>
        </div>

        ${emailedRows ? `
        <h2 style="font-size:16px;color:#111;">Businesses Emailed Today</h2>
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
          <h2 style="font-size:16px;color:#111;margin-top:0;">Pipeline Overview</h2>
          <table style="width:100%;font-size:14px;">
            <tr><td>Total Businesses</td><td style="text-align:right;"><strong>${stats.total}</strong></td></tr>
            <tr><td>Discovered (pending)</td><td style="text-align:right;"><strong>${stats.discovered}</strong></td></tr>
            <tr><td>Contacted</td><td style="text-align:right;"><strong>${stats.contacted}</strong></td></tr>
            <tr><td>Opened</td><td style="text-align:right;"><strong>${stats.opened}</strong></td></tr>
            <tr><td>Interested</td><td style="text-align:right;"><strong>${stats.interested}</strong></td></tr>
            <tr><td>Donated</td><td style="text-align:right;"><strong>${stats.donated}</strong></td></tr>
            <tr><td>Declined</td><td style="text-align:right;"><strong>${stats.declined}</strong></td></tr>
          </table>
        </div>

        <p style="margin-top:20px;font-size:12px;color:#999;">
          <a href="https://defineyourself916.org/admin/outreach" style="color:#111;">View full dashboard</a>
        </p>
      </div>
    `,
  });

  // Step 7: If it's Monday, also send weekly report
  const now = new Date();
  const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/Los_Angeles" }).format(now);

  if (dayOfWeek === "Monday") {
    try {
      await fetch(`${baseUrl}/api/outreach/weekly-report`, {
        headers: { authorization: `Bearer ${process.env.CRON_SECRET}` },
      });
      results.weekly_report = "sent";
    } catch (error) {
      results.weekly_report = { error: String(error) };
    }
  }

  return NextResponse.json({
    message: "Daily outreach cron completed",
    timestamp: new Date().toISOString(),
    discovered: totalDiscovered,
    dupsRemoved,
    emailed: totalEmailed,
    stats,
  });
}
