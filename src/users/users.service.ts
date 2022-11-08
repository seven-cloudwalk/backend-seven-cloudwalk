import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { handleErrorConstraintUnique } from './../utils/handle.error.utils';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordDto } from './dto/change-password.dto';

const saltRounds = 10;

@Injectable()
export class UsersService {
  // mailerService: any;
  constructor(
    private prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  findAll() {
    return this.prisma.users.findMany({
      orderBy: {
        nickname: 'asc',
      },
    });
  }

  async findOne(_id: string) {
    const record = await this.prisma.users.findUnique({
      where: { id: _id },
    });

    if (!record) {
      throw new NotFoundException(`Registro ID:${_id} não localizado.`);
    }
    return record;
  }

  async create(dto: CreateUserDto) {
    dto.password = bcrypt.hashSync(dto.password, saltRounds);

    try {
      // cria usuário no banco de dados
      return await this.prisma.users.create({ data: dto });
    } catch (error) {
      console.log(error);
      return handleErrorConstraintUnique(error);
    }
  }

  async update(_id: string, dto: UpdateUserDto) {
    const _data: Partial<Users> = { ...dto };

    const record = await this.prisma.users.findUnique({ where: { id: _id } });

    if (!record) {
      throw new NotFoundException(`Registro ID:'${_id}' não localizado.`);
    }

    return this.prisma.users
      .update({
        where: { id: _id },
        data: _data,
      })
      .catch(handleErrorConstraintUnique);
  }

  async delete(_id: string) {
    const record = await this.prisma.users.findUnique({
      where: { id: _id },
    });

    if (!record) {
      throw new NotFoundException(`Registro ID:${_id} não localizado.`);
    }

    try {
      return await this.prisma.users.delete({
        where: { id: _id },
      });
    } catch (error) {
      console.log(error);

      throw new BadRequestException(
        `Não foi possível deletar o registro ID:${_id}`,
      );
    }
  }

  async verification(code: string) {
    // check in database if code exists
    const user = await this.prisma.users.findUnique({
      where: { verificationCode: code },
    });

    // codigo de verificação não localizado, retorna error
    if (!user) {
      throw new NotFoundException(`Código de confirmação inválido.`);
    }

    // if code exists muda status de usuário para ativo
    return await this.prisma.users.update({
      where: { id: user.id },
      data: { active: true },
    });
  }

  async recovery(email: string) {
    // check in database if email exists
    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    // email não localizado, retorna error
    if (!user) {
      throw new NotFoundException(`E-mail inválido!`);
    }

    // code exists
    let _url = `https://seven-cloudwalk.herokuapp.com/users/recovery-confirmation/${user.id}`;
    if (process.env.NODE_ENV === 'development') {
      _url = `http://localhost:3500/users/recovery-confirmation/${user.id}`;
    }

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperação de senha',
        text: 'Recuperação de senha',
        template: './recovery-password',
        context: {
          url: _url,
        },
      });

      return { statusCode: 200, message: `Enviado para o email: ${email}` };
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Erro no envio de e-mail para ${email}`);
    }
  }

  // async forgotPassword() {}
}
