import prisma from '@database';
import bcrypt from 'bcrypt';

export const resolvers = {
  Query: {
    user: async (_ : any, { id }: any) => {
      const [result] = await prisma.$transaction([
        prisma.users.findUnique({
          where: {
            id
          }
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    users: async (_ : any) => {
      const [result] = await prisma.$transaction([prisma.users.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      })]);

      await prisma.$disconnect();

      return result;
    },
    training: async (_ : any, { id }: any) => {
      const [result] = await prisma.$transaction([
        prisma.trainings.findUnique({
          where: {
            id
          },
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    trainings: async (_ : any) => {
      const [result] = await prisma.$transaction([prisma.trainings.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      })]);

      await prisma.$disconnect();

      return result;
    },
    historic: async (_ : any, { id }: any) => {
      const [result] = await prisma.$transaction([
        prisma.historic.findUnique({
          where: {
            id
          }
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    historics: async (_ : any) => {
      const [result] = await prisma.$transaction([prisma.historic.findMany({
        orderBy: {
          createdAt: 'asc',
        },
      })]);

      await prisma.$disconnect();

      return result;
    },
    logs: async (_ : any) => {
      const [result] = await prisma.$transaction([prisma.logs.findMany()]);

      await prisma.$disconnect();

      return result;
    },
  },
  Mutation: {
    createUser: async (_ : any, { data }: any) => {
      const password = data.password;

      data.password = await bcrypt.hash(password, 12);

      const [result] = await prisma.$transaction([
        prisma.users.create({
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    updateUser: async (_ : any, { id, data }: any) => {
      const [result] = await prisma.$transaction([
        prisma.users.update({
          where: {
            id
          },
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    deleteUser: async (_ : any, { id }: any) => {
      const [result] = await prisma.$transaction([
        prisma.users.delete({
          where: {
            id
          }
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    createTraining: async (_ : any, { data }: any) => {
      const [result] = await prisma.$transaction([
        prisma.trainings.create({
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    updateTraining: async (_ : any, { id, data }: any) => {
      const [result] = await prisma.$transaction([
        prisma.trainings.update({
          where: {
            id
          },
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    deleteTraining: async (_ : any, { id }: any) => {
      const [result] = await prisma.$transaction([
        prisma.trainings.delete({
          where: {
            id
          }
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    createHistoric: async (_ : any, { data }: any) => {
      const [result] = await prisma.$transaction([
        prisma.historic.create({
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    updateHistoric: async (_ : any, { id, data }: any) => {
      const [result] = await prisma.$transaction([
        prisma.historic.update({
          where: {
            id
          },
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    deleteHistoric: async (_ : any, { id }: any) => {
      const [result] = await prisma.$transaction([
        prisma.historic.delete({
          where: {
            id
          }
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
    createLog: async (_ : any, { data }: any) => {
      const [result] = await prisma.$transaction([
        prisma.logs.create({
          data
        })
      ]);

      await prisma.$disconnect();

      return result;
    },
  }
};
