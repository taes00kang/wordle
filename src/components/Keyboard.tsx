import React from "react";
import { KeyButton } from ".";

interface Props {
  handleTyping: (value: string) => void;
}

const keyValues = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["spacer", "a", "s", "d", "f", "g", "h", "j", "k", "l", "spacer"],
  ["Enter", "z", "x", "c", "v", "b", "n", "m", "Backspace"],
];

export const Keyboard: React.FC<Props> = ({ handleTyping }) => {
  return (
    <div className="h-[200px] px-2">
      {keyValues.map((row, index) => (
        <div className="flex gap-2 w-full h-[58px] mb-2" key={index}>
          {row.map((value, index) => (
            <KeyButton value={value} key={index} handleTyping={handleTyping} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
