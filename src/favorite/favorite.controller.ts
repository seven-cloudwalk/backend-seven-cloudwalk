import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteProductDto } from './dto/favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('favorite')
  @ApiOperation({
    summary: 'Favoritar um produto.',
  })
  favoriteProduct(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.favoriteService.favoriteProduct(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Desfavoritar um produto.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  unfavoriteProduct(@Param('id') id: string) {
    return this.favoriteService.unfavoriteProduct(id);
  }

  @Get('user/:id')
  @ApiOperation({
    summary: 'Encontrar um favorito por usuário.',
  })
  getUserFavorites(@Param('id') id: string): Promise<Favorite[]> {
    return this.favoriteService.getUserFavorites(id);
  }

  @Get('product/:id')
  @ApiOperation({
    summary: 'Encontrar produtos favoritados.',
  })
  getProductFavorites(@Param('id') id: string): Promise<Favorite[]> {
    return this.favoriteService.getProductWhoFavorites(id);
  }
}
