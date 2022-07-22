import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAppSelector, Result } from "../store";

interface Props {
  value: string;
  boxIndex: number;
  isCurrentLine: boolean;
}

export const Box: React.FC<Props> = ({ value, boxIndex, isCurrentLine }) => {
  const [result, setResult] = useState<Result>("notMatched");
  const [active, setActive] = useState(false);
  const lineResult = useAppSelector((state) => state.guesses.lineResult);

  useEffect(() => {
    if (isCurrentLine) {
      setResult(lineResult[boxIndex]);
      console.log(lineResult);
    }
  }, [lineResult]);

  const { theme } = useTheme();
  return (
    <div
      className={`box ${active && "active"} flex items-center justify-center`}
      onClick={() => setActive(!active)}
    >
      <h1 className="capitalize">{value}</h1>
      <div className="box__content">
        <div
          className={`box__front border ${
            value
              ? theme === "dark"
                ? "border-white"
                : "border-gray-600"
              : "border-gray-400"
          }`}
        />

        <div
          className={`box__back ${
            result === "matched"
              ? "bg-green-600"
              : result === "wrongPlace"
              ? "bg-yellow-500"
              : "bg-gray-500"
          }`}
        />
      </div>
    </div>
  );
};

export default Box;
