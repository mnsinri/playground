import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { useWorks } from "@hooks/useWorks";
import { Frame } from "./Frame";
import { ScrollMiniMap } from "./ScrollMap";

type ScrollItemsProps = {
  eachGap: number;
  scale: [x: number, y: number, z: number];
};

function ScrollItems({ eachGap, scale }: ScrollItemsProps) {
  const targetIdx = useRef(0);
  const scroll = useScroll();
  const navigate = useNavigate();
  const works = useWorks();
  const listToRender = [works[1], works[1], works[1], works[1], works[1]];
  const length = listToRender.length;

  useFrame(() => {
    targetIdx.current = Math.round((length - 1) * scroll.offset);
  });
  const onClickHandler = (index: number) => {
    if (targetIdx.current === index) {
      navigate(listToRender[index].id);
    } else {
      const el = scroll.el;
      el.scrollTo(
        (index * (el.scrollWidth - el.clientWidth)) / (length - 1),
        0
      );
    }
  };

  return (
    <>
      {listToRender.map((work, i) => (
        <Frame
          key={i}
          index={i}
          target={targetIdx}
          position={[i * eachGap, 0, 0]}
          scale={scale}
          length={length}
          onClick={(e) => {
            e.stopPropagation();
            onClickHandler(i);
          }}
          renderTextureContents={<work.preview />}
        />
      ))}
    </>
  );
}

function ScrollArea({ w = 0.5, gap = 0.2 }) {
  const works = useWorks();
  const { width } = useThree((state) => state.viewport);
  const length = 5;
  const xW = w + gap;

  return (
    <ScrollControls
      horizontal
      distance={3}
      damping={0.3}
      maxSpeed={0.8}
      pages={((length - 1) * xW + width) / width}
    >
      <ScrollMiniMap count={length} />
      <Scroll>
        <ScrollItems eachGap={w + gap} scale={[w, 4, 1]} />
      </Scroll>
    </ScrollControls>
  );
}

export const GalleryCanvas: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <Canvas
        frameloop="always"
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ fov: 45, near: 0.1, far: 50, position: [0, 0, 10] }}
      >
        <spotLight position={[0, 3, 5]} rotation={[-50, 0, 0]} />
        <ambientLight intensity={0.5} />
        <ScrollArea />
      </Canvas>
    </Suspense>
  );
};
