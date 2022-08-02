import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import nookies from "nookies";
import { useAppDispatch } from "../store";
import { allStates } from "../store/guessesSlice";
import { refreshAnswer, setAllStates } from "../store/guessesSlice";
import { Header, Main } from "../components";

interface Props {
  previous_state: allStates;
}
const Home: NextPage<Props> = ({ previous_state }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (previous_state) {
      dispatch(setAllStates(previous_state));
    } else {
      dispatch(refreshAnswer());
    }
  }, []);

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
  const previous_state = cookies["previous_state"]
    ? JSON.parse(cookies["previous_state"])
    : null;

  return {
    props: {
      previous_state: previous_state,
    },
  };
}
