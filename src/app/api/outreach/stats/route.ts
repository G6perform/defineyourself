import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAuthorized } from "../auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: businesses } = await supabaseAdmin
    .from("businesses")
    .select("status, donated_amount");

  const stats = {
    discovered: 0,
    contacted: 0,
    opened: 0,
    interested: 0,
    donated: 0,
    declined: 0,
    total_donated: 0,
  };

  if (businesses) {
    for (const biz of businesses) {
      if (biz.status in stats) {
        stats[biz.status as keyof typeof stats]++;
      }
      if (biz.donated_amount) {
        stats.total_donated += Number(biz.donated_amount);
      }
    }
  }

  return NextResponse.json(stats);
}
