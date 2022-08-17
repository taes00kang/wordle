import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { InfoModal, UserModal } from "./modals";

interface Props {}

export const Header: React.FC<Props> = () => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full h-[50px] border-b-[.5px] border-slate-400 px-1 sm:px-8">
      <button
        className="flex items-center justify-center w-16"
        onClick={() => setInfoModalOpen(true)}
      >
        <MdInfoOutline size={28} />
      </button>
      <AnimatePresence>
        {infoModalOpen && <InfoModal setIsOpen={setInfoModalOpen} />}
        {userModalOpen && <UserModal setIsOpen={setUserModalOpen} />}
      </AnimatePresence>

      <h1 className="flex tracking-widest">WORDLE</h1>

      <button
        className="flex items-center justify-center w-16"
        onClick={() => setUserModalOpen(true)}
      >
        <FaRegUserCircle size={24} />
      </button>
    </div>
  );
};

export default Header;
