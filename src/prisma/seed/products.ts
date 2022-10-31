import { Prisma, PrismaClient } from '@prisma/client';

export const product: Prisma.ProductCreateInput[] = [
  {
    name: 'Pinheiro',
    category: '1',
    description: 'Semente de pastagem de Pinheiro',
    price: 29.0,
    image: 'https://i.postimg.cc/GtZRTKq0/32e736cb81ae5fa71ee0d8306346966e-removebg-preview.png',
    stock: true,
  },
];

export const products = async (prisma: PrismaClient) => {
  for (const obj of Object.values(product)) {
    await prisma.product.upsert({
      where: { name: obj.name },
      update: {},
      create: {
        ...obj,
      },
    });
  }
};
