import prisma from "../service/database";
export const resolvers = {
  Query: {
    users: async () => {
      const [result] = await prisma.$transaction([prisma.users.findMany()]);

      await prisma.$disconnect();

      return result;
    },
  },
};
