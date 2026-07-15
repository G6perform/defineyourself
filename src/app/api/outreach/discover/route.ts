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
  "chiropractor",
  "physiotherapist",
  "travel_agency",
  "locksmith",
  "moving_company",
  "painter",
  "car_wash",
  "laundry",
  "shoe_store",
  "book_store",
  "hardware_store",
  "bicycle_store",
  "liquor_store",
  "meal_delivery",
  "meal_takeaway",
  "night_club",
  "storage",
  "taxi_stand",
  "tire_shop",
  "towing",
  "wedding_venue",
  "yoga_studio",
  "pilates",
  "martial_arts",
  "dance_studio",
  "music_school",
  "art_gallery",
  "photography_studio",
  "print_shop",
  "tailor",
  "dry_cleaner",
];

const CITIES = [
  "Sacramento, CA",
  "Roseville, CA",
  "Elk Grove, CA",
  "Folsom, CA",
  "Rancho Cordova, CA",
  "Citrus Heights, CA",
  "Davis, CA",
  "West Sacramento, CA",
  "Rocklin, CA",
  "Lincoln, CA",
  "Woodland, CA",
  "Natomas, CA",
  "Carmichael, CA",
  "Fair Oaks, CA",
  "Orangevale, CA",
  "Arden-Arcade, CA",
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
  // Pick a random business type and city
  const type =
    BUSINESS_TYPES[Math.floor(Math.random() * BUSINESS_TYPES.length)];
  const city =
    CITIES[Math.floor(Math.random() * CITIES.length)];

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

    // Skip national chains
    const nameLower = (place.name || "").toLowerCase();
    const CHAINS = [
      "walmart", "target", "costco", "home depot", "lowe's", "lowes",
      "starbucks", "mcdonald", "burger king", "wendy's", "wendys", "taco bell",
      "chick-fil-a", "chickfila", "subway", "panda express", "chipotle",
      "in-n-out", "jack in the box", "carl's jr", "del taco", "sonic drive",
      "applebee", "olive garden", "red lobster", "outback steakhouse", "ihop",
      "denny's", "dennys", "chili's", "chilis", "buffalo wild wings",
      "u.s. bank", "us bank", "chase bank", "bank of america", "wells fargo",
      "citibank", "td bank", "capital one", "pnc bank",
      "walgreens", "cvs pharmacy", "rite aid",
      "urban plates", "panera", "wingstop", "domino's", "dominos", "pizza hut",
      "papa john", "little caesars",
      "autozone", "o'reilly auto", "oreilly auto", "advance auto", "napa auto",
      "jiffy lube", "midas", "firestone", "goodyear", "les schwab", "pep boys",
      "verizon", "at&t", "t-mobile", "tmobile", "sprint",
      "fedex", "ups store",
      "best buy", "gamestop", "petco", "petsmart",
      "planet fitness", "24 hour fitness", "anytime fitness", "la fitness",
      "marriott", "hilton", "holiday inn", "hyatt", "sheraton",
      "safeway", "raley's", "raleys", "trader joe", "whole foods", "winco",
      "kevin jewelers", "zales", "kay jewelers", "jared",
      "h&r block", "jackson hewitt", "liberty tax",
      "state farm", "allstate", "geico", "progressive", "farmers insurance",
    ];
    if (CHAINS.some((chain) => nameLower.includes(chain))) continue;

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
