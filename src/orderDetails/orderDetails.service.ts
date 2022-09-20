import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { CreateOrderDetailsDto } from './dto/create-orderDetails.dto';


@Injectable()
export class OrderDetailsService {
  constructor(private prisma :PrismaService ) {}

  findAll() {
    return this.prisma.orderDetails.findMany({})
  }

  async findOne(_id: string) {
    const record =await this.prisma.orderDetails.findUnique({ 
      where: { id: _id, },
    });

    if (!record) {
        throw new NotFoundException(`Registro ID:${_id} não localizado.`)
    };
    return record;
  }

  async create(dto: CreateOrderDetailsDto) {

    //await this.prisma.orderDetails.create( { orderId: 0, })

  }

  async update(_id: string, dto: CreateOrderDetailsDto) {
    const _data: Partial<Users> = { ...dto };

    const record =await this.prisma.orderDetails.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    return this.prisma.orders.update({
        where: { id: _id },
        data : _data,
    });
  }

  async delete(_id: string) {
    try {
      /*
      await this.prisma.profiles.deleteMany({
        where: { userId: _id, },
      });   
      */

      return await this.prisma.orders.delete({
        where: { id: _id, },
      });   
    }
    catch( e ) {
        throw new NotFoundException(`Não foi possível deletar o registro ID:${_id}`)
    }
  }
}
