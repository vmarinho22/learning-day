import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import FadeIn from 'react-fade-in';
import { BiChevronRight } from "react-icons/bi";

const Home: NextPage = () => {
  return (
    <div className="min-w-full min-h-screen bg-gradient-to-r from-pr-purple to-pr-ocean flex flex-col items-center justify-center">
      <Head>
        <title>Learning Day</title>
      </Head>

      <div className="w-1/2 h-50 flex flex-col items-center justify-center">
        <FadeIn transitionDuration={1000}>
          <Image
            src="/img/logo/logo.png"
            alt="Learning Day"
            width={300}
            height={300}
            priority={true}
          />
        </FadeIn>
        <FadeIn transitionDuration={2000}>
          <Link href="/login">
            <a className="flex flex-row items-center text-xl font-normal uppercase bg-white hover:bg-black hover:text-white py-2 pl-3 pr-1 rounded-lg transition ease-in-out delay-50 duration-300">
              ACESSAR
              <BiChevronRight size="2rem" />
            </a>
          </Link>
        </FadeIn>
      </div>
    </div>
  );
};

export default Home;
