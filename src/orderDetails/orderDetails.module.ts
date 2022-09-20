import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module'
import { OrderDetailsController } from './orderDetails.controller';
import { OrderDetailsService } from './orderDetails.service';

@Module({
  imports: [PrismaModule], 
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService]
})
export class OrderDetailsModule {}
