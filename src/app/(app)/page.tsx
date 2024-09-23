"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/lib/constants";
import { RconServiceService } from "@/lib/services";

export default function Home() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.playersList],
    queryFn: () => RconServiceService.list_online_players(),
    refetchInterval: 10000,
  });

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-4 p-24">
      <div>
        <p className="text-4xl">People on server:</p>
        {data &&
          data.length > 0 &&
          data.map((name) => <div key={name}>{name}</div>)}
      </div>
    </main>
  );
}
