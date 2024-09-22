import { NextRequest, NextResponse } from "next/server";

import { rcon } from "@/lib/rcon";

export async function GET(req: NextRequest) {
  try {
    await rcon.connect();

    const response = await rcon.send("/list");

    const playersPart = response.trim().split(":")[1];

    const players = playersPart
      ? playersPart.split(",").map((player) => player.trim())
      : [];

    await rcon.end();

    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
