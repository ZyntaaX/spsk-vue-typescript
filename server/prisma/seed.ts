import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.postCategory.upsert({
    where: { name: 'news' },
    update: {},
    create: {
      name: 'news',
    },
  });

  await prisma.userRole.upsert({
    where: { title: 'developer' },
    update: {},
    create: {
      title: 'developer',
      claims: { create: [{ key: 'all' }] },
    },
  });
  await prisma.userRole.upsert({
    where: { title: 'admin' },
    update: {},
    create: {
      title: 'admin',
      claims: {
        create: [
          { key: 'user_w' },
          { key: 'user_r' },
          { key: 'news_w' },
          { key: 'news_r' },
          { key: 'posts_w' },
          { key: 'posts_r' },
          { key: 'image_r' },
          { key: 'image_w' },
        ],
      },
    },
  });
  await prisma.userRole.upsert({
    where: { title: 'member' },
    update: {},
    create: {
      title: 'member',
    },
  });
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
