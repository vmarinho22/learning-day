
import Head from "next/head";
import Dashboard from "../../../components/Dashboard";
import type { NextDashboardPage } from '../../../types';

const CreateUserPage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Criar usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl italic font-semibold">Criar usuário</h1>
    </>
  );
};

CreateUserPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default CreateUserPage;
