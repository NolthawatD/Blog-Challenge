import { PrismaClient } from '@prisma/client';
import { AccountData } from './seed/account';
import { CommunityData } from './seed/community';
import { PostData } from './seed/post';
const prisma = new PrismaClient();
async function main() {
	console.log("Seed data initialize:");
  var seed : unknown;
  seed = await prisma.account.createMany({ data: AccountData });
  console.log(':account: ', seed);

	seed = await prisma.community.createMany({ data: CommunityData });
  console.log(':community: ', seed);

	seed = await prisma.post.createMany({ data: PostData });
  console.log(':post: ', seed);

	// seed = await prisma.comment.createMany({ data:  });
  // console.log(':comment: ', seed);
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
