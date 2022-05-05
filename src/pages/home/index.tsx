import { TableCell, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import api from "@services/api";
import cookies from "@services/cookies";
import Head from "next/head";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Dashboard from "../../components/Dashboard";
import type { NextDashboardPage } from "../../types/defaultTypes";

const HomePage: NextDashboardPage = ({ losers }: any) => {
  const cols: string[] = ["ID", "Usuário", "Treinamento", "Vencimento", "Perfil"];

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [losersToRender, setLosersToRender] = useState<any[]>(
    losers.slice(0, rowsPerPage)
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    setLosersToRender(
      losers.slice(newPage * rowsPerPage, (newPage + 1) * rowsPerPage)
    );
  };

  useEffect(() => {
    setLosersToRender(
      losers.slice(page * rowsPerPage, (page + 1) * rowsPerPage)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsPerPage]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Head>
        <title>Ínicio - Learning Day</title>
      </Head>
      <h1 className="text-4xl">Ínicio</h1>
      <br />
      <p className="font-medium">Veja aqui os treinamentos a expirar esse mês!</p>
      <br />
      {losers.length === 0 && <p className="font-bold">Não há treinamentos a expirar esse mês!</p>}
      {losers.length > 0 && (
        <div className="w-2/3">
          <TableContainer sx={{ height: "50vh", maxWidth: "100%" }}>
            <Table stickyHeader aria-label="sticky label">
              <TableHead>
                <TableRow>
                  {cols.map((col: string, index: number) => (
                    <TableCell key={index}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {losers.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                    <TableCell>{item.user}</TableCell>
                    <TableCell>{item.training}</TableCell>
                    <TableCell>{item.expiration}</TableCell>
                    <TableCell>
                      <Link href={`/users/${item.id}`} passHref>
                        <FaUser className="cursor-pointer mr-2" /> 
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={losers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}
    </>
  );
};

HomePage.getLayout = function getLayout(page: any) {
  return <Dashboard>{page}</Dashboard>;
};

export default HomePage;

export const getServerSideProps = async (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie("server", "token", ctx);

  const firstDayMonth = new Date();
  firstDayMonth.setDate(1);

  const lastDayMonth = new Date(
    firstDayMonth.getFullYear(),
    firstDayMonth.getMonth() + 1,
    0
  );

  try {
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    api.defaults.headers.common["Content-Type"] = "application/graphql";

    const fetchedHistorics = await api.post("/graphql", {
      query: `query {
        historics {
            user {
              id
              name
            }
            training {
              name
              validity
            }
            updatedAt
        }
      }`,
    });

    const historics = fetchedHistorics?.data?.data?.historics;

    const losers = historics.map((historic: any) => {
      const expirationDate = handleShowExpirationDate(
        historic.updatedAt,
        historic.training.validity
      );

      if (expirationDate >= firstDayMonth && expirationDate <= lastDayMonth) {
        return {
          id: historic.user?.id,
          user: historic?.user?.name,
          training: historic?.training?.name,
          expiration: expirationDate.toLocaleString(),
        };
      }
    });
    return {
      props: {
        losers: losers || [],
      },
    };
  } catch (error: any) {
    console.error(error);
    return {
      props: {
        losers: [],
      },
    };
  }
};

const handleConvertData = (data: any) => new Date(Number(data));

const handleShowExpirationDate = (data: any, validity: number) => {
  const date = new Date(handleConvertData(data));
  date.setDate(date.getDate() + validity);
  return date;
};
