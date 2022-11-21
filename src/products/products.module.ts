import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
