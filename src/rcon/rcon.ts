import { Rcon } from "rcon-client";

export const rcon = new Rcon({
  host: process.env.RCON_HOST as string,
  port: Number(process.env.RCON_PORT),
  password: process.env.RCON_PASSWORD as string,
});

async function main() {
  await rcon.connect();

  console.log(await rcon.send("/list"));

  rcon.end();
}
