import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try{
    const user = await prisma.users.create({
      data: {
        name: "system",
        mail: "system",
        password: "$2a$10$1LJecV8LJGLdK/kMJUiLge7dnrA4YheTQO2TVFzsBWCf1v21yKvr.",
        permission: 0
      },
    });
  } catch (err) {}
 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
