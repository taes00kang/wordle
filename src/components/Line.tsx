import React from "react";
import { motion } from "framer-motion";
import { Box } from ".";
import { useAppSelector } from "../store";

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
  const resultTable = useAppSelector((state) => state.guesses.resultsTable);

  const isCurrentLine = currentLine === lineIndex;

  const tiles: string[] = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    tiles.push(line[i]);
  }

  return (
    <motion.div
      className="flex gap-1 sm:gap-2 justify-center"
      variants={lineVariants}
      animate={isCurrentLine && !isValidGuess ? "notValid" : "valid"}
    >
      {tiles.map((tile, i) => {
        const value = line[i];
        const currentState = resultTable[lineIndex][i]
        const isSubmitted = lineIndex < currentLine
        return <Box value={value} key={i} currentState={currentState} isSubmitted={isSubmitted} boxIndex={i} />;
      })}
    </motion.div>
  );
};

export default Line;
