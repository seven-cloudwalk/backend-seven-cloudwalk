import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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

  async create(dto: CreateOrderDto) {

    if( ! dto.details.length ) {
      throw new BadRequestException(`Não há itens neste pedido.`);
    }

    let _data = {
      userId: dto.userId,
      details: {
        create : dto.details
      }
    };

    // cria o pedido com os detalhes
    return this.prisma.orders.create( { data: _data });
  }

  async update(_id: string, dto: UpdateOrderDto) {

    const record =await this.prisma.orders.findUnique({ where: { id: _id, } });
    if (!record) {
        throw new NotFoundException(`Registro ID:'${_id}' não localizado.`)
    };

    // remove todos os detalhes do pedido para futura inclusão
    if( dto.details.length ) {
      await this.prisma.orderDetails.deleteMany({
        where: { orderId: _id },
      });
    }

    // altera o pedido incluindo novos itens
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

      // remove os dettalhes do pedido
      await this.prisma.orderDetails.deleteMany({
        where: { orderId: _id },
      });

      // remove o pedido
      return this.prisma.orders.delete({
        where: { id: _id, },
      });   
    }
    catch( e ) {
        throw new NotFoundException(`Não foi possível deletar o registro ID:${_id}`)
    }
  }
}
