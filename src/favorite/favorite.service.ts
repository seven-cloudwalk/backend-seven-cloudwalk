import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}
}

// async favoriteProduct(dto: FavoriteProductDto): Promise<Favorite> {
//     await this.verifyUserId(dto.iduser);

//     const product: Product = await this.prisma.product.findUnique({
//       where: { name: dto.idproduct },
//     });

//     if (!product) {
//       throw new NotFoundException(
//         `Produto de nome '${dto.idproduct}' não encontrado`,
//       );
//     }

//     const data: Prisma.FavoriteCreateInput = {
//       iduser: {
//         connect: {
//           id: dto.iduser,
//         },
//       },
//       idproduct: {
//         connect: {
//           name: dto.idproduct,
//         },
//       },
//     };

//     return this.prisma.favorite
//       .create({ data })
//       .catch(handleErrorConstraintUnique);
//   }

//   async unfavoriteProduct(id: string) {
//     const favorite: Favorite = await this.prisma.favorite.findUnique({
//       where: { id },
//     });

//     if (!favorite) {
//       throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
//     }

//     return this.prisma.favorite.delete({ where: { id } });
//   }

//   async getUserFavorites(id: string): Promise<Favorite[]> {
//     await this.verifyUserId(id);

//     return this.prisma.favorite.findMany({ where: { userId: id } });
//   }

//   async getUsersWhoFavoritedProduct(id: string) {
//     const product: Product = await this.prisma.product.findUnique({
//       where: { id },
//     });

//     if (!product) {
//       throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
//     }

//     return this.prisma.favorite.findMany({ where: { product: { id } } });
//   }

//   async verifyUserId(id: string): Promise<void | never> {
//     const user: User = await this.prisma.user.findUnique({
//       where: { id },
//     });

//     if (!user) {
//       throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
//     }
//   }
