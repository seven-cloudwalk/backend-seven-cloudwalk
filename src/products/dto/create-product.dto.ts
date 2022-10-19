import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Semente de girassol',
    description: 'Nome da semente a ser comercializada.',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'Número do código do produto, não é ID.',
  })
  cod: number;

  @IsString()
  @ApiProperty({
    example: 1,
    description: 'Categoria do produto.',
  })
  category: string = '1';

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Semente de girassol',
    description: 'Maravilhosa semente de girassol.',
  })
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsNotEmpty()
  @ApiProperty({
    example: 26.0,
    description: 'Preço da semente',
  })
  price: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://i.imgur.com/zIBmPpd.jpg',
    description: 'Link of image',
  })
  image: string;

  @IsBoolean()
  stock: boolean = true;
}
