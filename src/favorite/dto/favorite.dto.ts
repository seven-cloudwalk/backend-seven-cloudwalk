import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class FavoriteProductDto {
  @IsUUID()
  @ApiProperty({
    description: 'ID do usuário',
    example: 'e53aa5d6-89ca-47c0-b42b-fcb2c55ce751',
  })
  iduser: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do produto',
    example: 'e53aa5d6-89ca-47c0-b42b-fcb2c55ce751',
  })
  idproduct: string;
}
