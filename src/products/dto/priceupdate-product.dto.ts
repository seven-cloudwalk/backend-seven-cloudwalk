import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PriceUpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxxxxxx-xxxxxxx-0',
    description: 'ID do produto',
  })
  A: string;      // ID do produto

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5,
    description: 'Percentual de desconto a ser aplicado ao produto',
  })
  B: number;    // percentual de desconto
}
