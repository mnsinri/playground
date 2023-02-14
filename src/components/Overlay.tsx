import React from "react";
import { GitProIcon } from "./GitProIcon";
import { AnimatedText } from "./AnimatedText";

export const Overlay: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  style,
  ...props
}) => {
  return (
    <div
      style={{ display: "flex", gap: 3, cursor: "pointer", ...style }}
      {...props}
    >
      <GitProIcon width={45} height={45} />
      <AnimatedText texts={["Kyohei", "Masuko"]} />
    </div>
  );
};
