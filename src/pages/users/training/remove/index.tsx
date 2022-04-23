import Head from "next/head";
import Dashboard from "../../../../components/Dashboard";
import type { NextDashboardPage } from '../../../../types/defaultTypes';

const RemovePage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Adicionar treinamento a usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl italic font-semibold">Adicionar Treinamento ao usuário</h1>
    </>
  );
};

RemovePage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default RemovePage;
