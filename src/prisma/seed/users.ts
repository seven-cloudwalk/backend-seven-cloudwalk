import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UsersCreateInput[] = [
  {
    nickname: 'nome tres',
    email: 'nome3@gmail.com',
    password: 'Abc1234*',
    accountType: 'PF',
    roleAdmin: true,
    verificationCode: '3',
  },
];

export const user = async (prisma: PrismaClient) => {
  for (const obj of Object.values(users)) {
    await prisma.users.upsert({
      where: { email: obj.email },
      update: {},
      create: {
        ...obj,
        password: await bcrypt.hash(obj.password, 10),
      },
    });
  }
};
