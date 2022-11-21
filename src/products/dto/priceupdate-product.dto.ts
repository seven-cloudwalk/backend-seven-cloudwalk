import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PriceUpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'xxxxxxx-xxxxxxx-0',
    description: 'ID do produto',
  })
  Codigo: string;      // ID do produto

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 5,
    description: 'Percentual a ser aplicado ao produto',
  })
  Percentual: number;    // percentual

  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Booleano indicando se o percentual é de acrésmino ou desconto',
    default: false
  })
  Acrescimo: boolean = false;    // acrescimo
}
