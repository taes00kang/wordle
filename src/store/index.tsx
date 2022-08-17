import { configureStore } from "@reduxjs/toolkit";
import guessesReducer from "./guessesSlice";
import historyReducer from "./historySlice";
import { Provider } from "react-redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    guesses: guessesReducer,
    history: historyReducer,
  },
});

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export type Result = "matched" | "wrongPlace" | "notMatched";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
