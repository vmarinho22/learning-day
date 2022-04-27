
import Head from "next/head";
import Dashboard from "../../../components/Dashboard";
import type { NextDashboardPage } from '../../../types/defaultTypes';

const DeleteUserPage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Deletar usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Deletar usuário</h1>
    </>
  );
};

DeleteUserPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default DeleteUserPage;
