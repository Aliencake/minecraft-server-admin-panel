import { NextRequest, NextResponse } from "next/server";

import { rcon_req } from "@/lib/rcon";
import { playerNameSchema } from "@/lib/schemas/player-name-schema";

export async function GET(req: NextRequest) {
  try {
    const response = await rcon_req("/whitelist list");

    const playersPart = response.trim().split(":")[1];

    const players = playersPart
      ? playersPart.split(",").map((player: string) => player.trim())
      : [];

    return new NextResponse(JSON.stringify(players), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: any = await req.json();

    const player = playerNameSchema.parse(body);

    const response = await rcon_req(`/easywhitelist add ${player.playerName}`);

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body: any = await req.json();

    const player = playerNameSchema.parse(body);

    const response = await rcon_req(
      `/easywhitelist remove ${player.playerName}`
    );

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
