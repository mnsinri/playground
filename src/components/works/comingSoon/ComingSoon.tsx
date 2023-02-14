import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Text3D,
} from "@react-three/drei";
import { useTheme } from "@hooks/useTheme";

// import * as font from "@src/assets/fonts/Montserrat Thin_Regular.json";

const ComingSoonContents: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
      <color attach="background" args={[theme.character]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 0]} intensity={10} />
      <Center>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.1}
          bevelThickness={0.1}
          height={0.3}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1}
          font="assets/Montserrat Thin_Regular.json"
        >
          {`Coming\nsoon`}
          <meshStandardMaterial color="#d35100" />
        </Text3D>
      </Center>
      <Environment preset="warehouse" />
    </>
  );
};

export const Preview: React.FC = () => {
  const ref = useRef(null!);
  // useFrame((state) => {
  //   ref.current.position.x = Math.sin(state.clock.getElapsedTime());
  // });
  return (
    <>
      <PerspectiveCamera
        ref={ref}
        makeDefault
        manual
        aspect={1 / 1}
        position={[0, 0, 10]}
      />
      <ComingSoonContents />
    </>
  );
};

export const Scene: React.FC = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <ComingSoonContents />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
