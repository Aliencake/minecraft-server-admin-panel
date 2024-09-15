import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Loading(props: LoadingProps) {
  const { className } = props;

  return (
    <div className={cn(className, "flex h-dvh items-center justify-center")}>
      <Image
        src="diamond.png"
        alt="diamond"
        height={70}
        width={70}
        className="animate-bounce"
        unoptimized={true}
      />
    </div>
  );
}
