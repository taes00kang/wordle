import React, { useEffect } from "react";
import { Board, Keyboard } from ".";
import { useAppSelector, useAppDispatch } from "../store";
import data from "../store/data.json";
import { setCookie, destroyCookie } from "nookies";

import {
  AllStates,
  addValue,
  deleteValue,
  setIsValidGuess,
  submitGuess,
} from "../store/guessesSlice";

import { appendToHistory, IGameHistory } from "../store/historySlice";

interface Props {
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const storeStateInCookie = (state: AllStates) => {
  const stringifiedState = JSON.stringify(state);
  return setCookie(null, "previous_state", stringifiedState, {
    maxAge: 700 * 24 * 60 * 60,
    sameSite: "lax",
    path: "/",
  });
};

const storeHistoryInCookie = (history: IGameHistory) => {
  const stringifiedHistory = JSON.stringify(history);
  return  setCookie(null, "game_history", stringifiedHistory, {
    maxAge: 700 * 24 * 60 * 60,
    sameSite: "lax",
    path: "/",
  });
};

// ** In case using local storage intead of cookies **  //

// const storeStateInStorage = (state: AllStates) => {
//   const stringifiedState = JSON.stringify(state);
//   localStorage.setItem("previous_state", stringifiedState)
// }

// const storeHistoryInStorage = (history: IGameHistory) => {
//   const stringifiedHistory = JSON.stringify(history);
//   localStorage.setItem("game_history", stringifiedHistory)
// };

export const Main: React.FC<Props> = ({ setSnackBarOpen }) => {
  const allStates = useAppSelector((state) => state.guesses);
  const lines = useAppSelector((state) => state.guesses.lines);
  const currentLine = useAppSelector((state) => state.guesses.currentLine);
  const isCorrectAnswer = useAppSelector(
    (state) => state.guesses.isCorrectAnswer
  );
  const currentGuess = lines[currentLine];
  const dispatch = useAppDispatch();

  const gameHistory = useAppSelector((state) => state.history);

  const gameOver = isCorrectAnswer || currentLine > 5;

  useEffect(() => {
    if (gameOver) {
      isCorrectAnswer
        ? dispatch(appendToHistory(currentLine))
        : dispatch(appendToHistory("lose"));
      destroyCookie(null, "previous_state");
      // localStorage.removeItem("previous_state");
      setTimeout(() => {
        setSnackBarOpen(true);
      }, 1500);
    } else {
      storeStateInCookie(allStates);
      // storeStateInStorage(allStates)
    }
  }, [currentLine, gameOver]);

  useEffect(() => {
    storeHistoryInCookie(gameHistory);
    // storeHistoryInStorage(gameHistory)
  }, [gameHistory]);

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
      <Board handleTyping={handleTyping} />
      <Keyboard handleTyping={handleTyping} />
    </div>
  );
};

export default Main;
