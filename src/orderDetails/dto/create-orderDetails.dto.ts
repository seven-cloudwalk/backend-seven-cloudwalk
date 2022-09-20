import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateOrderDetailsDto {
    @IsString()
    @ApiProperty({
      description: 'id do detalhe do pedido',
      example: 'xxxxxxx-xxxxxx-xxxxxxxxx'
    })
    id: string;

    @IsString()
    @ApiProperty({
      description: 'id do pedido',
      example: 'xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxx'
    })
    orderId: string;

    @IsString()
    @ApiProperty({
      description: 'id do produto do pedido',
      example: 'xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxx'
    })
    productId: string;

    @IsString()
    @ApiProperty({
      description: 'quantidade do produto',
      example: 5
    })
    quantity:  number;
}

