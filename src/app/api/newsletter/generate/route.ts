import { NextResponse } from "next/server";
import { isAuthorized } from "@/app/api/outreach/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { topic, tone } = await request.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic required" }, { status: 400 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `You are writing a newsletter email for Define Yourself Inc., a 501(c)(3) non-profit in Sacramento, CA that empowers youth through sport, mentorship, education, financial literacy, and career development. Founded by Nicholas Pohl.

Generate a beautiful HTML email newsletter about: ${topic}

Tone: ${tone || "Warm, personal, inspiring — written as Nick Pohl speaking directly to supporters"}

Requirements:
- Clean, modern HTML email (inline styles, no external CSS)
- Color palette: white background, #111111 dark text, #ffc000 gold accent
- Font: Arial/Helvetica (email-safe)
- Include a compelling subject line
- Personal tone from Nick
- Call to action (donate link: https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-17833)
- Keep it concise — 3-5 short paragraphs max
- DO NOT include unsubscribe link (added automatically)
- DO NOT include footer (added automatically)

Return valid JSON: {"subject": "...", "body": "<html>..."}`,
        },
      ],
    }),
  });

  const data = await response.json();
  const text = data.content?.[0]?.text || "";

  try {
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON found");
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Failed to generate", raw: text }, { status: 500 });
  }
}
