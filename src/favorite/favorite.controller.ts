import { Body, Controller, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteProductDto } from './dto/favorite.dto';
import { Favorite } from './entities/favorite.entity';
import { ApiOperation } from '@nestjs/swagger';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('favorite')
  @ApiOperation({
    summary: 'Favoritar um produto',
  })
  favoriteProduct(@Body() dto: FavoriteProductDto): Promise<Favorite> {
    return this.favoriteService.favoriteProduct(dto);
  }
}
