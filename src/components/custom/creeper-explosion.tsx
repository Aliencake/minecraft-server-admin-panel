import Image from "next/image";
import * as React from "react";

interface ExplosionGifProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ExplosionGif = (props: ExplosionGifProps) => {
  const { className } = props;

  return (
    <div className={className}>
      <Image
        src="explosion-minecraft.gif"
        alt="explosion gif"
        fill={true}
        unoptimized={true}
      />
    </div>
  );
};
