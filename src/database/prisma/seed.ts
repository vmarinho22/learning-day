import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.users.create({
    data: {
      name: "system",
      mail: "system",
      password: "$2a$12$I4vdKgZ8Ec/7PayjReZzguGmU9fCNbwM7THNP4J0zQH.eHKPPr9L6",
      permission: 0
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
