import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from 'src/users/entities/user.entity';
import { PrismaService } from './../prisma/prisma.service';
import { FavoriteProductDto } from './dto/favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { Product } from './../products/entities/product.entity';
import { handleErrorConstraintUnique } from 'src/utils/handle.error.utils';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async favoriteProduct(dto: FavoriteProductDto): Promise<Favorite> {
    await this.verifyUserId(dto.iduser);

    const product: Product = await this.prisma.product.findUnique({
      where: { name: dto.idproduct },
    });

    if (!product) {
      throw new NotFoundException(
        `Produto de nome '${dto.idproduct}' não encontrado`,
      );
    }
    return this.prisma.favorite
      .create({ data: dto })
      .catch(handleErrorConstraintUnique);
  }

  async unfavoriteProduct(id: string) {
    const favorite: Favorite = await this.prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      throw new NotFoundException(`Produto de nome '${id}' não encontrado`);
    }

    return this.prisma.favorite.delete({ where: { id } });
  }

  async getUserFavorites(id: string): Promise<Favorite[]> {
    await this.verifyUserId(id);

    return this.prisma.favorite.findMany({ where: { iduser: id } });
  }

  async getProductWhoFavorites(id: string): Promise<Favorite[]> {
    const product: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }

    return this.prisma.favorite.findMany({ where: { idproduct: id } });
  }

  async verifyUserId(id: string): Promise<void> {
    const user: Users = await this.prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Entrada de id '${id}' não encontrada`);
    }
  }
}
