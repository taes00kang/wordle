import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import nookies from "nookies";
import { useAppDispatch } from "../store";
import { refreshAnswer, setAllStates } from "../store/guessesSlice";
import { setHistory } from "../store/historySlice";
import { Header, Main } from "../components";
// types
import { AllStates } from "../store/guessesSlice";
import { IGameHistory } from "../store/historySlice";

interface Props {
  previous_state: AllStates;
  game_history: IGameHistory;
}
const Home: NextPage<Props> = ({ previous_state, game_history }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (previous_state && previous_state.answer !== "") {
      dispatch(setAllStates(previous_state));
    } else {
      dispatch(refreshAnswer());
    }
    if (game_history) {
      dispatch(setHistory(game_history));
    }
  }, [previous_state, game_history]);

  return (
    <div className="flex flex-col w-full h-full sm:min-h-screen items-center">
      <Head>
        <title>Wordle by Taesoo</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico?" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>

      <Header />
      <Main />
    </div>
  );
};

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // get previous state stored in cookie.
  const cookies = nookies.get(ctx);
  const game_history = cookies["game_history"];
  const previous_state = cookies["previous_state"];

  return {
    props: {
      previous_state: previous_state ? JSON.parse(previous_state) : null,
      game_history: game_history ? JSON.parse(game_history) : null,
    },
  };
}
