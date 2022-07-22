import React, { useState, useEffect } from "react";
import { Box, Line } from ".";
import { useAppSelector, useAppDispatch } from "../store";
import { addValue, deleteValue, submitGuess } from "../store/guessesSlice";
import data from "../store/data";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface Props {}

export const Panel: React.FC<Props> = () => {
  const [isValidGuess, setIsValidGuess] = useState(true);

  const lines = useAppSelector((state) => state.guesses.lines);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);
  const isCorrectAnswer = useAppSelector(
    (state) => state.guesses.isCorrectAnswer
  );
  const { theme } = useTheme();
  const currentGuess = lines[currentLine];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleType = (e: KeyboardEvent) => {
      const isLetter = e.key.match(/^[a-z]{1}$/) !== null;
      if (isCorrectAnswer) {
        return;
      }

      if (isLetter) {
        if (currentGuess.length < 5) {
          dispatch(addValue(e.key));
        }
      }

      if (e.key === "Backspace") {
        dispatch(deleteValue());
      }

      if (e.key === "Enter") {
        if (currentGuess.length === 5) {
          if (!data.includes(currentGuess)) {
            setIsValidGuess(false);
            setTimeout(() => {
              setIsValidGuess(true);
            }, 1000);
          } else {
            setIsValidGuess(true);
            dispatch(submitGuess());
          }
        }
      }
    };

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess]);

  return (
    <>
      {!isValidGuess && (
        <div
          className={`snackbar fixed top-[62px] left-1/2 -translate-x-1/2 px-3 py-2 text-sm rounded-sm font-semibold ${
            theme === "dark" ? "bg-white text-black" : "bg-black text-white"
          } `}
        >
          Not in word list
        </div>
      )}
      <div className="flex flex-col gap-2">
        {lines.map((line, index) => (
          <Line
            line={line}
            key={index}
            lineIndex={index}
            isValidGuess={isValidGuess}
          />
        ))}
      </div>
    </>
  );
};

export default Panel;
