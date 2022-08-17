import React, { useEffect, useState, useMemo } from "react";
import { Modal } from ".";
import { useAppDispatch } from "../../store";
import { resetStates } from "../../store/guessesSlice";
import { destroyCookie } from "nookies";
import { useAppSelector } from "../../store";

interface Props {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const STAT_BOX_CLASSNAME = "flex flex-col gap-2 w-14 items-center";
export const UserModal: React.FC<Props> = ({ setIsOpen }) => {
  const dispatch = useAppDispatch();
  const gameHistory = useAppSelector((state) => state.history);

  const getGameData = () => {
    const numOfPlays = gameHistory.playHistory.length;
    const currentStreak = gameHistory.currentStreak;
    const maxStreak = gameHistory.maxStreak;
    let wins = 0;
    let distribution: { [key: number]: number } = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };

    gameHistory.playHistory.forEach((value) => {
      if (value !== "lose") {
        distribution[value]++;
        wins++;
      }
    });

    const percentWins = Math.ceil(
      (wins / gameHistory.playHistory.length) * 100
    );

    return { distribution, percentWins, numOfPlays, currentStreak, maxStreak };
  };

  const data = useMemo(() => getGameData(), [gameHistory.playHistory]);

  console.log(data);

  const handleNewGameClick = () => {
    dispatch(resetStates());
    setIsOpen(false);
    destroyCookie(null, "previous_state");
  };
  return (
    <Modal setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col items-center justify-center py-2 text-sm">
        <h2 className="uppercase tracking-wider font-bold text-lg">Stats</h2>
        <div className="flex gap-4 py-4">
          <div className={STAT_BOX_CLASSNAME}>
            <h1>{data.numOfPlays}</h1>
            <span className="text-xs text-center">Played</span>
          </div>
          <div className={STAT_BOX_CLASSNAME}>
            <h1>{data.percentWins}</h1>
            <span className="text-xs text-center">Win %</span>
          </div>
          <div className={STAT_BOX_CLASSNAME}>
            <h1>{data.currentStreak}</h1>
            <span className="text-xs text-center">Current Streak</span>
          </div>
          <div className={STAT_BOX_CLASSNAME}>
            <h1>{data.maxStreak}</h1>
            <span className="text-xs text-center">Max Streak</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 py-4 w-full border-y border-base-gray-light/30">
          <h2 className="uppercase tracking-wider font-bold text-lg">Distribution</h2>
          <ul className="flex flex-col gap-1 w-full px-2 sm:px-10 my-2">
            {Object.keys(data.distribution).map((key) => {
              const keyValue = parseInt(key);
              const count = data.distribution[keyValue];
              const maxCount = Math.max(...Object.values(data.distribution));

              return (
                <li className="flex font-bold w-full">
                  <div className="min-w-[24px]">{keyValue} :</div>
                  <div
                    className="flex bg-base-gray-dark justify-end min-w-[24px] px-2"
                    style={{
                      width:`${(count / maxCount) * 100}%`,
                    }}
                  >
                    {count}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex w-full items-center justify-center h-20">
          <button
            className="uppercase font-bold px-6 py-3 bg-green-600 text-white rounded-sm shadow-md"
            onClick={handleNewGameClick}
          >
            New Game
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
