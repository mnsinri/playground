import React, { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

export type AnimatedTextVariants = {
  hidden: Object;
  visible: Object;
};

export type AnimatedCharactorProps = {
  text: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const AnimatedCharactor: React.FC<AnimatedCharactorProps> = ({
  text,
  ...props
}) => {
  const textItem: AnimatedTextVariants = {
    hidden: {
      y: "200%",
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.55 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };

  return (
    <div {...props}>
      {[...text].map((el, i) => {
        return (
          <span
            style={{
              overflow: "hidden",
              display: "inline-block",
            }}
            key={i}
          >
            <motion.span
              style={{ display: "inline-block" }}
              variants={textItem}
            >
              {el}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
};

export type AnimatedTextProps = {
  texts: string[];
} & React.HTMLAttributes<HTMLDivElement>;

export const AnimatedText: React.FC<AnimatedTextProps> = ({ texts, style }) => {
  const controls = useAnimationControls();
  const container: AnimatedTextVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const onHover = async () => {
    await controls.start("hidden");
    await controls.start("visible");
  };

  useEffect(() => {
    controls.start("visible");
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      onHoverStart={onHover}
      variants={container}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {texts.map((el, i) => {
        return (
          <AnimatedCharactor
            key={i}
            text={el}
            style={{
              textAlign: "center",
              fontFamily: "'Montserrat', sans-serif",
              ...style,
            }}
          />
        );
      })}
    </motion.div>
  );
};
