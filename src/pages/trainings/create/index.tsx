import Dashboard from "@components/Dashboard";
import LoadingButton from "@mui/lab/LoadingButton";
import { TextField } from "@mui/material";
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import type { NextDashboardPage } from "../../../types/defaultTypes";

const CreateTrainingPage: NextDashboardPage = ({ token }: any) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [validity, setValidity] = useState<number>(15);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const MySwal = withReactContent(Swal);

  const handleCheckError = (event: any) =>
    event.target.value === "" ? setError(event.target.id) : setError("");

  const handleCheckValidityError = (event: any) =>
    Number(event.target.value) <= 0 ? setError(event.target.id) : setError("");

  const handleSetTitle = (event: any) => setTitle(event.target.value);

  const handleSetDescription = (event: any) =>
    setDescription(event.target.value);

  const handleSetValidity = (event: any) => setValidity(Number(event.target.value));

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let error: boolean = false;
    let errorMsg: string = "";

    setLoading(true);

    if (title === "") {
      error = true;
      errorMsg += "Título não pode ser vazio! <br>";
    } else if (Number(validity) <= 0) {
      error = true;
      errorMsg += "O valor mínimo da validade é de 1 dia! <br>";
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

      const response = await api.post("/graphql", {
        query: `mutation($data: createTrainingInput!) {
          createTraining(data: $data) {
            name
          }
        }`,
        variables: {
          data: {
            name: title,
            description: description,
            validity: validity,
          },
        },
      });

      if(response.data?.data?.createTraining?.name){
        MySwal.fire({
          icon: "success",
          title: "Sucesso!",
          html: "Treinamento cadastrado com sucesso!",
        }).then(() => {
          setLoading(false);
          router.push('/trainings');
        });
      }else{
        throw new Error('Erro ao cadastrar treinamento');
      }
    } catch (error) {
      console.error(error.message);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        html: "Aconteceu um erro inesperado ao servidor, tente novamente mais tarde!",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Cadastrar treinamento - Learning Day</title>
      </Head>
      <h1 className="text-4xl ">Cadastrar treinamento</h1>
      <p className="mt-5">
        Aqui você irá cadastrar um treinamento. Preencha todos os campos
        corretamente!
      </p>
      <br />
      <form>
        <div className="w-2/3">
          <TextField
            className="mb-4"
            type="text"
            id="title"
            value={title}
            label="Título"
            size="small"
            variant="standard"
            fullWidth
            onChange={handleSetTitle}
            onBlur={handleCheckError}
            error={error === "title"}
            helperText={
              error === "title" ? "Preencha o título corretamente!" : ""
            }
          />
          <TextField
            className="mb-4"
            type="number"
            id="validity"
            value={validity}
            label="Validade (em dias)"
            size="small"
            variant="standard"
            fullWidth
            onChange={handleSetValidity}
            inputProps={{ min: "1", step: "1" }}
            onBlur={handleCheckValidityError}
            error={error === "validity"}
            helperText={
              error === "validity"
                ? "O valor mínimo da validade é de 1 dia!"
                : ""
            }
          />
          <TextField
            className="mb-4"
            type="text"
            id="description"
            value={description}
            label="Descrição (opcional)"
            size="small"
            variant="standard"
            fullWidth
            multiline
            onChange={handleSetDescription}
          />
          <LoadingButton
            className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold"
            loading={loading}
            onClick={handleSubmit}
          >
            Cadastrar
          </LoadingButton>
        </div>
      </form>
    </>
  );
};

CreateTrainingPage.getLayout = function getLayout(page: any) {
  return <Dashboard>{page}</Dashboard>;
};

export default CreateTrainingPage;

export const getServerSideProps = (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie('server', 'token', ctx);

  return {
    props: {
      token,
    },
  };
};
