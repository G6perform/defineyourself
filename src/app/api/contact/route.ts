import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  // TODO: Wire up to email service (Resend, etc.) or store in Supabase
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ success: true });
}
