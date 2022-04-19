import prisma from '@database';
export const resolvers = {
  Query: {
    users: async () => {
      const [result] = await prisma.$transaction([prisma.users.findMany()]);

      await prisma.$disconnect();

      return result;
    },
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
    }
  },
};
