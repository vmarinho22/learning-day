
import LoadingButton from '@mui/lab/LoadingButton';
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from 'react';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Dashboard from "../../../components/Dashboard";
import type { NextDashboardPage } from '../../../types/defaultTypes';

const permissions: string[] = ['Super Administrador', 'Administrador', 'Usuário'];

const BlockUserPage: NextDashboardPage = ({token, user}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const MySwal = withReactContent(Swal);
  
  const handleSubmit = async () => {
    setLoading(true);
    MySwal.fire({
      icon: "warning",
      title: "Você realmente quer bloquear esse usuário?",
      showDenyButton: true,
      confirmButtonText: `Sim, ${user.blocked ? 'desbloquear' : 'bloquear'}`,
      denyButtonText: `Não`,
    }).then(async (result) => {
      if (result.isConfirmed) {

        try {
          api.defaults.headers.common["authorization"] = `Bearer ${token}`;
          api.defaults.headers.common["Content-Type"] = "application/graphql";

          const response = await api.post("/graphql", {
            query: `mutation($id: ID!, $data: updateUserInput!) {
              updateUser(id: $id, data: $data) {
                name
              }
            }`,
            variables: {
              id: user.id,
              data: {
                blocked: !user.blocked
              },
            },
          });

          if(response.data?.errors) {
            throw new Error(response.data.errors[0].message);
          }

          MySwal.fire({
            icon: "success",
            title: "Sucesso!",
            html: "Usuário bloqueado com sucesso!",
          }).then(() => {
            setLoading(false);
            router.push("/users");
          });

        } catch (error) {
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            html: "Aconteceu um erro inesperado ao servidor, tente novamente mais tarde!",
          });
        }
      }
    });
  }

  return (
    <>
      <Head>
        <title>{user.blocked ? 'Desbloquear usuário' : 'Bloquear usuário'} - Learning Day</title>
      </Head>
      <h1 className="text-4xl">{user.blocked ? 'Desbloquear usuário' : 'Bloquear usuário'}</h1>
      <p className="mt-5">Aqui você irá {user.blocked ? 'desbloquear' : 'bloquear'} o usuário! Com o boqueio, o usuário não terá mais acesso ao sistema.</p>
      <br />
      <div className="border-2 rounded-md border-gray lg:w-2/3 xs:w-full px-5 py-4">
        <div className="flex flex-row">
          <div className="flex flex-row items-center justify-center w-20 h-20 bg-gray-400 rounded-full mr-5">
            <p className="text-xl">{user.name.charAt(0).toUpperCase()}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <div className="flex flex-row items-center">
              <FaEnvelope className="mr-2" />
              <p className="font-medium text-sm"> {user.mail}</p>
            </div>
            <div className="flex flex-row items-center">
              <FaKey className="mr-2" />  
              <p className="font-medium text-sm">{permissions[user.permission]}</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <LoadingButton
        className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold"
        loading={loading}
        onClick={handleSubmit}
      >
        {user.blocked ? 'Desbloquear usuário' : 'Bloquear usuário'}
      </LoadingButton>
    </>
  );
};

BlockUserPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default BlockUserPage;

export const getServerSideProps = async (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie("server", "token", ctx);
  const { id } = ctx.params;

  api.defaults.headers.common["authorization"] = `Bearer ${token}`;
  api.defaults.headers.common["Content-Type"] = "application/graphql";

  const response = await api.post("/graphql", {
    query: `query($id: ID!) {
      user(id: $id) {
        id
        name
        mail
        permission
        blocked
      }
    }`,
    variables: {
      id,
    },
  });

  return {
    props: {
      token,
      user: response?.data?.data.user || {},
    },
  };
};
