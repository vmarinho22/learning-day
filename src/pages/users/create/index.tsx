
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import api from '@services/api';
import passwordGenerator from '@services/passwordGenerator';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dashboard from "../../../components/Dashboard";
import cookies from "../../../services/cookies";
import type { NextDashboardPage } from '../../../types/defaultTypes';

const MySwal = withReactContent(Swal);

const CreateUserPage: NextDashboardPage = ({ token }: any) => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [permission, setPermission] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChangingName = (event: any) => {
    setName(event.target.value);
  }

  const handleChangingMail = (event: any) => {
    setMail(event.target.value);
  }

  const handleChangingPermission = (event: any) => {
    setPermission(event.target.value);
  }

  const handleCheckError = (event: any) => {
    if(event.target.value === ''){
      setError(event.target.id);
    }else{
      setError('');
    }
  }

  const handleSubmit = async () => {
    let error: boolean = false;
    let errorMsg: string = '';

    setLoading(true);

    if(name === '') {
      error = true;
      errorMsg += 'Nome não pode ser vazio! <br>';
    }else if(mail === '') {
      error = true;
      errorMsg += 'E-mail não pode ser vazio! <br>';
    }

    if(error) {
      setLoading(false);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: errorMsg,
      });
    }

    const password: string = passwordGenerator();

    try {
      api.defaults.headers.common['authorization'] = `Bearer ${token}`;
      api.defaults.headers.common['Content-Type'] = 'application/graphql';

      await api.post('/graphql', {
        query: `mutation($data: createUserInput!) {
          createUser(data: $data) {
            name
          }
        }`,
        variables: {
          data: {
            name: name,
            mail: mail,
            password: password,
            permission: permission,
          }
        }
      });

      // TODO - criar sistema de envio de e-mail

      MySwal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: "Usuário criado com sucesso! A o usuário e senha serão enviados para o e-mail informado.",
      }).then(() => {
        router.push('/users');
      });

    } catch(error) {
      console.error(error.message);
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        html: "Aconteceu um erro inesperado ao servidor, tente novamente mais tarde!",
      });
    }

    setLoading(false);

  }

  return (
    <>
      <Head>
        <title>Criar usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Criar usuário</h1>
      <p className="mt-5">Aqui você irá criar uma conta de usuário. Preencha todos os campos corretamente!</p>
      <br />
      <div className="w-2/3">
        <TextField
          className="mb-4"
          type="text"
          id="name"
          value={name}
          label="Nome"
          size="small"
          variant="standard"
          fullWidth
          onChange={handleChangingName}
          onBlur={handleCheckError}
          error={error === 'name'}
          helperText={error === 'name' ? 'Preencha o nome corretamente!' : ''}
        />
        <TextField
          className="mb-4"
          type="email"
          id="mail"
          value={mail}
          label="E-mail"
          size="small"
          variant="standard"
          fullWidth
          onChange={handleChangingMail}
          onBlur={handleCheckError}
          error={error === 'mail'}
          helperText={error === 'mail' ? 'Preencha o E-mail corretamente!' : ''}
        />
        <FormControl className="mb-4" variant="standard" size="small" fullWidth>
          <InputLabel id="permission">Permissão</InputLabel>
          <Select
            labelId="permission"
            id="permission"
            label="Permissão"
            value={permission}
            onChange={handleChangingPermission}
          >
            <MenuItem value={0}>Usuário</MenuItem>
            <MenuItem value={1}>Administrador</MenuItem>
            <MenuItem value={2}>Super Administrador</MenuItem>
          </Select>
      </FormControl>
      <LoadingButton
        className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold"
        loading={loading}
        onClick={handleSubmit}
      >
        Criar usuário
      </LoadingButton>
      </div>
    </>
  );
};

CreateUserPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default CreateUserPage;

export const getServerSideProps = (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie('token', ctx);

  return {
    props: {
      token,
    }
  }
}