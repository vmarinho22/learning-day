import type { NextPage } from "next";

export type NextDashboardPage = NextPage & { getLayout: any; }

export interface NextPagePropsType<T> {
  data: T;
}

export type UsersType = {
  id: string;
  name: string;
  mail: string;
}

export type UserType = {
  id: string;
  name: string;
  mail: string;
}