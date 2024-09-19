import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const links = [
  { value: "Home", href: "/" },
  { value: "Projects", href: "/projects" },
  { value: "Blog", href: "/blog" },
];

export const metadata: Metadata = {
  title: {
    template: "%s | Jacob Salway",
    default: "Jacob Salway",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="mx-auto max-w-screen-md p-6 dark:bg-neutral-800 dark:text-white">
        <header className="mb-10">
          <nav className="space-x-6">
            {links.map((link) => (
              <Link key={link.value} href={link.href}>
                {link.value}
              </Link>
            ))}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
