import React, { useState, useEffect } from "react";
import { Board, Keyboard } from ".";
import { useAppSelector, useAppDispatch } from "../store";
import data from "../store/data.json";
import { allStates } from "../store/guessesSlice";
import { setCookie, destroyCookie } from "nookies";
import { Snackbar } from ".";

import {
  addValue,
  deleteValue,
  setIsValidGuess,
  submitGuess,
} from "../store/guessesSlice";

interface Props {}

const storeStateInCookie = (state: allStates) => {
  const stringfiedState = JSON.stringify(state);
  setCookie(null, "previous_state", stringfiedState, {
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });
};

export const Main: React.FC<Props> = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const allStates = useAppSelector((state) => state.guesses);
  const lines = useAppSelector((state) => state.guesses.lines);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);
  const isCorrectAnswer = useAppSelector(
    (state) => state.guesses.isCorrectAnswer
  );
  const currentGuess = lines[currentLine];
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCorrectAnswer || currentLine > 5) {
      setTimeout(() => {
        setSnackBarOpen(true);
      }, 1500);
      destroyCookie(null, "previous_state");
    } else {
      storeStateInCookie(allStates);
    }
  }, [currentLine, isCorrectAnswer]);

  const handleTyping = (value: string) => {
    const isLetter = value.match(/^[a-z]{1}$/) !== null;
    if (isCorrectAnswer) {
      return;
    }

    if (isLetter) {
      if (currentGuess.length < 5) {
        dispatch(addValue(value));
      }
    }

    if (value === "Backspace") {
      dispatch(deleteValue());
    }

    if (value === "Enter") {
      if (currentGuess.length === 5) {
        if (!data.includes(currentGuess)) {
          dispatch(setIsValidGuess(false));

          setTimeout(() => {
            dispatch(setIsValidGuess(true));
          }, 1000);
        } else {
          dispatch(setIsValidGuess(true));
          dispatch(submitGuess());
        }
      }
    }
  };
  return (
    <div className="flex flex-col justify-between h-full sm:h-[calc(100vh-50px)] max-w-[500px] w-full">
      {snackBarOpen && (
        <Snackbar
          type={isCorrectAnswer ? "win" : "fail"}
          setIsOpen={setSnackBarOpen}
        />
      )}
      <Board handleTyping={handleTyping} />
      <Keyboard handleTyping={handleTyping} />
    </div>
  );
};

export default Main;
