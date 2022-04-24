import ActionsButton from '@components/ActionsButton';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import api from '@services/api';
import cookies from '@services/cookies';
import Head from "next/head";
import { useState } from 'react';
import { FaPen, FaPlus } from "react-icons/fa";
import Dashboard from "../../components/Dashboard";
import type { NextPagePropsType, UsersType } from '../../types/defaultTypes';

const UsersPage = ({ data }: NextPagePropsType<UsersType[]>) => {

  const [ selectionModel, setSelectionModel ] = useState<GridSelectionModel>([]);
  const [ users ] = useState<UsersType[]>(data);

  const columns: GridColDef[] = [
    { field: 'id' ,headerName: 'ID', width: 80},
    { field: 'name' ,headerName: 'Nome', width: 200},
    { field: 'mail' ,headerName: 'E-mail', width: 200},
  ];
  
  return (
    <>
      <Head>
        <title>Usuários - Learning Day</title>
      </Head>
        <h1 className="text-4xl italic font-semibold">Usuários</h1>
        <p className="mt-5">Aqui você irá gerenciar todas as ações dos usuários!</p>
        <div className="w-full mt-5" style={{height: '50vh'}}>
          <DataGrid 
            rows={users} 
            columns={columns} 
            checkboxSelection 
            pagination
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        </div>
        <ActionsButton items={selectionModel} link="users">
          {selectionModel.length > 0 ? <FaPen /> : <FaPlus />}
        </ActionsButton>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default UsersPage;

export const getServerSideProps = async (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie('token', ctx);

  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    api.defaults.headers.common['Content-Type'] = 'application/graphql';
  
    const response = await api.post('/graphql', {
      query: `query getUsers{
        users {
            id
            name
            mail
        }
      }`
    });

    const data = response.data?.data?.users?.map((user: any, index: any) => {
      return {
        id: user.id,
        name: user.name,
        mail: user.mail
      }
    });

    return {
      props: {
        data
      },
    };
  } catch (err) {
    console.error('Erro ao realizar requisição', err);
    return {
      props: {
        data: []
      },
    };
  }
}
