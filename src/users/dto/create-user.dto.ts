import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Apelido do usuário',
    example: 'nome um',
  })
  nickname: string;

  @IsString()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'nome1@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'teste',
  })
  password: string;

  @IsBoolean()
  @ApiProperty({
    description: 'informa se este usuário é uma pessoa jurídica',
    example: 'true',
  })
  pj: boolean;

  @IsBoolean()
  @ApiProperty({
    description: 'Informa se este usuário é um administrador',
    example: 'false',
  })
  role: boolean;
}
