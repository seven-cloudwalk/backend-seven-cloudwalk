import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Apelido do usuário',
    example: 'nome um',
  })
  nickname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'nome1@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha fraca',
  })
  @ApiProperty({
    description:
      'A Senha do usuário deve conter: no mínimo uma letra maiúscula, uma minúscula, um símbolo e um número e no mínimo 8 dígitos. ',
    example: 'teste',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'informa se este usuário é uma pessoa jurídica',
    example: 'PF',
    default: 'PF',
  })
  accountType: string = 'PF' || 'PJ';

  @IsBoolean()
  @ApiProperty({
    description: 'Informa se este usuário é um administrador',
    example: 'false',
    default: false,
  })
  roleAdmin: boolean = false;

  @IsString()
  @ApiHideProperty()
  verificationCode: string = '0000';

  @IsBoolean()
  @ApiHideProperty()
  active: boolean = false;
}
