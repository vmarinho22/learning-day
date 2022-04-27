import api from '@services/api';
import cookies from '@services/cookies';
import Head from "next/head";
import Dashboard from "../../../components/Dashboard";

const UserProfile = ({ user }: any) => {
    return (
        <>
             <Head>
                <title>Perfil - {user.name}</title>
            </Head>
            <h1 className="text-4xl ">Perfil - {user.name}</h1>
            <p className="mt-5">Aqui você irá gerenciar todas as ações do usuário!</p>
        </>
    );
}

UserProfile.getLayout = function getLayout(page: any) {
    return (
        <Dashboard>{page}</Dashboard>
    )
  }

export default UserProfile;

export const getServerSideProps = async (ctx: any) => {
    const { getCookie } = cookies();
    const { id } = ctx.params;

    const token = getCookie('server', 'token', ctx);

    try {
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;
        api.defaults.headers.common['Content-Type'] = 'application/graphql';

        const response = await api.post('/graphql', {
            query: `query getUser($id: ID!){
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

        return {
            props: {
                user : response.data?.data?.user || {}
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                user : {}
            },
        };
    }
}