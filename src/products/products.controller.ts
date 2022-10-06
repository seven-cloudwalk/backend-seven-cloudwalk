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
  UnauthorizedException,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriceUpdateProductDto } from './dto/priceupdate-product.dto';
import { Users } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { isAdmin } from 'src/utils/users.utils';

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
  create(@LoggedUser() user: Users, @Body() createProductDto: CreateProductDto) {
    if( !user.roleAdmin ) {
      throw new UnauthorizedException(`Usuário ${user.nickname} não esta cadastrado como administrador`)
    }
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
  update(@LoggedUser() user: Users, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    if( !user.roleAdmin ) {
      throw new UnauthorizedException(`Usuário ${user.nickname} não esta cadastrado como administrador`)
    }
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({
    summary: 'Atualiza preços dos produtos',
  })
  @Patch()
  priceUpdate(
    @LoggedUser() user: Users,
    @Body() priceUpdateProductDto: PriceUpdateProductDto[],
  ) {
    if( !user.roleAdmin ) {
      throw new UnauthorizedException(`Usuário ${user.nickname} não esta cadastrado como administrador`)
    }
    return this.productsService.priceUpdate(user.id, priceUpdateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um produto',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @LoggedUser() user: Users,
    @Param('id') id: string) {
    if( !user.roleAdmin ) {
      throw new UnauthorizedException(`Usuário ${user.nickname} não esta cadastrado como administrador`)
    }
    return this.productsService.delete(id);
  }
}