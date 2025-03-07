import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

const createUsers = async () => {
  const defaultEmail = 'john@doe.com';
  const defaultUser = await prisma.user.upsert({
    where: {
      email: defaultEmail,
    },
    create: {
      name: 'John Doe',
      email: defaultEmail,
      password: await hash('12345678', 10),
    },
    update: {},
  });

  Logger.log(`DEFAULT USER: ${JSON.stringify(defaultUser, null, 2)}`);
};

const bootstrap = async () => {
  await createUsers();
};

bootstrap()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    Logger.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
