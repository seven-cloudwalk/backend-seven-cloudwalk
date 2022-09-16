import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsBoolean, IsObject, IsArray } from 'class-validator';
import { OrderDetails } from '@prisma/client';

export class CreateOrderDto {
    @IsString()
    @ApiProperty({
      description: 'id do usuário do pedido',
      example: 'xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxx'
    })
    userId: string;

    @IsArray()
    @Type(() => Object)    
    @ApiProperty({
      description: 'detalhes do pedido',
      example: '[{ "productId":"xxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxx", "quantity": 4 }]'
    })
    details:  OrderDetails[];
}

