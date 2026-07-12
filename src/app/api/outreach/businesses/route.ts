import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "all";

  let query = supabaseAdmin
    .from("businesses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status, notes, donated_amount } = await request.json();

  const updates: Record<string, unknown> = { status };
  if (notes !== undefined) updates.notes = notes;
  if (donated_amount !== undefined) {
    updates.donated_amount = donated_amount;
    updates.donated_at = new Date().toISOString();
  }
  if (status === "interested" || status === "donated") {
    updates.last_activity_at = new Date().toISOString();
  }

  const { error } = await supabaseAdmin
    .from("businesses")
    .update(updates)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
