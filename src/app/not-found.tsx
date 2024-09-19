import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div>
      <h2 className="text-3xl font-bold">404</h2>
      <p className="mt-2">It looks like this page doesn&apos;t exist.</p>
    </div>
  );
}
