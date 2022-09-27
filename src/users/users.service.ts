import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { handleErrorConstraintUnique } from './../utils/handle.error.utils';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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
      pj: dto.pj,
      role: dto.role,
    };

    try {
      return await this.prisma.users.create({ data: dto });
    } catch (error) {
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
    try {
      /*
      await this.prisma.profiles.deleteMany({
        where: { userId: _id, },
      });   
      */

      return await this.prisma.users.delete({
        where: { id: _id },
      });
    } catch (e) {
      throw new NotFoundException(
        `Não foi possível deletar o registro ID:${_id}`,
      );
    }
  }
}
