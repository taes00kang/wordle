import type { GetServerSidePropsContext, NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Box } from "../components";
import { useAppSelector, useAppDispatch } from "../store";
import data from "../store/data";
import { useState, useEffect } from "react";

import nookies from "nookies";
import { saveAnswer, refreshAnswer } from "../store/guessesSlice";
import { ThemeToggle, Board } from "../components";

interface Props {
  answer_from_cookie: string;
}
const Home: NextPage<Props> = ({ answer_from_cookie }) => {
  useEffect(() => {
    if (answer_from_cookie) {
      dispatch(saveAnswer(answer_from_cookie));
    } else {
      dispatch(refreshAnswer());
    }
  }, []);

  const answer = useAppSelector((state) => state.guesses.answer);

  const dispatch = useAppDispatch();

  

  // setTheme("dark");
  // // setTheme("light")
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Head>
        <title>Wordle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-between w-full h-[50px] border-b-[.5px] border-slate-400 px-8">
        <div>menu</div>
        <h1 className="flex tracking-widest">WORDLE</h1>
        <ThemeToggle />
      </div>

      <Board />

      <div>{answer}</div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx);
  const answer_from_cookie = cookies["answer_from_cookie"]
    ? cookies["answer_from_cookie"]
    : null;

  return {
    props: {
      answer_from_cookie: answer_from_cookie,
    },
  };
}
