import Head from "next/head";
import Dashboard from "../../components/Dashboard";
import type { NextDashboardPage } from '../../types';

const UsersPage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Users - Learning Day</title>
      </Head>
      teste
    </>
  );
};

UsersPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default UsersPage;
