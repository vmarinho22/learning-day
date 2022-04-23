
import Head from "next/head";
import Dashboard from "../../components/Dashboard";
import type { NextDashboardPage } from '../../types/defaultTypes';

const HomePage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Ínicio - Learning Day</title>
      </Head>
      <h1 className="text-4xl italic font-semibold">Home</h1>
    </>
  );
};

HomePage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default HomePage;
