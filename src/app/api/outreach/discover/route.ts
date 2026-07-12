import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BUSINESS_TYPES = [
  "restaurant",
  "gym",
  "car_dealer",
  "real_estate_agency",
  "insurance_agency",
  "dentist",
  "lawyer",
  "accounting",
  "bank",
  "hair_care",
  "auto_repair",
  "veterinary_care",
  "pharmacy",
  "clothing_store",
  "furniture_store",
  "jewelry_store",
  "electronics_store",
  "pet_store",
  "florist",
  "bakery",
  "cafe",
  "bar",
  "spa",
  "plumber",
  "electrician",
  "roofing_contractor",
  "general_contractor",
];

async function searchPlaces(type: string, city: string, apiKey: string) {
  // Use Google Places Text Search API
  const query = encodeURIComponent(`${type} in ${city}`);
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) return [];

  const data = await res.json();
  return data.results || [];
}

async function getPlaceDetails(placeId: string, apiKey: string) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,types,business_status&key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  return data.result || null;
}

function extractEmailFromWebsite(website: string): Promise<string | null> {
  // We'll try to scrape the website for an email address
  return fetch(website, { signal: AbortSignal.timeout(5000) })
    .then((res) => res.text())
    .then((html) => {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const matches = html.match(emailRegex);
      if (!matches) return null;
      // Filter out common non-business emails
      const filtered = matches.filter(
        (e) => {
          const lower = e.toLowerCase();
          return (
            !lower.includes("example.com") &&
            !lower.includes("example@") &&
            !lower.includes("user@domain") &&
            !lower.includes("name@domain") &&
            !lower.includes("your@email") &&
            !lower.includes("email@email") &&
            !lower.includes("test@") &&
            !lower.includes("noreply") &&
            !lower.includes("no-reply") &&
            !lower.includes("donotreply") &&
            !lower.includes("unsubscribe") &&
            !lower.includes("career@") &&
            !lower.includes("careers@") &&
            !lower.includes("jobs@") &&
            !lower.includes("recruiting@") &&
            !lower.includes("sentry.io") &&
            !lower.includes("schema.org") &&
            !lower.includes(".png") &&
            !lower.includes(".jpg") &&
            !lower.includes(".svg") &&
            !lower.includes("wixpress") &&
            !lower.includes("googleapis") &&
            !lower.includes("squarespace") &&
            !lower.includes("wordpress") &&
            !lower.includes("@sentry") &&
            !lower.includes("@wix") &&
            !lower.includes("mysite.com") &&
            !lower.endsWith(".js") &&
            !lower.endsWith(".css")
          );
        }
      );
      return filtered[0] || null;
    })
    .catch(() => null);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  // Get settings
  const { data: settings } = await supabaseAdmin
    .from("outreach_settings")
    .select("key, value");

  const config = Object.fromEntries(
    (settings || []).map((s) => [s.key, s.value])
  );
  const city = config.discovery_city || "Sacramento, CA";

  // Pick a random business type to search
  const type =
    BUSINESS_TYPES[Math.floor(Math.random() * BUSINESS_TYPES.length)];

  const places = await searchPlaces(type, city, apiKey);
  let added = 0;

  for (const place of places.slice(0, 10)) {
    // Check if already exists
    const { data: existing } = await supabaseAdmin
      .from("businesses")
      .select("id")
      .eq("google_place_id", place.place_id)
      .single();

    if (existing) continue;

    // Get details
    const details = await getPlaceDetails(place.place_id, apiKey);
    if (!details || details.business_status !== "OPERATIONAL") continue;

    // Try to find email from website
    let email: string | null = null;
    if (details.website) {
      email = await extractEmailFromWebsite(details.website);
    }

    // Map Google type to readable type
    const readableType = type.replace(/_/g, " ");

    await supabaseAdmin.from("businesses").insert({
      name: details.name,
      type: readableType,
      address: details.formatted_address,
      city: city.split(",")[0].trim(),
      phone: details.formatted_phone_number || null,
      email,
      website: details.website || null,
      google_place_id: place.place_id,
      google_rating: details.rating || null,
      google_reviews_count: details.user_ratings_total || null,
      status: "discovered",
    });

    added++;
  }

  return NextResponse.json({
    message: `Discovered ${added} new ${type.replace(/_/g, " ")} businesses in ${city}`,
    added,
    type: type.replace(/_/g, " "),
  });
}
