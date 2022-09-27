import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle.error.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { PriceUpdateProductDto } from './dto/priceupdate-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      return handleErrorConstraintUnique(error);
    }
  }

  async verifyingTheProducts(id: string): Promise<Product> {
    const products: Product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!products) {
      throw new NotFoundException(`ID '${id}' não encontrado`);
    }
    return products;
  }

  findOne(id: string): Promise<Product> {
    return this.verifyingTheProducts(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | void> {
    await this.verifyingTheProducts(id);
    return this.prisma.product
      .update({
        where: { id },
        data: updateProductDto,
      })
      .catch(handleErrorConstraintUnique);
  }

  async priceUpdate(userId: string, dto: PriceUpdateProductDto[]) {
    let Id = userId;
    let date = new Date();
    let productsToDownload = [];
    let updates = [];

    // localiza pelo ID desconto informado pelo usuário para o produto
    function findDiscount(id: string) {
      return dto.find((prod) => prod.id === id);
    }

    // le produtos e armazena
    let productsOrigin = await this.prisma.product.findMany({
      where: {
        id: {
          in: dto.map((prod) => prod.id),
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    // armazena as operações de alteração de preco em um array
    productsOrigin.map((p) => {
      // calcula desconto
      let discount = findDiscount(p.id).discount;
      let newPrice = p.price - (p.price * discount) / 100;

      // armazena dados dos produtos
      productsToDownload.push({ id: p.id, price: p.price, newPrice: newPrice });

      // armazena as operações
      updates.push(
        this.prisma.product.update({
          where: { id: p.id },
          data: { price: newPrice },
        }),
      );
    });

    // tenta efetuar as atualizações armazenadas
    try {
      await this.prisma.$transaction(updates);

      return { user: Id, date: date, products: productsToDownload };
    } catch (error) {
      console.log('error:', error);

      return handleErrorConstraintUnique(error);
    }
  }

  async delete(id: string) {
    await this.verifyingTheProducts(id);

    return this.prisma.product.delete({ where: { id: id } });
  }
}
