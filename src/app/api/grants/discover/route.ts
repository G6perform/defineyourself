import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { Resend } from "resend";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const SEARCH_QUERIES = [
  "youth sports grants nonprofit 501c3 open application",
  "youth mentorship grants California 2026",
  "community development grants Sacramento nonprofit",
  "youth education grants California accepting applications",
  "sports scholarship fund grants nonprofit open",
  "underserved youth grants California community foundation",
  "youth athletic development grants open application",
  "financial literacy youth grants nonprofit",
  "youth empowerment grants 501c3 California",
  "after school sports program grants nonprofit",
];

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  // Get existing grant names to avoid duplicates
  const { data: existing } = await supabaseAdmin
    .from("grants")
    .select("name, organization");

  const existingNames = new Set(
    (existing || []).map((g) => g.name.toLowerCase())
  );
  const existingOrgs = new Set(
    (existing || []).map((g) => (g.organization || "").toLowerCase())
  );

  // Pick 3 random search queries for variety
  const shuffled = [...SEARCH_QUERIES].sort(() => Math.random() - 0.5);
  const queries = shuffled.slice(0, 3);

  // Use Claude to generate grant opportunities based on its knowledge
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: `You are a grant research expert helping Define Yourself Inc., a 501(c)(3) youth sports and mentorship nonprofit in Sacramento, CA (EIN 88-3419481).

Your job is to identify REAL grant opportunities that this organization could apply for. Only suggest grants that:
1. Actually exist (real organizations, real programs)
2. Are available to 501(c)(3) nonprofits
3. Are relevant to youth sports, mentorship, education, financial literacy, or community development
4. Could reasonably be applied for by a Sacramento-based org

Do NOT make up fake grants. Only suggest grants you are confident are real programs from real funders.`,
    messages: [
      {
        role: "user",
        content: `Find 5 grant opportunities for a youth sports and mentorship nonprofit in Sacramento, CA. Search areas: ${queries.join(", ")}.

For grants you already know exist, return them as a JSON array with this format:
[
  {
    "name": "Grant Name",
    "organization": "Funding Organization",
    "url": "https://...",
    "amount_min": 1000,
    "amount_max": 25000,
    "category": "youth sports|education|mentorship|community development|equity & access|health & wellness|general nonprofit",
    "description": "What the grant funds and its purpose",
    "eligibility_notes": "Key eligibility requirements"
  }
]

Only include grants you are confident are real. Return ONLY the JSON array, nothing else.`,
      },
    ],
  });

  const content = response.content[0].type === "text" ? response.content[0].text : "[]";

  let grants: Array<Record<string, unknown>> = [];
  try {
    // Extract JSON from response (might have markdown code blocks)
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      grants = JSON.parse(jsonMatch[0]);
    }
  } catch {
    console.error("Failed to parse grants JSON:", content);
  }

  // Filter out duplicates
  const newGrants = grants.filter(
    (g) =>
      !existingNames.has((g.name as string || "").toLowerCase()) &&
      !(existingOrgs.has((g.organization as string || "").toLowerCase()) &&
        existingNames.has((g.name as string || "").toLowerCase()))
  );

  // Insert new grants
  let added = 0;
  for (const grant of newGrants) {
    try {
      await supabaseAdmin.from("grants").insert({
        name: grant.name,
        organization: grant.organization,
        url: grant.url,
        amount_min: grant.amount_min || null,
        amount_max: grant.amount_max || null,
        category: grant.category || "general nonprofit",
        description: grant.description,
        eligibility_notes: grant.eligibility_notes,
        status: "identified",
      });
      added++;
    } catch {}
  }

  // Send email notification if new grants found
  if (added > 0 && process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const rows = newGrants
      .map(
        (g) =>
          `<tr>
            <td style="padding:6px 12px;border-bottom:1px solid #eee;">${g.name}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #eee;">${g.organization}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #eee;">${g.amount_max ? `Up to $${Number(g.amount_max).toLocaleString()}` : "TBD"}</td>
            <td style="padding:6px 12px;border-bottom:1px solid #eee;"><a href="${g.url}" style="color:#111;">Apply</a></td>
          </tr>`
      )
      .join("");

    await resend.emails.send({
      from: "Nick Pohl <nick@defineyourself916.org>",
      to: "defineyourself916@gmail.com",
      replyTo: "defineyourself916@gmail.com",
      subject: `${added} New Grant Opportunities Found`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h1 style="font-size:22px;color:#111;">New Grant Opportunities</h1>
          <p style="color:#666;font-size:14px;">${added} new grants added to your pipeline</p>
          <table style="width:100%;font-size:13px;border-collapse:collapse;margin:20px 0;">
            <tr style="background:#f0f0f0;">
              <th style="padding:6px 12px;text-align:left;">Grant</th>
              <th style="padding:6px 12px;text-align:left;">Funder</th>
              <th style="padding:6px 12px;text-align:left;">Amount</th>
              <th style="padding:6px 12px;text-align:left;">Link</th>
            </tr>
            ${rows}
          </table>
          <div style="margin:20px 0;text-align:center;">
            <a href="https://defineyourself916.org/admin/grants" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;text-decoration:none;font-weight:bold;font-size:13px;text-transform:uppercase;letter-spacing:1px;">
              View Grants Pipeline
            </a>
          </div>
        </div>
      `,
    });
  }

  return NextResponse.json({
    message: `Found ${grants.length} grants, added ${added} new ones`,
    searched: queries,
    found: grants.length,
    added,
  });
}
