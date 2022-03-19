import type { NextPage } from 'next';
import Head from 'next/head';

const LoginPage: NextPage = () => {
  return (
    <div className="min-w-full min-h-screen bg-gradient-to-r from-pr-purple to-pr-ocean flex flex-col items-center justify-center">
      <Head>
        <title>Learning Day</title>
        <meta name="description" content="Um projeto da faculdade sobre um sistema de controle de treinamentos de funcionários para RH de empresas" />
        <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme:no-preference)"/>
        <link rel="icon" href="/favicon.ico" media="(prefers-color-scheme:dark)"/>
        <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme:light)"/>
      </Head>
      
      <div className="w-1/2 h-50 flex flex-col items-center justify-center">
        Login
      </div>
    </div>
  )
}

export default LoginPage;
