import React from "react";
import { Modal } from ".";
import { Result } from "../../store";
import { Box } from "../";
import { useAppDispatch } from "../../store";
import { resetStates } from "../../store/guessesSlice";
import { destroyCookie } from "nookies";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Example {
  name: Result;
  value: string;
  desc: string;
  targetIndex: number;
}
const examples: Example[] = [
  {
    name: "matched",
    value: "weary",
    desc: "The letter W is in the word and in the correct spot.",
    targetIndex: 0,
  },
  {
    name: "wrongPlace",
    value: "pills",
    desc: "The letter I is in the word but in the wrong spot.",
    targetIndex: 1,
  },
  {
    name: "notMatched",
    value: "vague",
    desc: "The letter U is not in the word in any spot.",
    targetIndex: 3,
  },
];

export const InfoModal: React.FC<Props> = ({ setIsOpen }) => {
  const dispatch = useAppDispatch();

  const handleNewGameClick = () => {
    dispatch(resetStates());
    setIsOpen(false);
    destroyCookie(null, "previous_state");
  };
  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col items-center justify-center py-2 text-sm">
        <h2 className="uppercase font-bold text-lg  ">How to play</h2>
        <div className="flex flex-col gap-2 py-4 ">
          <p>
            Guess the <b>WORDLE</b> in 6 tries.
          </p>
          <p>
            Each guess must be a valid 5-letter word. Hit the enter button to
            submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
        </div>
        <div className="flex flex-col gap-2 py-4 w-full border-t border-base-gray-light/30">
          <span>
            <b>Examples</b>
          </span>
          <div>
            <div>
              {examples.map((example) => (
                <div
                  className="flex flex-col w-full my-6 first:mt-2 last:mb-0"
                  key={example.value}
                >
                  <div className="flex w-1/2 min-w-[240px] gap-2">
                    {example.value.split("").map((letter, index) => (
                      <Box
                        key={index}
                        value={letter}
                        boxIndex={1}
                        currentState={
                          index === example.targetIndex
                            ? example.name
                            : "notMatched"
                        }
                        isSubmitted={index === example.targetIndex && true}
                      />
                    ))}
                  </div>
                  <p className="pt-2">{example.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
