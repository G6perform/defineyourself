import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: Request) {
  // Verify cron secret (Vercel sends this header for cron jobs)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://defineyourself916.org";

  const adminPassword = process.env.ADMIN_PASSWORD || "";

  const results: Record<string, unknown> = {};

  // Step 1: Discover new businesses (runs 3 times to get variety of business types)
  for (let i = 0; i < 3; i++) {
    try {
      const discoverRes = await fetch(`${baseUrl}/api/outreach/discover`, {
        method: "POST",
        headers: { "x-admin-password": adminPassword },
      });
      const data = await discoverRes.json();
      results[`discovery_${i + 1}`] = data;
    } catch (error) {
      results[`discovery_${i + 1}`] = { error: String(error) };
    }
  }

  // Step 2: Send outreach emails to discovered businesses with emails
  try {
    const sendRes = await fetch(`${baseUrl}/api/outreach/send`, {
      method: "POST",
      headers: { "x-admin-password": adminPassword },
    });
    const data = await sendRes.json();
    results.outreach = data;
  } catch (error) {
    results.outreach = { error: String(error) };
  }

  return NextResponse.json({
    message: "Daily outreach cron completed",
    timestamp: new Date().toISOString(),
    results,
  });
}
