
import api from '@services/api';
import cookies from '@services/cookies';
import Head from "next/head";
import { useEffect, useState } from 'react';
import Dashboard from "../../../components/Dashboard";
import type { NextDashboardPage } from '../../../types/defaultTypes';

const UpdateUserPage: NextDashboardPage = ({token}: any) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<any>([]);

  api.defaults.headers.common['authorization'] = `Bearer ${token}`;
  api.defaults.headers.common['Content-Type'] = 'application/graphql';

  const fetchData = async (id: string) => {
    const response = await api.post('/graphql', {
      query: `query($id: ID!) {
        user(id: $id) {
          id
          name
          mail
          permission
        }
      }`,
      variables: {
        id
      }
    });
    return response?.data?.data?.user || {};
  }

  useEffect(() => {
    if(sessionStorage.getItem('editAction') !== null) {
      const storagedData = sessionStorage.getItem('editAction') || '';
      const storagedArrayData = storagedData?.split(',') || [];
      setData(storagedArrayData);
      sessionStorage.removeItem('editAction');
    }
  }, []);

  useEffect(() => {
    if(data.length > 0) {
      data?.map((id: string) => {
        fetchData(id).then((user: any) => {
          setUsers((users: any) => [...users, user]);
        });
      });
      setLoading(false);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Atualizar usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Atualizar usuário</h1>
      <p className="mt-5">Aqui você irá editar as informações dos usuários. Altere com cuidado os dados!</p>
      <br />
      { loading && (<h2>Carregando ...</h2>) }
      { users.length > 0 && (
        <div>
          {users.map((user: any, index: number) => (
            <h3 key={index}>{user.id}</h3>
          ))}
        </div>
      )}
    </>
  );
};

UpdateUserPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default UpdateUserPage;

export const getServerSideProps = (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie('token', ctx);

  return {
    props: {
      token,
    }
  }
}