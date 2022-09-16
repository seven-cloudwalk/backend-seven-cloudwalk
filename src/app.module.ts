import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [AuthModule, UsersModule, OrdersModule, ProductsModule],
  controllers: [AppController ],
  providers: [AppService],
})
export class AppModule {}
