import { NextRequest, NextResponse } from "next/server";

import { rcon_req } from "@/lib/rcon";

export async function GET(req: NextRequest) {
  try {
    const response = await rcon_req("/list");

    const playersPart = response.trim().split(":")[1];

    const players = playersPart
      ? playersPart.split(",").map((player: string) => player.trim())
      : [];

    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
