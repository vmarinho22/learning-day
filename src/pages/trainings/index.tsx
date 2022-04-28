import { TableCell, TablePagination } from "@mui/material";
import Fab from "@mui/material/Fab";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrashAlt } from "react-icons/fa";
import Dashboard from "../../components/Dashboard";
import type { NextDashboardPage } from "../../types/defaultTypes";

const TrainingsPage: NextDashboardPage = ({ trainings }: any) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [trainingsToRender, setTrainingsToRender] = useState<any[]>(trainings.slice(0, rowsPerPage));
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setTrainingsToRender(trainings.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage));
  };

  useEffect(() => {
    setTrainingsToRender(trainings.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleConvertData = (data: any) => (new Date(Number(data))).toLocaleString();

  const cols: string[] = [
    "ID",
    "Título",
    "Validade",
    "Adição",
    "Ações",
  ];

  return (
    <>
      <Head>
        <title>Treinamentos - Learning Day</title>
      </Head>
      <h1 className="text-4xl">Treinamentos</h1>
      <p className="mt-5">
        Aqui você irá gerenciar todas as ações dos treinamentos.
      </p>
      <br />
      {trainings.length > 0 && (
        <div className="w-full mt-5">
          <TableContainer sx={{ minHeight: "70vh", maxWidth: "100%" }}>
            <Table stickyHeader aria-label="sticky label">
              <TableHead>
                <TableRow>
                  {cols.map((col: string, index: number) => (
                    <TableCell key={index}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {trainingsToRender?.map((training: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{(index + 1) + (page * rowsPerPage)}</TableCell>
                    <TableCell>{training.name}</TableCell>
                    <TableCell>{training.validity} dia(s)</TableCell>
                    <TableCell>{handleConvertData(training.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <Link href={`/trainings/update/${trainings.id}`} passHref>
                          <FaPen className="cursor-pointer mr-2" />
                        </Link>

                        <Link href={`/trainings/delete/${trainings.id}`} passHref>
                          <FaTrashAlt className="cursor-pointer mr-2" />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={trainings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
      {trainings.length === 0 && (
        <p className="text-xl">Nenhum treinamento cadastrado :/</p>
      )}
      <div className="fixed bottom-4 right-4">
        <Link href="/trainings/create" passHref>
          <Fab
            className="bg-gradient-to-r from-pr-purple to-pr-ocean hover:from-pr-ocean hover:to-pr-purple duration-500 origin-left text-white"
            aria-label="add"
          >
            <FaPlus className="text-white" />
          </Fab>
        </Link>
      </div>
    </>
  );
};

TrainingsPage.getLayout = function getLayout(page: any) {
  return <Dashboard>{page}</Dashboard>;
};

export default TrainingsPage;

export const getServerSideProps = async (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie("server", "token", ctx);

  try {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    api.defaults.headers.common["Content-Type"] = "application/graphql";

    const response = await api.post("/graphql", {
      query: `query getTrainings{
        trainings {
          id
          name
          validity
          createdAt
        }
      }`,
    });

    return {
      props: {
        trainings: response.data?.data?.trainings || [],
      },
    };
  } catch (err) {
    console.error("Erro ao realizar requisição", err);
    return {
      props: {
        trainings: [],
      },
    };
  }
};
