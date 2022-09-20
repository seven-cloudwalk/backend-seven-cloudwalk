import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [UsersModule, AuthModule, ProductsModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
