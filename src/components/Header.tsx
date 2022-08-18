import React, { useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import { InfoModal, UserModal } from "./modals";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Props {
  setSnackBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<Props> = ({ setSnackBarOpen }) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const { theme } = useTheme();

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
        {userModalOpen && (
          <UserModal
            setIsOpen={setUserModalOpen}
            setSnackBarOpen={setSnackBarOpen}
          />
        )}
      </AnimatePresence>

      <Image
        src={theme === "dark" ? "/logo_dark.svg" : "/logo_light.svg"}
        width={90}
        height={50}
      />

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
