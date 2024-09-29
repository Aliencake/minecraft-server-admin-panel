"use client";
import { ReactElement, memo } from "react";
import * as React from "react";

import {
  BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type TooltipProps = {
  children: ReactElement;
  content?: ReactElement;
  className?: string;
  asChild?: boolean;
};

const CustomTooltip = (props: TooltipProps) => {
  const { content, className, children, asChild = true } = props;

  return (
    <TooltipProvider>
      <BaseTooltip>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        {content && (
          <TooltipContent className={cn("flex rounded-xl", className)}>
            {content}
          </TooltipContent>
        )}
      </BaseTooltip>
    </TooltipProvider>
  );
};

export const Tooltip = memo(CustomTooltip);
