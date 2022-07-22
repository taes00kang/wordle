import React, { useState, useEffect } from "react";
import { Box, Line } from ".";
import { useAppSelector, useAppDispatch } from "../store";
import { addValue, deleteValue, submitGuess } from "../store/guessesSlice";
import data from "../store/data";

interface Props {}

export const Panel: React.FC<Props> = () => {
  const [isValidGuess, setIsValidGuess] = useState(true);

  const lines = useAppSelector((state) => state.guesses.lines);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);

  const currentGuess = lines[currentLine];
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleType = (e: KeyboardEvent) => {
      const isLetter = e.key.match(/^[a-z]{1}$/) !== null;
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
            }, 300);
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
    <div className="flex flex-col gap-2">
      {lines.map((line, index) => (
        <Line
          line={line}
          key={index}
          nthLine={index}
          isValidGuess={isValidGuess}
          setIsValidGuess={setIsValidGuess}
        />
      ))}
    </div>
  );
};

export default Panel;
