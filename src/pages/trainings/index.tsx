
import Head from "next/head";
import DataTable from 'react-data-table-component';
import { FaEdit } from "react-icons/fa";
import Dashboard from "../../components/Dashboard";
import type { NextDashboardPage } from '../../types/defaultTypes';

const columns = [
  {
      name: 'Nome',
      selector: (row: { name: any; }) => row.name,
      sortable: true,
  },
  {
      name: 'E-mail',
      selector: (row: { mail: any; }) => row.mail,
      sortable: true,
  },
  {
      name: 'Permissão',
      selector: (row: { permission: any; }) => row.permission,
      sortable: true,
  },
  {
      name: 'Ação',
      selector: (row: { actions: any; }) => row.actions,
      sortable: false,
  },
];


const actions = <FaEdit onClick={() => null} />;

const data = [
  {id: 1, name: 'Teste One', mail: 'teste@teste.com', permission: 1, actions},
  {id: 2, name: 'Teste Two', mail: 'teste@teste.com', permission: 1, actions},
  {id: 3, name: 'Teste Three', mail: 'teste@teste.com', permission: 1, actions},
  {id: 4, name: 'Teste Four', mail: 'teste@teste.com', permission: 1, actions},
  {id: 5, name: 'Teste Five', mail: 'teste@teste.com', permission: 1, actions},
  {id: 6, name: 'Teste Six', mail: 'teste@teste.com', permission: 1, actions},
  {id: 7, name: 'Teste Seven', mail: 'teste@teste.com', permission: 1, actions},
  {id: 8, name: 'Teste Eight', mail: 'teste@teste.com', permission: 1, actions},
  {id: 9, name: 'Teste Nine', mail: 'teste@teste.com', permission: 1, actions},
  {id: 10, name: 'Teste Ten', mail: 'teste@teste.com', permission: 1, actions},
]

const TrainingsPage: NextDashboardPage = () => {
  return (
    <>
      <Head>
        <title>Treinamentos - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Treinamentos</h1>
      <p className="mt-5">Aqui você irá gerenciar todas as ações das categorias de treinamentos.</p>
      <div className="w-full mt-5">
        <DataTable
            columns={columns}
            data={data}
            pagination
        />
      </div>
    </>
  );
};

TrainingsPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default TrainingsPage;
