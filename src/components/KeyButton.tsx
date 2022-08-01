import React, { useState, useEffect } from "react";
import { MdOutlineBackspace } from "react-icons/md";
import { useAppSelector, Result } from "../store";

interface Props {
  value: string;
  handleTyping: (value: string) => void;
}

export const KeyButton: React.FC<Props> = ({ value, handleTyping }) => {
  const [currentState, setCurrentState] = useState<Result | null>(null);
  const resultTable = useAppSelector((state) => state.guesses.resultsTable);
  const lines = useAppSelector((state) => state.guesses.lines);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);

  useEffect(() => {
    // Every time submit the guess, check if the past guesses include the value
    // and then update its current state.
    if (currentLine === 0) {
      // In case reset game
      setCurrentState(null);
    }
    for (let i = 0; i < currentLine; i++) {
      const line = lines[i].split("");
      if (line.includes(value)) {
        const index_of_value = line.indexOf(value);
        setCurrentState(resultTable[i][index_of_value]);
      }
    }
  }, [currentLine]);

  return (
    <div
      className={`flex flex-1 justify-center items-center rounded-md text-white uppercase text-sm font-bold cursor-pointer ${
        value === "spacer"
          ? "flex-[.5] cursor-auto"
          : value === "Enter" || value === "Backspace"
          ? "flex-[1.5] text-xs bg-base-gray-light"
          : currentState === "matched"
          ? " bg-green-700"
          : currentState === "wrongPlace"
          ? " bg-yellow-600"
          : currentState === "notMatched"
          ? "bg-base-gray-dark"
          : " bg-base-gray-light "
      }`}
      onClick={() => handleTyping(value)}
    >
      {value === "spacer" ? null : value === "Backspace" ? (
        <MdOutlineBackspace size={20} />
      ) : (
        value
      )}
    </div>
  );
};

export default KeyButton;
