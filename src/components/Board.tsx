import React, { useEffect } from "react";
import { Line } from ".";
import { useAppSelector } from "../store";

interface Props {
  handleTyping: (value: string) => void;
}

export const Board: React.FC<Props> = ({ handleTyping }) => {
  const isValidGuess = useAppSelector((state) => state.guesses.isValidGuess);
  const lines = useAppSelector((state) => state.guesses.lines);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);
  const currentGuess = lines[currentLine];

  useEffect(() => {
    const handleKeyboardType = (e: KeyboardEvent) => {
      handleTyping(e.key);
    };

    window.addEventListener("keydown", handleKeyboardType);

    return () => window.removeEventListener("keydown", handleKeyboardType);
  }, [currentGuess]);

  return (
    <div className="h-full flex justify-center items-center px-10 py-4 sm:py-0 sm:px-0">
      {!isValidGuess && (
        <div className="snackbar fixed top-[62px] left-1/2 -translate-x-1/2 px-3 py-2 text-sm rounded-sm font-semibold text-white dark:text-black bg-black dark:bg-white z-10">
          Not in word list
        </div>
      )}
      <div className="flex flex-col gap-1 sm:gap-2 w-full">
        {lines.map((line, index) => (
          <Line
            line={line}
            key={index}
            lineIndex={index}
            isValidGuess={isValidGuess}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
