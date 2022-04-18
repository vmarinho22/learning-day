
import Head from "next/head";
import Dashboard from "../../../components/Dashboard";
import type { NextDashboardPage } from '../../../types';

const UpdateUserPage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Atualizar usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl italic font-semibold">Atualizar usuário</h1>
    </>
  );
};

UpdateUserPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default UpdateUserPage;
