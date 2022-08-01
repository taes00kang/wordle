import React, { useState, useEffect } from "react";
import { useAppSelector, Result } from "../store";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

interface Props {
  value: string;
  boxIndex: number;
  currentState: Result;
  isSubmitted: boolean;
}

const boxVariants = {
  initial: {
    scale: 1,
  },

  valueEntered: {
    scale: [1, 1.1, 1],
  },
};

const textVariants = {
  initial: {
    scaleY: 1,
    opacity: 1,
  },
  fliped: {
    scaleY: [0, 0, 1],
    opacity: [0, 0, 1],
  },
};

export const Box: React.FC<Props> = ({
  value,
  boxIndex,
  currentState,
  isSubmitted,
}) => {
  const [result, setResult] = useState<Result>("notMatched");
  const [isFliped, setIsFliped] = useState(false);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  const bgColorClassName =
    result === "matched"
      ? "bg-green-700"
      : result === "wrongPlace"
      ? "bg-yellow-600"
      : "bg-base-gray-dark";

  useEffect(() => {
    setResult(currentState);
  }, [currentLine]);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setIsFliped(true);
      }, boxIndex * 300);
    } else {
      setIsFliped(false);
    }
  }, [currentLine]);

  return (
    <motion.div
      className={`box ${isFliped && !isMobile && "fliped"}`}
      variants={boxVariants}
      animate={value ? "valueEntered" : "initial"}
      transition={{
        duration: 0.1,
        type: "spring",
      }}
    >
      <motion.h1
        className={`capitalize transition-colors duration-[600] ${
          isFliped ? "text-white" : "text-black"
        } dark:text-white`}
        variants={textVariants}
        initial={"initial"}
        animate={isFliped ? "fliped" : "initial"}
        transition={{
          duration: isMobile ? 0.2 : 0.6,
          ease: "easeInOut",
        }}
      >
        {value}
      </motion.h1>
      <div
        className={`box__content ${isFliped && isMobile && bgColorClassName}`}
      >
        <div
          className={`box__front border-2 ${
            value
              ? isFliped && isMobile
                ? "border-none"
                : "border-base-gray-dark dark:border-base-gray-light/70"
              : "border-base-gray-light/70 dark:border-base-gray-dark"
          }`}
        />

        <div className={`box__back ${bgColorClassName}`} />
      </div>
    </motion.div>
  );
};

export default Box;
