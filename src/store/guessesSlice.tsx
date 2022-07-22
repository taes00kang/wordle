import { createSlice } from "@reduxjs/toolkit";
import data from "./data";
import type { Result } from ".";

const initialState = {
  answer: "",
  lines: Array<string>(6).fill(""),
  currentLine: 0,
  lineResult: Array<Result>(5).fill("notMatched"),
};

const guessesSlice = createSlice({
  name: "guesses",
  initialState: initialState,
  reducers: {
    saveAnswer(state, action) {
      state.answer = action.payload;
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
    submitGuess(state) {
      for (let i = 0; i < state.lines[state.currentLine].length; i++) {
        if (state.answer.includes(state.lines[state.currentLine][i])) {
          if (state.answer[i] === state.lines[state.currentLine][i]) {
            state.lineResult[i] = "matched";
          } else {
            state.lineResult[i] = "wrongPlace";
          }
        }
      }
    },
  },
});

export const { refreshAnswer, addValue, deleteValue, saveAnswer, submitGuess } =
  guessesSlice.actions;

export default guessesSlice.reducer;
