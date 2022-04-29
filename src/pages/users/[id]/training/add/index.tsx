import Autocomplete from "@mui/material/Autocomplete";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from "react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dashboard from "../../../../../components/Dashboard";
import type { NextDashboardPage } from "../../../../../types/defaultTypes";

const MySwal = withReactContent(Swal);

const AddPage: NextDashboardPage = ({ id, user, trainings, token }: any) => {
  const router = useRouter();
  const [value, setValue] = useState<string | null>('');
  const [training, setTraining] = useState<string>('');
  const [trainingId, setTrainingId] = useState<string>('');

  const data = trainings?.map((training: any) => {
    return { label: training.name, id: training.id };
  });

  const handleChangeTraining = (_: any, newInputValue: any) => {
    setTraining(newInputValue);
  }

  const handleGetValue = (event: any, newValue: any) => {
    setValue(newValue);
    setTrainingId(newValue?.id);
  }

  const handleSubmit = async () => {
    let error: boolean = false;
    let errorMsg: string = '';

    if(training === '') {
      error = true;
      errorMsg += 'Treinamento não pode ser vazio! <br>';
    }

    if(error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errorMsg,
      });
    }

    try {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['Content-Type'] = 'application/graphql';

      await api.post('/graphql', {
        query: `mutation($data: createHistoricInput!) {
          createHistoric(data: $data) {
            id
          }
        }`,
        variables: {
          data: {
            userId: id,
            trainingId: trainingId,
          }
        }
      });

      MySwal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: "Usuário criado com sucesso! A o usuário e senha serão enviados para o e-mail informado.",
      }).then(() => {
        router.push(`/users/${id}`);
      });
      
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: "Aconteceu um erro inesperado ao servidor, tente novamente mais tarde!",
      });
    }
  }

  return (
    <>
      <Head>
        <title>Adicionar treinamento a {user.name} - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Adicionar Treinamento</h1>
      <p className="mt-5">
        Aqui você irá cadastrar um treinamento ao {user.name}!
      </p>
      <br />
      <div>
        <form>
          <Autocomplete
            disablePortal
            id="training"
            options={data}
            sx={{ width: { md: "50vw", sm: "100%" } }}
            value={value}
            inputValue={training}
            onChange={handleGetValue}
            onInputChange={handleChangeTraining}
            renderInput={(params) => <TextField variant="standard" {...params} label="Treinamento" />}
          />
          <br />
          <Button className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold" onClick={handleSubmit}>
            Adicionar
          </Button>
        </form>
      </div>
    </>
  );
};

AddPage.getLayout = function getLayout(page: any) {
  return <Dashboard>{page}</Dashboard>;
};

export default AddPage;

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

    const trainings = await api.post("/graphql", {
      query: `
        query getTrainings{
          trainings{
            id
            name
          }
        }`,
    });

    return {
      props: {
        id,
        user: user.data?.data?.user || {},
        trainings: trainings.data?.data?.trainings || [],
        token,
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
