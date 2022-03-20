import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/image";
import FadeIn from 'react-fade-in';
import Login from '../../components/Login';

const LoginPage: NextPage = () => {
  return (
    <div className="min-w-full min-h-screen bg-gradient-to-r from-pr-purple to-pr-ocean flex flex-col items-center justify-center">
      <Head>
        <title>Login - Learning Day</title>
      </Head>
      <div className="w-1/4 h-auto flex flex-col items-center justify-center bg-white rounded-lg p-4">
      <FadeIn transitionDuration={1000}>
          <Image
            src="/img/logo/logo-dark.png"
            alt="Learning Day"
            width={120}
            height={120}
            priority={true}
          />
        </FadeIn>
        <Login/>
      </div>
    </div>
  )
}

export default LoginPage;
