import React, { useState } from "react";
import { useTheme } from "@hooks/useTheme";
import { AnimatePresence, motion } from "framer-motion";

const transition = {
  duration: 1,
  ease: "easeInOut",
  repeatDelay: 2,
};
const svgVariants = {
  invisual: {
    opacity: 0,
    pathLength: 0,
    pathOffset: 0,
    transition: transition,
  },
  visual: {
    opacity: 1,
    pathLength: 1,
    pathOffset: 0,
    transition: transition,
  },
  invisualOut: {
    opacity: 0,
    pathLength: 1,
    pathOffset: 1,
    transition: transition,
  },
};
const svgAnimetion = {
  initial: "invisual",
  animate: "visual",
  exit: "invisualOut",
  variants: svgVariants,
};

export const ThemeToggleButton: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ ...props }) => {
  const { theme, toggleTheme, themes } = useTheme();
  const [isDark, setDarkOrLight] = useState<Boolean>(theme === themes.dark);

  const onClickThis = (e) => {
    toggleTheme();
    setDarkOrLight(!isDark);
  };

  return (
    <div {...props} onClick={onClickThis}>
      <motion.svg
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        viewBox="0 0 24 24"
        stroke={theme.character}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="miter"
        fill="none"
        whileTap={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
      >
        <AnimatePresence>
          {isDark ? (
            <motion.path
              key="dark"
              {...svgAnimetion}
              d="M10.423839,3 C10.1490474,3.80837289 10,4.67486099 10,5.57616098 C10,9.99443898 13.581722,13.576161 18,13.576161 C18.9013,13.576161 19.7677881,13.4271135 20.576161,13.152322 C19.5038921,16.3066875 16.516978,18.576161 13,18.576161 C8.581722,18.576161 5,14.994439 5,10.576161 C5,7.05918297 7.26947343,4.07226889 10.423839,3 Z"
            />
          ) : (
            <>
              <motion.circle
                key="light1"
                {...svgAnimetion}
                cx="12"
                cy="12"
                r="4"
              />
              <motion.path
                key="light2"
                {...svgAnimetion}
                d="M12 5L12 3M12 21L12 19M5 12L2 12 5 12zM22 12L19 12 22 12zM16.9497475 7.05025253L19.0710678 4.92893219 16.9497475 7.05025253zM4.92893219 19.0710678L7.05025253 16.9497475 4.92893219 19.0710678zM16.9497475 16.9497475L19.0710678 19.0710678 16.9497475 16.9497475zM4.92893219 4.92893219L7.05025253 7.05025253 4.92893219 4.92893219z"
              />
            </>
          )}
        </AnimatePresence>
      </motion.svg>
    </div>
  );
};
