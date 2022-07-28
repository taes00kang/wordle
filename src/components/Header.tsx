import React, { useState } from "react";
import { useAppSelector } from "../store";
import { ThemeToggle } from ".";
import { MdInfoOutline } from "react-icons/md";
import { AnimatePresence } from "framer-motion";
import { InfoModal } from './modals'

interface Props {}

export const Header: React.FC<Props> = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const answer = useAppSelector((state) => state.guesses.answer);

  return (
    <div className="flex items-center justify-between w-full h-[50px] border-b-[.5px] border-slate-400 px-1 sm:px-8">
      <button className="flex items-center justify-center w-16" onClick={() => setModalOpen(true)}>
        <MdInfoOutline size={28} />
        <div>{answer}</div>
      </button>
      <AnimatePresence>
        {modalOpen && (
          <InfoModal setIsOpen={setModalOpen} />
        )}
      </AnimatePresence>

      <h1 className="flex tracking-widest">WORDLE</h1>

      <ThemeToggle />
    </div>
  );
};

export default Header;
