import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Rocks from "./Rock";

const Contents: React.FC = () => {
  return (
    <>
      <color attach="background" args={["#151515"]} />
      <ambientLight intensity={0.15} />
      <Rocks />
    </>
  );
};

export const Preview: React.FC = () => {
  return (
    <>
      <PerspectiveCamera
        makeDefault
        manual
        aspect={1 / 1}
        position={[0, 3, 10]}
      />
      <Contents />
    </>
  );
};

export const Scene: React.FC = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overscrollBehavior: "none",
      }}
    >
      <Canvas camera={{ position: [0, 5, 10] }}>
        <Contents />
        <OrbitControls />
      </Canvas>
    </div>
  );
};
