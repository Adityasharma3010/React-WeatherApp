import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="relative w-14 h-14 rounded-full border border-glow p-2 shadow-[0_0_15px_#0ff] transition-all duration-500 hover:scale-110"
    >
      {dark ? (
        <MoonIcon className="text-white drop-shadow-[0_0_8px_white] transition-all duration-500" />
      ) : (
        <SunIcon className="text-yellow-400 drop-shadow-[0_0_6px_gold] transition-all duration-500" />
      )}
      <div className="absolute -inset-1 rounded-full animate-pulse blur-md bg-glow opacity-30 z-[-1]"></div>
    </button>
  );
}
