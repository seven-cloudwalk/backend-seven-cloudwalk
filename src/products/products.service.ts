import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle.error.utils';
import { CreateProductDto } from './dto/create-product.dto';
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

  async delete(id: string) {
    await this.verifyingTheProducts(id);

    return this.prisma.product.delete({ where: { id: id } });
  }
}
