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
      className={clsx("mr-1 rounded py-2 px-3 no-underline hover:bg-gray-200", {
        "font-semibold": isActive,
        "font-normal text-gray-600 hover:text-blue-500": !isActive,
      })}
    >
      {text}
    </Link>
  );
};

export default NavLink;
