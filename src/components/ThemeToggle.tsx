import React, { useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, useAnimationControls } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

interface Props {}

const toggleVariants = {
  dark: {
    x: 28,
  },
  light: {
    x: 0,
  },
};

export const ThemeToggle: React.FC<Props> = () => {
  const { theme, setTheme } = useTheme();

  const controls = useAnimationControls();

  useEffect(() => {
    if (theme === "dark") {
      controls.set("dark");
    } else {
      controls.set("light");
    }
  }, []);

  const handleToggle = () => {
    if (theme === "dark") {
      setTheme("light");
      controls.start("light");
    } else {
      setTheme("dark");
      controls.start("dark");
    }
  };
  return (
    <div
      className={`relative w-16 h-8 bg-black rounded-full flex items-center justify-start px-2 cursor-pointer`}
      onClick={handleToggle}
    >
      <div className="flex w-full justify-between">
        <FaMoon size={18} color="#b246ff" />
        <FaSun size={18} color="#dec105" />
      </div>
      <motion.div
        className="absolute left-[6px] dark:right-[6px] w-6 h-6 bg-white rounded-full"
        variants={toggleVariants}
        animate={controls}
        transition={{
          ease: "easeInOut",
          duration: 0.2,
        }}
      />
    </div>
  );
};

export default ThemeToggle;
