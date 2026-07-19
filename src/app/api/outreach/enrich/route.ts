import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const FAKE_PATTERNS = [
  "user@domain", "example@", "test@", "your@email", "name@domain",
  "noreply", "no-reply", "donotreply", "unsubscribe", "career@",
  "careers@", "jobs@", "recruiting@", "sentry.io", "schema.org",
  ".png", ".jpg", ".svg", ".js", ".css", "wixpress", "googleapis",
  "squarespace", "wordpress", "@sentry", "@wix", "mysite.com",
  "info@website.com", "info@ndiscovered", ".jpeg",
];

function isValidEmail(email: string): boolean {
  const lower = email.toLowerCase();
  if (FAKE_PATTERNS.some((p) => lower.includes(p))) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  return true;
}

async function scrapeEmailsFromUrl(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return [];
    const html = await res.text();
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = html.match(emailRegex) || [];
    return [...new Set(matches.filter(isValidEmail))];
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: businesses } = await supabaseAdmin
    .from("businesses")
    .select("id, name, website")
    .eq("status", "discovered")
    .is("email", null)
    .not("website", "is", null)
    .limit(20);

  if (!businesses || businesses.length === 0) {
    return NextResponse.json({ message: "No businesses to enrich", enriched: 0 });
  }

  let enriched = 0;

  for (const biz of businesses) {
    if (!biz.website) continue;

    let baseUrl = biz.website;
    if (!baseUrl.startsWith("http")) baseUrl = `https://${baseUrl}`;

    const urlsToTry = [
      baseUrl,
      `${baseUrl}/contact`,
      `${baseUrl}/contact-us`,
      `${baseUrl}/about`,
      `${baseUrl}/about-us`,
    ];

    let foundEmail: string | null = null;

    for (const url of urlsToTry) {
      const emails = await scrapeEmailsFromUrl(url);
      if (emails.length > 0) {
        foundEmail = emails[0];
        break;
      }
    }

    if (foundEmail) {
      await supabaseAdmin
        .from("businesses")
        .update({ email: foundEmail })
        .eq("id", biz.id);
      enriched++;
    }
  }

  return NextResponse.json({
    message: `Enriched ${enriched} of ${businesses.length} businesses with emails`,
    enriched,
    checked: businesses.length,
  });
}
