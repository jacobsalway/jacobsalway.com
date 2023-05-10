import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const SocialLink = ({ link, icon }: { link: string; icon: IconProp }) => (
  <Link href={link} target="_blank" rel="noreferrer">
    <button className="flex flex-row items-center transition-transform hover:-translate-y-0.5 hover:text-blue-500">
      <FontAwesomeIcon className="h-6 w-6" icon={icon} />
    </button>
  </Link>
);

export default function Home() {
  return (
    <div>
      <h1 className="mb-2 text-4xl font-bold sm:text-5xl">Jacob Salway</h1>
      <h2 className="text-lg sm:text-xl">
        Software Engineer at{" "}
        <Link
          href="https://www.rokt.com/"
          className="font-bold underline hover:text-blue-500"
        >
          Rokt
        </Link>
      </h2>
      <div className="mt-6">
        I&apos;m a software engineer based in Sydney, Australia. I&apos;ve
        previously worked as a data engineer at{" "}
        <Link
          href="https://www.simplemachines.com.au/"
          className="underline hover:text-blue-500"
        >
          Simple Machines
        </Link>{" "}
        and as a data analyst/engineer at{" "}
        <Link
          href="https://www.domain.com.au/"
          className="underline hover:text-[#0ea800]"
        >
          Domain
        </Link>
        . I also do some full-stack web development on the side.
      </div>
      <div className="mt-6 flex space-x-5">
        <SocialLink link={"https://github.com/jacobsalway"} icon={faGithub} />
        <SocialLink
          link={"https://www.linkedin.com/in/jacobsalway/"}
          icon={faLinkedin}
        />
        <SocialLink link={"mailto:jacob.salway@gmail.com"} icon={faEnvelope} />
      </div>
    </div>
  );
}
