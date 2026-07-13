import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../../outreach/auth";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const SYSTEM_PROMPT = `You are a grant writing expert helping Define Yourself Inc., a 501(c)(3) non-profit (EIN 88-3419481) in Sacramento, CA, founded by Nicholas Pohl.

Define Yourself empowers youth through sport, mentorship, education, financial literacy, and career development. Core programs:
- Athlete Development Scholarships — covering training, coaching, and equipment for athletes facing financial barriers
- Identification Camps — giving underserved athletes a platform in front of college and semi-pro recruiters
- Elite Athlete Mentorship — pairing experienced athletes with youth for guidance in sport, finances, mental performance
- Performance Access — bringing advanced combine testing to underfunded schools and clubs
- Define Yourself Teams — youth sports teams with full development programming
- Financial Literacy — budgeting, credit building, investing basics for athletes
- Career Development — career counseling, resume workshops, networking for life after sport

Mission: "To empower youth to achieve their fullest potential through holistic development — emphasizing mental, physical, and social growth via sports participation and mentorship programs."

Vision: "To cultivate a generation of resilient leaders equipped with the skills and confidence to excel in all facets of life, while fostering a culture of community contribution and positive social impact."

Key message: "The athletes with the most promise often have the least access. We exist to close that gap."

The organization is based in Sacramento, CA and serves youth across the region. It was built to address the inequity in access to athletic development, mentorship, and life-skills training.

When writing grant narratives:
- Match the language and priorities of the specific grant/funder
- Lead with the problem (access gap) and the solution (DY programs)
- Include measurable outcomes and impact metrics
- Be specific about how funds will be used
- Reference Sacramento community impact
- Keep tone professional but passionate
- Tailor every response to maximize likelihood of award`;

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { grantId, type } = await request.json();
  // type: "strategy" | "narrative" | "budget"

  const { data: grant } = await supabaseAdmin
    .from("grants")
    .select("*")
    .eq("id", grantId)
    .single();

  if (!grant) {
    return NextResponse.json({ error: "Grant not found" }, { status: 404 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let prompt = "";

  if (type === "strategy") {
    prompt = `Analyze this grant opportunity and provide a winning strategy:

Grant: ${grant.name}
Organization: ${grant.organization || "Unknown"}
Amount: ${grant.amount_min ? `$${grant.amount_min}` : "Unknown"}${grant.amount_max ? ` - $${grant.amount_max}` : ""}
Deadline: ${grant.deadline || "Unknown"}
Category: ${grant.category || "General"}
Description: ${grant.description || "No description provided"}
Eligibility Notes: ${grant.eligibility_notes || "None provided"}

Provide:
1. ALIGNMENT SCORE (1-10) — how well Define Yourself fits this grant
2. KEY ANGLES — which DY programs to emphasize for this funder
3. WINNING STRATEGY — specific approach to maximize award likelihood
4. POTENTIAL RED FLAGS — anything that could hurt our application
5. RECOMMENDED ASK AMOUNT — based on the grant range and our programs
6. TIMELINE — key steps and deadlines for the application

Format with clear headers and be specific to THIS grant.`;
  } else if (type === "narrative") {
    prompt = `Write a compelling grant narrative for this opportunity:

Grant: ${grant.name}
Organization: ${grant.organization || "Unknown"}
Amount: ${grant.amount_min ? `$${grant.amount_min}` : "Unknown"}${grant.amount_max ? ` - $${grant.amount_max}` : ""}
Category: ${grant.category || "General"}
Description: ${grant.description || "No description provided"}
Eligibility Notes: ${grant.eligibility_notes || "None provided"}
Strategy Notes: ${grant.ai_strategy || "None"}

Write a full grant narrative that:
- Opens with a compelling statement of need specific to Sacramento youth
- Describes Define Yourself's programs that align with this funder's priorities
- Includes projected outcomes and measurable impact metrics
- Explains how funds will be specifically used
- Closes with organizational capacity and sustainability plan

Format as a polished, ready-to-submit narrative. Use HTML formatting with <h3>, <p>, <ul>, <li> tags.`;
  } else if (type === "budget") {
    prompt = `Create a detailed budget justification for this grant:

Grant: ${grant.name}
Amount Range: ${grant.amount_min ? `$${grant.amount_min}` : "Unknown"}${grant.amount_max ? ` - $${grant.amount_max}` : ""}
Category: ${grant.category || "General"}
Strategy Notes: ${grant.ai_strategy || "None"}

Create a detailed line-item budget with justification for each item. Include:
- Personnel (program coordinators, coaches, mentors)
- Direct program costs (equipment, facility rental, transportation)
- Participant support (scholarships, gear, meals)
- Administrative costs (kept under 15%)
- Evaluation and reporting

Format as an HTML table with columns: Category, Item, Amount, Justification.
Total should fall within the grant's funding range.`;
  }

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: prompt }],
  });

  const content = response.content[0].type === "text" ? response.content[0].text : "";

  // Save to grant record
  const updateField =
    type === "strategy" ? "ai_strategy" :
    type === "narrative" ? "draft_narrative" :
    "draft_budget";

  await supabaseAdmin
    .from("grants")
    .update({ [updateField]: content })
    .eq("id", grantId);

  return NextResponse.json({ content, type });
}
