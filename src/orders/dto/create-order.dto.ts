import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsObject, IsArray } from 'class-validator';
import { OrderDetails } from '@prisma/client';

export class CreateOrderDto {
    @IsArray()
    @Type(() => Object)    
    @ApiProperty({
      description: 'detalhes do pedido',
      example: '[{ "productId":"xxxxxxxxx-xxxxxxxxx-0", "quantity": 4 }]'
    })
    details:  OrderDetails[];
}

