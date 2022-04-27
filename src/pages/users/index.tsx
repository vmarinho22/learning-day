import { TableCell, TablePagination } from '@mui/material';
import Fab from '@mui/material/Fab';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import api from '@services/api';
import cookies from '@services/cookies';
import Head from "next/head";
import Link from 'next/link';
import { useState } from 'react';
import { FaBan, FaPen, FaPlus } from "react-icons/fa";
import Dashboard from "../../components/Dashboard";
import type { NextPagePropsType, UsersType } from '../../types/defaultTypes';

const UsersPage = ({ data }: NextPagePropsType<UsersType[]>) => {

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const cols: string[] = ['ID', 'Nome', 'E-mail', 'Status','Ações'];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <>
      <Head>
        <title>Usuários - Learning Day</title>
      </Head>
        <h1 className="text-4xl">Usuários</h1>
        <p className="mt-5">Aqui você irá gerenciar todas as ações dos usuários!</p>
        <div className="w-full mt-5" style={{height: '50vh'}}>
          <TableContainer sx={{ maxHeight: "50vh", maxWidth: "100%"}}>
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
                {data?.map((user: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.mail}</TableCell>
                    <TableCell>{user.blocked ? 'Bloqueado' : 'Ativo'}</TableCell>
                    <TableCell>
                      <div className="flex">
                        <Link href={`/users/update/${user.id}`} passHref>
                          <FaPen className="cursor-pointer mr-2" /> 
                        </Link>
                        <Link href={`/users/block/${user.id}`} passHref>
                          <FaBan className="cursor-pointer mr-2" />
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        <div className="fixed bottom-4 right-4">
            <Link href="/users/create" passHref>
              <Fab className="bg-gradient-to-r from-pr-purple to-pr-ocean hover:from-pr-ocean hover:to-pr-purple duration-500 origin-left text-white" aria-label="add">
                <FaPlus className="text-white" />
              </Fab>
            </Link>
        </div>
    </>
  );
};

UsersPage.getLayout = function getLayout(page: any) {
  return (
      <Dashboard>{page}</Dashboard>
  )
}

export default UsersPage;

export const getServerSideProps = async (ctx: any) => {
  const { getCookie } = cookies();

  const token = getCookie('server','token', ctx);

  try {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    api.defaults.headers.common['Content-Type'] = 'application/graphql';
  
    const response = await api.post('/graphql', {
      query: `query getUsers{
        users {
          id
          name
          mail
          blocked
        }
      }`
    });

    const data = response.data?.data?.users?.map((user: any, index: any) => {
      return {
        id: user.id,
        name: user.name,
        mail: user.mail,
        blocked: user.blocked
      }
    });

    return {
      props: {
        data: data || []
      },
    };
  } catch (err) {
    console.error('Erro ao realizar requisição', err);
    return {
      props: {
        data: []
      },
    };
  }
}
