import * as THREE from "three";
import React, { ReactNode, useRef } from "react";
import { useFrame, MeshProps } from "@react-three/fiber";
import { useScroll, RenderTexture } from "@react-three/drei";
import { useHover } from "@hooks/useHover";

export type FrameProps = {
  index: number;
  target: React.MutableRefObject<number>;
  length: number;
  renderTextureContents: ReactNode;
} & MeshProps;

export const Frame: React.FC<FrameProps> = ({
  index,
  target,
  length,
  renderTextureContents,
  position,
  scale,
  ...props
}) => {
  const ref = useRef(null!);
  const scroll = useScroll();
  const { hovered, hoverSpread } = useHover();
  const damp = THREE.MathUtils.damp;
  const lerp = THREE.MathUtils.lerp;
  const targetSize = [4.1, 1];

  useFrame((state, delta) => {
    const item = ref.current;
    const targetIdx = target.current;
    const isTarget = targetIdx === index;

    const y = scroll.curve((index - 1.5) / length, 4 / length);
    const t = state.clock.getElapsedTime();

    item.scale.x = damp(
      item.scale.x,
      isTarget ? scale[0] + targetSize[0] : scale[0],
      isTarget ? 6 : 8,
      delta
    );

    item.scale.y = damp(
      item.scale.y,
      isTarget ? scale[1] + targetSize[1] : scale[1] + y * targetSize[1],
      8,
      delta
    );

    let endPoint = position[0];
    if (index < targetIdx) endPoint -= targetSize[0] / 2;
    else if (index > targetIdx) endPoint += targetSize[0] / 2;
    item.position.x = damp(item.position.x, endPoint, 6, delta);

    item.position.y = lerp(
      item.position.y,
      isTarget ? position[1] : Math.sin((t + index * 2) / 2) / 5,
      0.1
    );

    item.rotation.z = lerp(
      item.rotation.z,
      isTarget ? 0 : Math.sin((t + index * 4) / 5) / 180,
      0.8
    );

    item.material.map.offset.y = lerp(
      item.material.map.offset.y,
      isTarget ? 0 : 1,
      0.1
    );
  });

  return (
    <mesh
      ref={ref}
      position={position}
      scale={[scale[0], scale[1], 1]}
      {...hoverSpread}
      {...props}
    >
      <planeGeometry />
      <meshStandardMaterial>
        <RenderTexture attach="map" anisotropy={16} frames={1}>
          {renderTextureContents}
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};
