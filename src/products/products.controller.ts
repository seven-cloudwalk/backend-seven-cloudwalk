import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriceUpdateProductDto } from './dto/priceupdate-product.dto';
import { Users } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';


@ApiTags('products')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @ApiOperation({
    summary: 'Criar um produto',
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Mostrar todos os produtos',
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({
    summary: 'Mostrar um produto por ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Atualizar um produto',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Atualiza preços dos produtos',
  })
  @Patch()
  priceUpdate(@LoggedUser() user: Users, @Body() priceUpdateProductDto: PriceUpdateProductDto[]) {
    return this.productsService.priceUpdate(user.id, priceUpdateProductDto);
  }  

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um produto',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
