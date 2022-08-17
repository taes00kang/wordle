import { createSlice } from "@reduxjs/toolkit";

export interface IGameHistory {
  playHistory: Array<number | "lose">;
  currentStreak: number;
  maxStreak: number;
}

const initialState: IGameHistory = {
  playHistory: [],
  currentStreak: 0,
  maxStreak: 0,
};

const historySlice = createSlice({
  name: "history",
  initialState: initialState,
  reducers: {
    appendToHistory(
      state,
      action: { payload: PlayHistoryValue; type: string }
    ) {
      const prevHistory = state.playHistory;
      state.playHistory = [...prevHistory, action.payload];
      switch (action.payload) {
        case "lose":
          historySlice.caseReducers.resetCurrentStreak(state);
          break;

        default:
          historySlice.caseReducers.increaseCurrentStreak(state);
          break;
      }
    },
    setHistory(state, action: { payload: IGameHistory; type: string }) {
      Object.assign(state, action.payload);
    },
    increaseCurrentStreak(state) {
      state.currentStreak++;

      if (state.currentStreak > state.maxStreak) {
        state.maxStreak = state.currentStreak;
      }
    },
    resetCurrentStreak(state) {
      state.currentStreak = 0;
    },
  },
});

export type PlayHistoryValue = typeof initialState.playHistory[0];
export type PlayHistory = typeof initialState.playHistory;
export const { appendToHistory, setHistory } = historySlice.actions;

export default historySlice.reducer;
