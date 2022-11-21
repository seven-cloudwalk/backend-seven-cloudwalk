import { Prisma, PrismaClient } from '@prisma/client';

export const product: Prisma.ProductCreateInput[] = [
  {
    name: 'Capixingui',
    category: '1',
    description: 'Semente de pastagem de Capixingui',
    price: 29.0,
    image:
      'https://i.postimg.cc/J0vV38w0/sementes-de-capixingui-croton-floribundus-741-4-20190731104521-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Paineira',
    category: '2',
    description: 'Semente de pastagem de Paineira',
    price: 19.0,
    image:
      'https://i.postimg.cc/bNnN6CmW/PAINEIRA-Chorisia-speciosa-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Terminália',
    category: '3',
    description: 'Semente de pastagem de Terminália',
    price: 25.9,
    image:
      'https://i.postimg.cc/MTjKh9Wn/517-E80-ZG58-L-SX425-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Árvore da chuva',
    category: '1',
    description: 'Semente de pastagem de Árvore da chuva',
    price: 32.8,
    image:
      'https://i.postimg.cc/nL9JzMN5/1200px-Garapeira29fev2020a-02-removebg-preview.png',
    stock: false,
  },
  {
    name: 'Plátano',
    category: '2',
    description: 'Semente de pastagem de Plátano',
    price: 21.7,
    image:
      'https://i.postimg.cc/KYM6bwMh/33b0713bcad3ac9049b9ab88cbdbd44c-removebg-preview-1.png',
    stock: true,
  },
  {
    name: 'Mogno brasileiro',
    category: '3',
    description: 'Semente de pastagem de Mogno Brasileiro',
    price: 22.9,
    image:
      'https://i.postimg.cc/gjN54Pf8/MOGNO-Sw-ietenia-macrophylla-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Teca',
    category: '1',
    description: 'Semente de pastagem de Teca',
    price: 12.9,
    image:
      'https://i.postimg.cc/wTjnM7mV/rvore-da-teca-isolada-39734195-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Eucalipto',
    category: '2',
    description: 'Semente de pastagem de Terminália',
    price: 22.9,
    image:
      'https://i.postimg.cc/MTjKh9Wn/517-E80-ZG58-L-SX425-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Sindora',
    category: '3',
    description: 'Semente de pastagem de Terminália',
    price: 22.9,
    image:
      'https://i.postimg.cc/pL97Q4k5/32e736cb81ae5fa71ee0d8306346966e-removebg-preview.png',
    stock: false,
  },
  {
    name: 'Cedro',
    category: '1',
    description: 'Semente de pastagem de Cedro',
    price: 32.9,
    image:
      'https://i.postimg.cc/ydBVWccd/png-transparent-graphy-cedar-tree-photography-branch-business-thumbnail-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Pau Fava',
    category: '2',
    description: 'Semente de pastagem de Pau Fava',
    price: 79.2,
    image:
      'https://i.postimg.cc/3rtKJyR8/sementes-de-pau-fava-fedegoso-senna-macranthera-mundo-das-sementes-185-1-20220221221409-removebg-pre.png',
    stock: true,
  },
  {
    name: 'Palmeira-das-canárias',
    category: '3',
    description: 'Semente de pastagem de Palmeira-das-canárias',
    price: 22.9,
    image:
      'https://i.postimg.cc/hv66QR6r/png-clipart-palm-tree-asian-palmyra-palm-attalea-speciosa-date-palm-oil-palms-arecaceae-palm-tree-mo.png',
    stock: false,
  },
  {
    name: 'Tabebuia Rosea',
    category: '1',
    description: 'Semente de pastagem de Tabebuia Rosea',
    price: 12.9,
    image:
      'https://i.postimg.cc/hv66QR6r/png-clipart-palm-tree-asian-palmyra-palm-attalea-speciosa-date-palm-oil-palms-arecaceae-palm-tree-mo.png',
    stock: true,
  },
  {
    name: 'Cariniana',
    category: '2',
    description: 'Semente de pastagem de Cariniana',
    price: 21.9,
    image:
      'https://i.postimg.cc/SQ6gW884/JEQUITIB-ROSA-Cariniana-legalis-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Palmeira-das-canárias',
    category: '3',
    description: 'Semente de pastagem de Palmeira-das-canárias',
    price: 22.9,
    image:
      'https://i.postimg.cc/hv66QR6r/png-clipart-palm-tree-asian-palmyra-palm-attalea-speciosa-date-palm-oil-palms-arecaceae-palm-tree-mo.png',
    stock: true,
  },
  {
    name: 'Coqueiro',
    category: '1',
    description: 'Semente de pastagem de Coqueiro',
    price: 22.9,
    image:
      'https://i.postimg.cc/rp41qXNT/689-6891431-coqueiro-png-transparent-png-removebg-preview.png',
    stock: false,
  },
  {
    name: 'Aroeira-vermelha',
    category: '2',
    description: 'Semente de pastagem de Aroeira-vermelha',
    price: 22.9,
    image:
      'https://i.postimg.cc/C1Vj1Pcq/7e5e4ff002eb58ed2307159045a2e592-removebg-preview.png',
    stock: true,
  },
  {
    name: 'Mangifera indica',
    category: '3',
    description: 'Semente de pastagem de Mangifera indica',
    price: 12.9,
    image:
      'https://i.postimg.cc/vZVhZVGC/kisspng-mangifera-indica-tree-plant-mango-subtropics-mango-tree-5ac111d1858ee5-554176931522602449547.png',
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
