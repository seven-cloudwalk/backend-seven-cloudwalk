import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Apelido do usuário',
    example: 'nome um',
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'nome1@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Senha do usuário',
    example: 'teste',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'informa se este usuário é uma pessoa jurídica',
    example: 'true',
  })
  accountType: string | 'PF' | 'PJ';

  @IsBoolean()
  @ApiProperty({
    description: 'Informa se este usuário é um administrador',
    example: 'false',
  })
  roleAdmin: boolean =false;

  @IsString()
  @ApiProperty({
    required: false 
  })
  verificationCode: string ='0000';
  
  @IsBoolean()
  @ApiProperty({
    required: false 
  })
  active: boolean = false;
}
