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
    const hasSpace = dto.nickname.replace(/ /g, '').toLowerCase();

    const data: CreateUserDto = {
      nickname: hasSpace,
      email: dto.email,
      password: dto.password,
      accountType: dto.accountType,
      roleAdmin: dto.roleAdmin,
      verificationCode: dto.verificationCode,
      active: false,
    };

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

    // if code exists
    // muda status de usuário para ativo
    return await this.update(user.id, { active: true });

    // muda status de usuário para ativo e retorna true
    await this.update(user.id, { active: true });

    return true;
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
    // muda status de usuário para ativo e retorna true
    await this.update(user.id, { active: true });

    return true;
  }

  async forgotPassword(email: string) {
    // const url = `https://seven-cloudwalk.herokuapp.com/users/send-recover-email/${email}`;
    const url = `http://localhost:3500/users/send-recover-email`;

    try {
      await this.mailerService.sendMail({
        from: 'digitalentrepreneur042018@smtp.gmail.com',
        to: email,
        subject: 'Recuperação de senha',
        text: 'Recuperação de senha',
        html: '<b>https://seven-cloudwalk.herokuapp.com/users/send-recover-email</b>',
        template: './recovery-password',
        context: {
          url,
        },
      });
      return `E-mail de recuperação de senha ${email}`;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(`Erro no envio de e-mail para ${email}`);
    }
  }
}
