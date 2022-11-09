import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Redirect,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailSeervice: MailService,
  ) {}

  @Get('all')
  @ApiOperation({
    summary: 'Listar todos usuários',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('find/:id')
  @ApiOperation({
    summary: 'Listar um usuário',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Criar usuário',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    // gera token de confirmação para usuário
    const token = Math.floor(1000 + Math.random() * 9000) + '';
    createUserDto.verificationCode = token;

    // cria usuario
    const user = await this.usersService.create(createUserDto);

    // envia email de confirmação para usuário
    return this.mailSeervice.sendUserConfirmation(user, token);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Alterar um usuário',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Deletar um usuário',
  })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Post('verification/:code')
  @Redirect('https://nft-cloudwalk.vercel.app/email-validated')
  @ApiOperation({
    summary: 'Verifica se o codigo de confirmação é válido',
  })
  verification(@Param('code') code: string) {
    return this.usersService.verification(code);
  }

  @Post('recovery/:email')
  @ApiOperation({
    summary: 'Verifica se o e-mail existe',
  })
  recovery(@Param('email') email: string) {
    return this.usersService.recovery(email);
  }

  @Post('recovery-confirmation/:id')
  @ApiOperation({
    summary: 'Redireciona para página de alteração senhas',
  })
  async recoverConfirmation(@Res() res, @Param('id') id: string) {
    // redirectiona para tela de alteração de senhas infornando qual é o usuário
    console.log(res);
    return res
      .status(302)
      .redirect(`https://nft-cloudwalk.vercel.app/update-password/${id}`);
  }
}
