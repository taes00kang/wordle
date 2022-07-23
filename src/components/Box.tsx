import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useAppSelector, Result } from "../store";
import { motion } from 'framer-motion'

interface Props {
  value: string;
  boxIndex: number;
  lineIndex: number;
}

const variants = {
  initial: {
    scale: 1
  },

  valueEntered: {
    scale: [1, 1.1, 1]
  },

}

export const Box: React.FC<Props> = ({
  value,
  boxIndex,
  lineIndex,
}) => {
  const [result, setResult] = useState<Result>("notMatched");
  const [active, setActive] = useState(false);
  const resultsTable = useAppSelector((state) => state.guesses.resultsTable);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);

  useEffect(() => {
    setResult(resultsTable[lineIndex][boxIndex]);
  }, [resultsTable]);

  useEffect(() => {
    if(currentLine - 1 === lineIndex) {
      setTimeout(() => {
        setActive(true)
      }, boxIndex * 300);
    }
  },[currentLine])

  const { theme } = useTheme();
  return (
    <motion.div
      className={`box ${active && "active"} flex items-center justify-center`}
      variants={variants}
      animate={value ? "valueEntered": "initial"}
      transition={{
        duration: .1,
        type:"spring"
      }}
      
    >
      <h1 className={`capitalize ${theme === "dark"? "text-white": "text-black"}`}>{value}</h1>
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
    </motion.div>
  );
};

export default Box;
