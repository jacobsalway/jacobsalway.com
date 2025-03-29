import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function Projects() {
  return (
    <>
      <h1 className="text-2xl font-bold">Projects</h1>
      <h2 className="mt-4 text-lg font-bold">Ongoing</h2>
      <ul className="mt-4 list-disc pl-8">
        <li>
          <a href="https://www.livetransit.com.au" target="_blank">
            LiveTransit: web-based departure boards for Sydney public transport
          </a>
        </li>
        <li>
          Contributing to{" "}
          <a href="https://github.com/kubeflow/spark-operator" target="_blank">
            <code>kubeflow/spark-operator</code>
          </a>
        </li>
      </ul>
      <h2 className="mt-4 text-lg font-bold">Past</h2>
      <ul className="mt-4 list-disc pl-8">
        <li>
          <a
            href="https://github.com/jacobsalway/rba-implied-interest-rate-lambda"
            target="_blank"
          >
            Extracting implied interest rate data from PDFs
          </a>
        </li>
      </ul>
    </>
  );
}
