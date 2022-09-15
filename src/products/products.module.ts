import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
