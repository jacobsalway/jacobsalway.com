"use client";

import clsx from "clsx";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const NavLink = ({ href, text }: { href: string; text: string }) => {
  const segment = useSelectedLayoutSegment();
  const isActive = href.substring(1) === (segment ?? "");

  return (
    <Link
      href={href}
      className={clsx(
        "mr-1 rounded px-3 py-2 no-underline hover:bg-gray-200 dark:hover:bg-gray-700",
        {
          "font-semibold": isActive,
          "font-normal text-gray-600 hover:text-blue-500 dark:text-gray-400":
            !isActive,
        }
      )}
    >
      {text}
    </Link>
  );
};

export default NavLink;
