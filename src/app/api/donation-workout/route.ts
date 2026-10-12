import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const DIALPAD_API_KEY = process.env.DIALPAD_API_KEY;
const NICK_PHONE = "+15306016625";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^\d+]/g, "").replace(/^(\d{10})$/, "+1$1");

    // Save to Supabase
    const { error } = await supabase.from("donation_workout_signups").insert({
      name,
      email: email || null,
      phone: cleanPhone,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save signup" }, { status: 500 });
    }

    // Text Nick
    if (DIALPAD_API_KEY) {
      const msg = `Donation Workout signup: ${name} (${cleanPhone}${email ? `, ${email}` : ""})`;
      await fetch("https://dialpad.com/api/v2/sms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DIALPAD_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to_numbers: [NICK_PHONE],
          from_number: "+19162498642",
          text: msg,
          infer_country_code: true,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Donation workout signup error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
