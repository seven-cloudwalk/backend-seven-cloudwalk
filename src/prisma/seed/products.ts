import { Prisma, PrismaClient } from '@prisma/client';

export const product: Prisma.ProductCreateInput[] = [
  {
    name: 'Pinheiro',
    category: '1',
    description: 'Semente de pastagem de Pinheiro',
    price: 29.0,
    image:
      'https://i.postimg.cc/GtZRTKq0/32e736cb81ae5fa71ee0d8306346966e-removebg-preview.png',
    stock: true,
  },
  //   {
  //     title: 'FIFA 22',
  //     imgUrl:
  //       'https://image.api.playstation.com/vulcan/img/rnd/202111/0822/zDXM9K2cQiq0vKTDwF0TkAor.png',
  //     description:
  //       'Powered by Football, EA SPORTS FIFA 22 deixa o jogo ainda mais real com avanços fundamentais de jogabilidade e uma nova temporada de inovações em todos os modos.',
  //     year: '27/10/2021',
  //     score: 5,
  //     traillerYtUrl: 'https://www.youtube.com/watch?v=SYsi5QuOJNE',
  //     GplayYtUrl: 'https://www.youtube.com/watch?v=vLj-27T-SEQ',
  //   },
  //   {
  //     title: 'Resident Evil Village',
  //     imgUrl:
  //       'https://cdn.cdkeys.com/500x706/media/catalog/product/r/e/resident_evil_village_pc_cover.jpg',
  //     description:
  //       'Chris Redfield, o lendário herói da série Resident Evil, se reaproxima do casal e atrapalha terrivelmente sua vida, levando Ethan ao caos. Ethan, devastado, encontra-se em uma remota vila coberta de neve, procurando respostas depois de ser jogado em um pesadelo totalmente novo.',
  //     year: '02/05/2021',
  //     score: 5,
  //     traillerYtUrl: 'https://www.youtube.com/watch?v=Qge5m24C5qs',
  //     GplayYtUrl: 'https://www.youtube.com/watch?v=arEdruKxrQ8',
  //   },
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
