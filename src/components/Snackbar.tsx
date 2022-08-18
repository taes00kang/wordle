import React, { useEffect } from "react";
import { AiOutlineStop, AiOutlineCheck } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { useAppSelector, useAppDispatch } from "../store";
import { resetStates } from "../store/guessesSlice";

interface Props {
  type: "win" | "fail";
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Snackbar: React.FC<Props> = ({ type, setIsOpen }) => {
  const answer = useAppSelector((state) => state.guesses.answer);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);
  const dispatch = useAppDispatch();

  const handleClickResetButton = () => {
    setIsOpen(false);
    dispatch(resetStates());
  };

  useEffect(() => {
    currentLine === 0 && setIsOpen(false)
  }, [currentLine])

  const BUTTON_CLASSNAME =
    "flex items-center h-full px-4 whitespace-nowrap text-sm text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white";
  return (
    <div
      className={`fixed flex w-[90%] max-w-[380px] top-[62px] left-1/2 -translate-x-1/2 p-2 ${
        type === "win"
          ? "bg-green-100 dark:bg-green-900"
          : type === "fail"
          ? "bg-red-100 dark:bg-red-900"
          : "bg-gray-100 dark:bg-gray-600"
      } rounded-md z-20 border-[.5] border-base-gray-light/30 shadow-md shadow-base-gray-dark/30`}
    >
      <div className="flex w-full items-center justify-between">
        <div className="w-10 min-w-[40px] aspect-square bg-white dark:bg-black/50 rounded-md flex justify-center items-center">
          {type === "win" ? (
            <AiOutlineCheck size={24} className="text-green-700" />
          ) : (
            <AiOutlineStop size={24} className="text-red-700" />
          )}
        </div>
        <div className="flex flex-col ml-2 w-full">
          <p
            className={`${
              type === "win" ? "font-bold" : "font-normal"
            } text-sm sm:text-base`}
          >
            {type === "win" ? "Splendid!" : "The answer was "}
            {type === "fail" && (
              <>
                <span className="uppercase font-bold text-black dark:text-white">
                  {" " + answer}
                </span>
                <span>.</span>
              </>
            )}
          </p>
          <p className="text-sm whitespace-nowrap text-black/40 dark:text-white/60">
            {type === "win" ? "Want a new game?" : "Want to retry?"}
          </p>
        </div>
        <div className="flex items-center h-full">
          <button className={BUTTON_CLASSNAME} onClick={handleClickResetButton}>
            Yes
          </button>
          <button
            className={
              BUTTON_CLASSNAME + " border-l border-base-gray-light/30 pl-4 pr-2"
            }
            onClick={() => setIsOpen(false)}
          >
            <IoClose size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snackbar;
