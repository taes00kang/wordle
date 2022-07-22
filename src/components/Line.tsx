import React, { useState, useEffect } from "react";
import { Box } from ".";
import { useAppSelector, useAppDispatch } from "../store";
import { addValue } from "../store/guessesSlice";
import { motion, useAnimationControls } from "framer-motion";

interface Props {
  line: string;
  isValidGuess: boolean;
  lineIndex: number;
}

const lineVariants = {
  valid: {
    x: 0,
  },
  notValid: {
    x: [5, -5, 5, -5, 5, -5, 0],
  },
};

const WORD_LENGTH = 5;

export const Line: React.FC<Props> = ({ line, lineIndex, isValidGuess }) => {
  const currentLine = useAppSelector((state) => state.guesses.currentLine);

  const isCurrentLine = currentLine === lineIndex;

  const tiles: string[] = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(line[i]);
  }

  return (
    <motion.div
      className="flex gap-2"
      variants={lineVariants}
      animate={isCurrentLine && !isValidGuess ? "notValid" : "valid"}
    >
      {tiles.map((tile, i) => {
        const value = line[i];
        return <Box value={value} key={i} boxIndex={i} lineIndex={lineIndex} />;
      })}
    </motion.div>
  );
};

export default Line;
