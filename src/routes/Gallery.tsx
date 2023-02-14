import React from "react";
import { useTheme } from "@hooks/useTheme";
import { GalleryCanvas } from "@components/three/GalleryCanvas";
import { ThemeToggleButton } from "@components/ThemeToggleButton";
import { Overlay } from "@components/Overlay";

export const Gallery: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overscrollBehavior: "none",
        background: theme.main,
        color: "#a0a0a0",
        transition: "background 0.5s ease, color 0.5s ease",
      }}
    >
      <GalleryCanvas />
      <Overlay
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: theme.character,
        }}
      />
      <ThemeToggleButton
        style={{
          position: "absolute",
          top: 30,
          right: 30,
          color: theme.character,
        }}
      />
    </div>
  );
};
