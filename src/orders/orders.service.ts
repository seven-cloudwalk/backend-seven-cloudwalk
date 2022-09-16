import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { OrderDetails, Users } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailsDto } from 'src/orderDetails/dto/create-orderDetails.dto';
import { networkInterfaces } from 'os';

const saltRounds =10;

@Injectable()
export class OrdersService {
  constructor(private prisma :PrismaService ) {}

  findAll() {
    return this.prisma.orders.findMany({
      include: {
        details: true,
      }
    })
  }

  async findOne(_id: string) {
    const record =await this.prisma.orders.findUnique({ 
      where: { id: _id, },
      include: {
        details: true,
      }
    });

    if (!record) {
        throw new NotFoundException(`Registro ID:${_id} não localizado.`)
    };
    return record;
  }

  async create(dto: CreateOrderDto) {

    let _data = {
      userId: dto.userId,
      details: {
        create : JSON.parse( JSON.stringify( dto.details ) )
      }
    };

    console.log('data:', _data);
    
    // cria o pedido com os detalhes
    return this.prisma.orders.create( { data: _data });

  }

  async update(_id: string, dto: UpdateOrderDto) {

    const record =await this.prisma.orders.findUnique({ where: { id: _id, } });

    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    await this.prisma.orderDetails.deleteMany({
      where: { orderId: _id },
    });

    console.log( 'data:', dto.details);

    // altera os dados do pedido
    return await this.prisma.orders.update({
        where: { id: _id },
        data : {
          details: {
            create: dto.details
          }
        },
    });
  }

  async delete(_id: string) {
    try {
      const record =await this.prisma.orders.findUnique({ where: { id: _id, } });

      if (!record) {
          throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
      };

      await this.prisma.orders.update({
        where: { id: _id },
        data : { 
          details: {
            set: []
          }
        },
      });
  
      return await this.prisma.orders.delete({
        where: { id: _id, },
      });   
    }
    catch( e ) {
        throw new NotFoundException(`Não foi possível deletar o registro ID:${_id}`)
    }
  }
}
