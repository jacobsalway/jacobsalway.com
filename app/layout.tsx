import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col">
            <nav className="mb-14 flex w-full items-center justify-between py-6 pl-3 pr-6">
              <div>
                <NavLink href="/" text="Home" />
                <NavLink href="/blog" text="Blog" />
              </div>
              <ThemeToggle />
            </nav>
            <div className="flex flex-grow flex-col px-6 pb-6">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
