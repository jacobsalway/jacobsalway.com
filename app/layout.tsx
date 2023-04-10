import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Inter } from "next/font/google";
import NavLink from "../components/NavLink";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Jacob Salway",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
          <nav className="mb-14 flex w-full items-center justify-between py-6 pl-3 pr-6">
            <div>
              <NavLink href="/" text="Home" />
              <NavLink href="/blog" text="Blog" />
            </div>
            <button className="flex items-center justify-center rounded bg-gray-200 p-2.5">
              <FontAwesomeIcon className="h-4 w-4" icon={faMoon} />
            </button>
          </nav>
          <div className="flex flex-grow flex-col px-6 pb-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
