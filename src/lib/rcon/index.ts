import { Rcon } from "rcon-client";

export async function rcon_req(message: string): Promise<string> {
  const rcon = await Rcon.connect({
    host: process.env.RCON_HOST as string,
    port: Number(process.env.RCON_PORT),
    password: process.env.RCON_PASSWORD as string,
  });

  const response = await rcon.send(message);

  await rcon.end();

  return response;
}
