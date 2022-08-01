import React, { useRef } from "react";
import { useClickOutside } from "../../hooks";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

interface Props {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  fadeIn: {
    opacity: 1,
  },
};
const contentVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  fadeIn: {
    opacity: 1,
    y: 0,
  },
};

export const Modal: React.FC<Props> = ({ children, setIsOpen }) => {
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <motion.div
      className="fixed top-0 left-0 w-full min-h-full sm:min-h-screen z-10 flex justify-center items-center bg-white/30 dark:bg-black/30"
      variants={overlayVariants}
      initial={"initial"}
      animate={"fadeIn"}
      exit={"initial"}
      transition={{
        ease: "easeIn",
        duration: 0.2,
      }}
    >
      <motion.div
        key={"modal"}
        className="relative w-full max-w-[500px] bg-white dark:bg-[#1d1d1d] border-[.5px] border-base-gray-light/50 p-4 shadow-lg shadow-black/10 rounded-md"
        ref={ref}
        variants={contentVariants}
        initial={"initial"}
        animate={"fadeIn"}
        exit={"initial"}
        transition={{
          ease: "easeIn",
          duration: 0.2,
        }}
      >
        <button
          className="absolute top-2 right-2"
          onClick={() => setIsOpen(false)}
        >
          <IoClose size={28} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default Modal;
