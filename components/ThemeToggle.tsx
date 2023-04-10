"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isLight = resolvedTheme === `light`;
  const oppositeTheme = isLight ? `dark` : `light`;

  const toggleTheme = () => setTheme(oppositeTheme);

  return (
    <div className="h-9 w-9">
      {mounted && (
        <button
          className="flex h-9 w-9 items-center justify-center rounded bg-gray-200 p-2.5 dark:bg-gray-500 dark:text-white"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon
            className="h-4 w-4"
            icon={isLight ? faMoon : faSun}
          />
        </button>
      )}
    </div>
  );
};
