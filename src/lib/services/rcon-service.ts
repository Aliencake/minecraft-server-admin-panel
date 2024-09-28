import { AxiosInstance } from "axios";

import { PlayerNameSchemaType } from "@/lib/schemas/player-name-schema";
import routeApiClient from "@/lib/services/be-api";

class RconServiceServiceClass {
  routeClient: AxiosInstance;
  constructor() {
    this.routeClient = routeApiClient;
  }
  async list_online_players(): Promise<string[]> {
    const response = await this.routeClient.get("rcon/players/online");

    return response.data;
  }

  async list_whitelist(): Promise<string[]> {
    const response = await this.routeClient.get("rcon/players/whitelist");

    return response.data;
  }

  async whitelist_add(name: PlayerNameSchemaType): Promise<string> {
    const response = await this.routeClient.post(
      "rcon/players/whitelist",
      name
    );

    return response.data;
  }
}

export const RconServiceService = new RconServiceServiceClass();
