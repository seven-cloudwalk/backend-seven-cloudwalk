import { ConsoleLogger, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle.error.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { LoadExcelData } from 'src/utils/products-excel.utils';
import { PriceUpdateProductDto } from './dto/priceupdate-product.dto';

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

  async priceUpdate(userId: string, dto: PriceUpdateProductDto[] ) {
    let Id = userId;
    let date = new Date();
    let response = [];
    let updates = [];
    let excelProducts = dto;

    // localiza desconto para o produto
    function findExcelProduct(id: string) {
      return excelProducts.find((prod) => prod['Codigo'] == id);
    }

    // localiza desconto para o prodto armazenado em DTO
    /*
    function hasProduct(row :PriceUpdateProductDto) {
      return (row['Codigo'] && row['Percentual']);
    }
    */

    // carrega arquivo excel de produtos e descontos
    //let buffer = ( await LoadExcelData() ) as PriceUpdateProductDto[];
   
    // le produtos da base de dados e armazena em array
    let productsOrigin = await this.prisma.product.findMany({
      where: {
        id: {
          in: excelProducts.map((prod) => prod['Codigo']),
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    //console.log( 'excelProducts:', productsOrigin.length);

    // armazena as operações de alteração de preco em um array
    productsOrigin.map((p) => {
      // calcula desconto
      let excelProduct = findExcelProduct(p.id);
      let newPrice = p.price - (p.price * excelProduct['Percentual']) / 100;
      if ( excelProduct['Acrescimo'] ) {
        newPrice = p.price + (p.price * excelProduct['Percentual']) / 100;
      }

      // armazena as operações
      updates.push(
        this.prisma.product.update({
          where: { id: p.id },
          data: { price: newPrice },
        }),
      );

      // armazena dados dos produtos para a resposta
      response.push({ id: p.id, price: p.price, newPrice: newPrice });
    });

    // tenta efetuar as operações armazenadas
    try {
      await this.prisma.$transaction(updates);

      return { user: Id, date: date, products: response };
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
