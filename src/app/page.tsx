"use client";

import { useQuery } from "@tanstack/react-query";

import { Loading } from "@/components/custom";
import { RconServiceService } from "@/lib/services";

export default function Home() {
  const { isLoading, data } = useQuery({
    queryKey: ["players"],
    queryFn: () => RconServiceService.list(),
    refetchInterval: 10000,
  });

  if (isLoading) return <Loading />;

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
