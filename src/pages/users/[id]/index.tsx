import { TableCell, TablePagination } from "@mui/material";
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaEnvelope, FaKey, FaPen, FaPlus, FaTrashAlt, FaUnlockAlt } from "react-icons/fa";
import Dashboard from "../../../components/Dashboard";

const UserProfile = ({ id, user }: any) => {
  const permissions: string[] = [
    "Super Administrador",
    "Administrador",
    "Usuário",
  ];

  const cols: string[] = ['ID', 'Título', 'Realizado', 'Validade', 'Ações'];

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [trainingsToRender, setTrainingsToRender] = useState<any[]>(user.historic.slice(0, rowsPerPage));

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setTrainingsToRender(user.historic.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
  };

  useEffect(() => {
    setTrainingsToRender(user.historic.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log(user)

  const handleConvertData = (data: any) => (new Date(Number(data)));

  const handleShowExpirationDate = (data: any ,validity: number) => {
    const date = new Date(handleConvertData(data));
    date.setDate(date.getDate() + validity);
    return date.toLocaleString();
  }

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
      <div className="flex flex-column items-center">
        <h3 className="text-2xl font-medium mr-5">Treinamentos realizados</h3>
        <Link href={`/users/${id}/training/add`} passHref>
          <Button size="small" className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold" startIcon={<FaPlus />}>
            Adicionar
          </Button>
        </Link>
      </div>
      <br />
      {trainingsToRender.length === 0 && (
          <p>Nenhum treinamento realizado :/</p>
      )}

      {trainingsToRender.length >= 0 && (
        <>
          <TableContainer sx={{height: "48vh", maxWidth: "100%"}}>
            <Table stickyHeader aria-label="sticky label">
            <TableHead>
                  <TableRow>                  
                    {cols.map((col: string,index: number) => (
                      <TableCell key={index}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trainingsToRender.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>{(index + 1) + (page * rowsPerPage)}</TableCell>
                      <TableCell>{item.training.name}</TableCell>
                      <TableCell>{(handleConvertData(item.createdAt)).toLocaleString()}</TableCell>
                      <TableCell>{handleShowExpirationDate(item.createdAt, item.training.validity)}</TableCell>
                      <TableCell>
                          <div className="flex">
                            {user.name !== 'system' && (
                              <Link href={`/users/${id}/training/remove`} passHref>
                                <FaTrashAlt className="cursor-pointer mr-2" />
                            </Link>
                            )}
                          </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={user.historic.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      <div className="fixed bottom-4 right-4">
        <Link href={`/users/update/${id}`} passHref>
          <Fab className="bg-pr-purple hover:bg-pr-ocean duration-500 origin-left text-white font-bold" aria-label="add">
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
                  historic {
                    id
                    createdAt
                    training {
                      id
                      name
                      validity
                    }
                  }
              }
            }`,
      variables: {
        id,
      },
    });

    return {
      props: {
        id,
        user: user.data?.data?.user || {},
        token
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
