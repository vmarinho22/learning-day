import Fab from '@mui/material/Fab';
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import Link from 'next/link';
import { FaEnvelope, FaKey, FaPen, FaUnlockAlt } from "react-icons/fa";
import Dashboard from "../../../components/Dashboard";

const UserProfile = ({ id, user, trainings }: any) => {
  const permissions: string[] = [
    "Super Administrador",
    "Administrador",
    "Usuário",
  ];
  return (
    <>
      <Head>
        <title>{user.name} - Perfil Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Perfil</h1>
      <p className="mt-5">Aqui você irá gerenciar todas as ações do usuário!</p>
      <br />
      <h2 className="text-3xl font-medium">{user.name}</h2>
      <br />
      <div className="flex flex-column items-center">
        <FaEnvelope className="mr-2" />
        <span className="font-medium mr-1">E-mail:</span>{user.mail}
      </div>
      <div className="flex flex-column items-center">
        <FaKey className="mr-2" />
        <span className="font-medium mr-1">Permissão:</span>{permissions[user.permission]}
      </div>
      <div className="flex flex-column items-center">
        <FaUnlockAlt className="mr-2" />
        <span className="font-medium mr-1">Bloqueado:</span>{user.block ? "Sim" : "Não"}
      </div>
      <br />
      <h3 className="text-2xl font-medium">Treinamentos realizados</h3>
      <br />
      {trainings.length === 0 && (
          <p>Nenhum treinamento realizado :/</p>
      )}
      <div className="fixed bottom-4 right-4">
        <Link href={`/users/update/${id}`} passHref>
          <Fab className="bg-gradient-to-r from-pr-purple to-pr-ocean hover:from-pr-ocean hover:to-pr-purple duration-500 origin-left text-white" aria-label="add">
            <FaPen className="text-white" />
          </Fab>
        </Link>
      </div>
    </>
  );
};

UserProfile.getLayout = function getLayout(page: any) {
  return <Dashboard>{page}</Dashboard>;
};

export default UserProfile;

export const getServerSideProps = async (ctx: any) => {
  const { getCookie } = cookies();
  const { id } = ctx.params;

  const token = getCookie("server", "token", ctx);

  try {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    api.defaults.headers.common["Content-Type"] = "application/graphql";

    const user = await api.post("/graphql", {
      query: `query getUser($id: ID!){
              user(id: $id) {
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

    const trainings: string[] = [];

    return {
      props: {
        id,
        user: user.data?.data?.user || {},
        trainings: trainings || [],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        user: {},
      },
    };
  }
};
