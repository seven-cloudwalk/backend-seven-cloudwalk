import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { handleErrorConstraintUnique } from 'src/utils/handle.error.utils';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  async create(userId: string, dto: CreateOrderDto) {

    if( ! dto.details.length ) {
      throw new BadRequestException(`Este pedido não contém itens.`);
    }

    let _data = {
      userId: userId,
      details: {
        create : dto.details
      }
    };

    // cria o pedido com os detalhes
    try {
      return await this.prisma.orders.create( { data: _data });
    } catch (error) {
      return handleErrorConstraintUnique(error);
    }
        
  }

  async update(_id: string, dto: UpdateOrderDto) {

    const record =await this.prisma.orders.findUnique({ where: { id: _id, } });
    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    if( ! dto.details.length ) {
      throw new BadRequestException(`Este pedido não contém itens.`);
    }

    try {
      // remove todos os detalhes do pedido para futura inclusão
      const oldDetails = this.prisma.orderDetails.deleteMany({
          where: { orderId: _id },
        });

      // altera o pedido incluindo novos itens
      const newOrder =  this.prisma.orders.update({
        where: { id: _id },
        data : {
          updatedAt: new Date(),
          details: {
            create: dto.details
          }
        },
      });

      // tenta efetuar a alteração
      return await this.prisma.$transaction( [oldDetails, newOrder] );

    } catch (error) {
      return handleErrorConstraintUnique(error);
    };
  }

  async delete(_id: string) {

    const record =await this.prisma.orders.findUnique({ where: { id: _id, } });
    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    try {
      // remove os dettalhes do pedido
      const oldDetails =this.prisma.orderDetails.deleteMany({
        where: { orderId: _id },
      });

      // remove o pedido
      const oldOrder = this.prisma.orders.delete({
        where: { id: _id, },
      });   

      // tenta efetuar a exclusão
      return await this.prisma.$transaction( [oldDetails, oldOrder] );
    }
    catch( e ) {
        throw new NotFoundException(`Não foi possível deletar o registro ID:${_id}`)
    }
  }
}
