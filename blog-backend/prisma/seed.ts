import { PrismaClient } from '@prisma/client';
import { userSeed } from './seed/user';

const prisma = new PrismaClient();
async function main() {
  var _res;

  // _res = await prisma.user.createMany({ data: userSeed });
  // console.log(' === seed user ', _res);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
