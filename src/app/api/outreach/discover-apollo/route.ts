import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SACRAMENTO_LOCATIONS = [
  "Sacramento, California, United States",
  "Roseville, California, United States",
  "Elk Grove, California, United States",
  "Folsom, California, United States",
  "Rancho Cordova, California, United States",
  "Citrus Heights, California, United States",
  "Davis, California, United States",
  "West Sacramento, California, United States",
];

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Apollo API key not configured" },
      { status: 500 }
    );
  }

  // Pick a random location for variety
  const location =
    SACRAMENTO_LOCATIONS[Math.floor(Math.random() * SACRAMENTO_LOCATIONS.length)];

  // Search for business owners/decision makers in Sacramento area
  const res = await fetch("https://api.apollo.io/api/v1/mixed_people/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey,
    },
    body: JSON.stringify({
      person_locations: [location],
      person_seniorities: ["owner", "founder", "c_suite", "partner"],
      contact_email_status: ["verified"],
      per_page: 25,
      page: Math.floor(Math.random() * 5) + 1, // Random page for variety
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json(
      { error: `Apollo API error: ${error}` },
      { status: 500 }
    );
  }

  const data = await res.json();
  const people = data.people || [];
  let added = 0;

  for (const person of people) {
    if (!person.email) continue;

    const org = person.organization || {};
    const companyName = org.name || person.organization_name;
    if (!companyName) continue;

    // Check if already exists by email
    const { data: existing } = await supabaseAdmin
      .from("businesses")
      .select("id")
      .eq("email", person.email)
      .single();

    if (existing) continue;

    // Also check by company name + city to avoid dupes
    const { data: existingByName } = await supabaseAdmin
      .from("businesses")
      .select("id")
      .eq("name", companyName)
      .single();

    if (existingByName) continue;

    await supabaseAdmin.from("businesses").insert({
      name: companyName,
      type: org.industry || null,
      address: [person.city, person.state, person.country].filter(Boolean).join(", "),
      city: person.city || "Sacramento",
      phone: person.phone_numbers?.[0]?.sanitized_number || org.phone || null,
      email: person.email,
      website: org.website_url || null,
      google_place_id: null,
      google_rating: null,
      google_reviews_count: null,
      status: "discovered",
      lead_source: "apollo",
      notes: `Contact: ${person.first_name} ${person.last_name} — ${person.title || "Owner"}`,
    });

    added++;
  }

  return NextResponse.json({
    message: `Discovered ${added} new leads from Apollo (${location})`,
    added,
    location,
    total_returned: people.length,
  });
}
