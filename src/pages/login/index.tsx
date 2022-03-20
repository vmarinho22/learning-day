import type { NextPage } from 'next';
import Head from 'next/head';

const LoginPage: NextPage = () => {
  return (
    <div className="min-w-full min-h-screen bg-gradient-to-r from-pr-purple to-pr-ocean flex flex-col items-center justify-center">
      <Head>
        <title>Login - Learning Day</title>
      </Head>
      <div className="w-1/4 h-auto flex flex-col items-center justify-center bg-white rounded-lg p-2">
        Login
      </div>
    </div>
  )
}

export default LoginPage;
