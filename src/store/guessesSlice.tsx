import { createSlice } from "@reduxjs/toolkit";
import data from "./data.json";
import type { Result } from ".";

const initialState = {
  answer: "",
  lines: new Array<string>(6).fill(""),
  currentLine: 0,
  resultsTable: new Array<Result[]>(6).fill(Array(5).fill("notMatched")),
  isCorrectAnswer: false,
  isValidGuess: true,
};

const guessesSlice = createSlice({
  name: "guesses",
  initialState: initialState,
  reducers: {
    resetStates(state) {
      Object.assign(state, initialState);
      guessesSlice.caseReducers.refreshAnswer(state)
    },
    setAllStates(state, action: { payload: allStates; type: string }) {
      const payload = action.payload;
      Object.assign(state, payload);
      // state.answer = payload.answer;
      // state.lines = payload.lines;
      // state.currentLine = payload.currentLine;
      // state.resultsTable = payload.resultsTable;
      // state.isCorrectAnswer = payload.isCorrectAnswer;
      // state.isValidGuess = payload.isValidGuess;
    },
    refreshAnswer(state) {
      const newAnswer = data[Math.floor(Math.random() * (data.length + 1))];
      state.answer = newAnswer;
    },
    addValue(state, action) {
      state.lines[state.currentLine] =
        state.lines[state.currentLine] + action.payload;
    },
    deleteValue(state) {
      state.lines[state.currentLine] = state.lines[state.currentLine].slice(
        0,
        -1
      );
    },
    setIsValidGuess(state, action) {
      state.isValidGuess = action.payload;
    },
    submitGuess(state) {
      for (let i = 0; i < state.lines[state.currentLine].length; i++) {
        if (state.answer.includes(state.lines[state.currentLine][i])) {
          if (state.answer[i] === state.lines[state.currentLine][i]) {
            state.resultsTable[state.currentLine][i] = "matched";
          } else {
            state.resultsTable[state.currentLine][i] = "wrongPlace";
          }
        }
      }
      state.currentLine++;
      if (
        state.resultsTable[state.currentLine - 1].every(
          (value) => value === "matched"
        )
      ) {
        state.isCorrectAnswer = true;
      }
    },
  },
});

export type allStates = typeof initialState;
export const {
  refreshAnswer,
  resetStates,
  addValue,
  deleteValue,
  submitGuess,
  setIsValidGuess,
  setAllStates,
} = guessesSlice.actions;

export default guessesSlice.reducer;
