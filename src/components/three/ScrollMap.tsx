import * as THREE from "three";
import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll, Line } from "@react-three/drei";

import { useTheme } from "@hooks/useTheme";

export type ScrollMiniMapProps = {
  count: number;
};
export const ScrollMiniMap: React.FC<ScrollMiniMapProps> = ({ count }) => {
  const ref = useRef(null!);
  const { theme } = useTheme();
  const scroll = useScroll();
  const { height } = useThree((state) => state.viewport);
  const damp = THREE.MathUtils.damp;

  useFrame((_, delta) => {
    ref.current.children.forEach((child, index) => {
      const y = scroll.curve((index - 1.5) / count, 4 / count);
      child.scale.y = damp(child.scale.y, (2 * y) / 3 + 0.3, 8, delta);
    });
  });

  return (
    <group ref={ref}>
      {[...Array(count)].map((_, i) => (
        <Line
          key={i}
          points={[
            [0, -0.5, 0],
            [0, 0.5, 0],
          ]}
          lineWidth={2}
          dashed={true}
          color={theme.character}
          position={[i * 0.2 - count * 0.1, height / 2 + 4, -15]}
        />
      ))}
    </group>
  );
};
