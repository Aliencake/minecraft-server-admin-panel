import { AxiosInstance } from "axios";

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
}

export const RconServiceService = new RconServiceServiceClass();
