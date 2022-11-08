import { Prisma, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const users: Prisma.UsersCreateInput[] = [
  {
    nickname: 'Jaymeson Mendes',
    email: 'jaymesonmendes@gmail.com',
    password: 'Abc1234*',
    accountType: 'PF',
    roleAdmin: true,
    verificationCode: '3',
  },
  {
    nickname: 'Keven Ferreira',
    email: 'jaymesonmendes@gmail.com',
    password: 'Abc1234*',
    accountType: 'PF',
    roleAdmin: true,
    verificationCode: '3',
  },
  {
    nickname: 'Elieldo Martins',
    email: 'jaymesonmendes@gmail.com',
    password: 'Abc1234*',
    accountType: 'PF',
    roleAdmin: true,
    verificationCode: '3',
  },
  {
    nickname: 'Karen Lourenço',
    email: 'karenmascarenhaslourenco@gmail.com',
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
