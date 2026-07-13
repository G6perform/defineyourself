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

  let totalDiscovered = 0;
  const businessTypes: string[] = [];

  // Step 1: Discover new businesses (3 Google Places + 2 Apollo)
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(`${baseUrl}/api/outreach/discover`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
      });
      const data = await res.json();
      totalDiscovered += data.added || 0;
      if (data.type) businessTypes.push(data.type);
    } catch {}
  }

  for (let i = 0; i < 2; i++) {
    try {
      const res = await fetch(`${baseUrl}/api/outreach/discover-apollo`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
      });
      const data = await res.json();
      totalDiscovered += data.added || 0;
    } catch {}
  }

  // Step 2: Deduplicate
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

  // Step 3: Get preview list
  const { data: readyToEmail } = await supabaseAdmin
    .from("businesses")
    .select("name, type, email, lead_source, notes")
    .eq("status", "discovered")
    .not("email", "is", null)
    .order("created_at", { ascending: false })
    .limit(30);

  // Step 4: Get pipeline stats
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

  // Step 5: Send preview email
  const resend = new Resend(process.env.RESEND_API_KEY);

  const rows = (readyToEmail || [])
    .map((b) => {
      const color = b.lead_source === "apollo" ? "#f3e8ff;color:#6b21a8" : "#dbeafe;color:#1e40af";
      return `<tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${b.name}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${b.type || "—"}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${b.email}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">
          <span style="background:${color};padding:2px 6px;font-size:11px;font-weight:bold;text-transform:uppercase;">${b.lead_source || "manual"}</span>
        </td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:12px;color:#666;">${b.notes || "—"}</td>
      </tr>`;
    })
    .join("");

  await resend.emails.send({
    from: "Nick Pohl <nick@defineyourself916.org>",
    to: "defineyourself916@gmail.com",
    replyTo: "defineyourself916@gmail.com",
    subject: `8am Preview — ${(readyToEmail || []).length} businesses will be emailed at 10am`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:0 auto;">
        <h1 style="font-size:22px;color:#111;">Outreach Preview</h1>
        <p style="color:#666;font-size:14px;">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "America/Los_Angeles" })}</p>

        <div style="background:#fffbeb;border:1px solid #f59e0b;padding:16px;margin:20px 0;">
          <p style="margin:0;font-size:14px;color:#92400e;">
            These businesses will be emailed automatically at <strong>10am PT</strong>. Remove anyone you know from the
            <a href="https://defineyourself916.org/admin/outreach" style="color:#111;font-weight:bold;">dashboard</a> before then.
          </p>
        </div>

        <div style="background:#f8f8f8;padding:20px;margin:20px 0;">
          <p style="margin:4px 0;"><strong>${totalDiscovered}</strong> new businesses discovered</p>
          <p style="margin:4px 0;"><strong>${dupsRemoved}</strong> duplicates removed</p>
          <p style="margin:4px 0;"><strong>${(readyToEmail || []).length}</strong> will be emailed at 10am</p>
        </div>

        <div style="background:#111;color:#fff;padding:20px;margin:20px 0;text-align:center;">
          <p style="margin:0;font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#999;">$100K Goal</p>
          <p style="margin:8px 0;font-size:32px;font-weight:bold;">$${stats.total_raised.toLocaleString()}</p>
          <p style="margin:0;font-size:14px;color:#999;">${goalProgress}% of goal</p>
        </div>

        ${rows ? `
        <h2 style="font-size:16px;color:#111;">Will Be Emailed at 10am</h2>
        <table style="width:100%;font-size:13px;border-collapse:collapse;">
          <tr style="background:#f0f0f0;">
            <th style="padding:6px 12px;text-align:left;">Business</th>
            <th style="padding:6px 12px;text-align:left;">Type</th>
            <th style="padding:6px 12px;text-align:left;">Email</th>
            <th style="padding:6px 12px;text-align:left;">Source</th>
            <th style="padding:6px 12px;text-align:left;">Contact</th>
          </tr>
          ${rows}
        </table>
        ` : `<p style="color:#666;">No businesses with emails ready to send.</p>`}

        <div style="margin:24px 0;text-align:center;">
          <a href="https://defineyourself916.org/admin/outreach" style="display:inline-block;background:#111;color:#fff;padding:14px 32px;text-decoration:none;font-weight:bold;font-size:14px;text-transform:uppercase;letter-spacing:1px;">
            Review Dashboard →
          </a>
        </div>
      </div>
    `,
  });

  return NextResponse.json({
    message: "Preview email sent",
    discovered: totalDiscovered,
    dupsRemoved,
    readyToEmail: (readyToEmail || []).length,
  });
}
