import LoadingButton from "@mui/lab/LoadingButton";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Dashboard from "../../../components/Dashboard";
import type { NextDashboardPage } from "../../../types/defaultTypes";

const MySwal = withReactContent(Swal);

const UpdateUserPage: NextDashboardPage = ({ token, user }: any) => {
  const [name, setName] = useState<string>(user?.name);
  const [mail, setMail] = useState<string>(user?.mail);
  const [permission, setPermission] = useState<number>(user?.permission);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleChangingName = (event: any) => {
    setName(event.target.value);
  };

  const handleChangingMail = (event: any) => {
    setMail(event.target.value);
  };

  const handleChangingPermission = (event: any) => {
    setPermission(event.target.value);
  };

  const handleCheckError = (event: any) => {
    if (event.target.value === "") {
      setError(event.target.id);
    } else {
      setError("");
    }
  };

  const handleSubmit = async () => {
    MySwal.fire({
      icon: "question",
      title: "Você deseja salvar as alterações?",
      showDenyButton: true,
      confirmButtonText: "Salvar",
      denyButtonText: `Não salvar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        let error: boolean = false;
        let errorMsg: string = "";

        setLoading(true);

        if (name === "") {
          error = true;
          errorMsg += "Nome não pode ser vazio! <br>";
        } else if (mail === "") {
          error = true;
          errorMsg += "E-mail não pode ser vazio! <br>";
        }

        if (error) {
          setLoading(false);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            html: errorMsg,
          });
        }

        try {
          api.defaults.headers.common["authorization"] = `Bearer ${token}`;
          api.defaults.headers.common["Content-Type"] = "application/graphql";

          await api.post("/graphql", {
            query: `mutation($id: ID!, $data: updateUserInput!) {
              updateUser(id: $id, data: $data) {
                name
              }
            }`,
            variables: {
              id: user.id,
              data: {
                name: name,
                mail: mail,
                permission: permission,
              },
            },
          });

          MySwal.fire({
            icon: "success",
            title: "Sucesso!",
            html: "Usuário atualizado com sucesso!",
          }).then(() => {
            setLoading(false);
            router.push("/users");
          });
        } catch (error) {
          console.error(error.message);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            html: "Aconteceu um erro inesperado ao servidor, tente novamente mais tarde!",
          });
        }

        setLoading(false);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Atualizar usuário - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Atualizar usuário</h1>
      <p className="mt-5">
        Aqui você irá editar as informações dos usuários. Altere com cuidado os
        dados!
      </p>
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
          error={error === "name"}
          helperText={error === "name" ? "Preencha o nome corretamente!" : ""}
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
          error={error === "mail"}
          helperText={error === "mail" ? "Preencha o E-mail corretamente!" : ""}
        />
        <FormControl className="mb-4" variant="standard" size="small" fullWidth>
          <InputLabel id="permission">Permissão</InputLabel>
          <Select
            labelId="permission"
            id="permission"
            label="Permissão"
            value={permission}
            defaultValue={permission}
            onChange={handleChangingPermission}
          >
            <MenuItem value={0}>Super Administrador</MenuItem>
            <MenuItem value={1}>Administrador</MenuItem>
            <MenuItem value={2}>Usuário</MenuItem>
          </Select>
        </FormControl>
        <LoadingButton
          className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold"
          loading={loading}
          onClick={handleSubmit}
        >
          Salvar
        </LoadingButton>
      </div>
    </>
  );
};

UpdateUserPage.getLayout = function getLayout(page: any) {
  return <Dashboard>{page}</Dashboard>;
};

export default UpdateUserPage;

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
