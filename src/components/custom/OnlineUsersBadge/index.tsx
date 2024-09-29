"use client";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import * as React from "react";

import { OnlineUsersList } from "@/components/custom/OnlineUsersBadge/OnlineUsersList";
import { Tooltip } from "@/components/custom/Tooltip";
import { Badge } from "@/components/ui/badge";
import { QUERY_KEYS } from "@/lib/constants";
import { RconServiceService } from "@/lib/services";
import { cn } from "@/lib/utils";

export const OnlineUsersBadge = () => {
  const { data: onlinePlayers, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.playersList],
    queryFn: () => RconServiceService.list_online_players(),
    refetchInterval: 10000,
    retry: 5,
    placeholderData: [],
  });

  return (
    <Tooltip
      asChild={false}
      content={
        onlinePlayers?.length ? (
          <OnlineUsersList users={onlinePlayers} />
        ) : undefined
      }
    >
      <Badge className="select-none" variant="outline">
        <Dot
          strokeWidth={5}
          className={cn(
            "text-green-500",
            {
              "text-red-500": !onlinePlayers?.length,
            },
            { "animate-pulse": isFetching }
          )}
        />
        <p>{onlinePlayers?.length} online</p>
      </Badge>
    </Tooltip>
  );
};
