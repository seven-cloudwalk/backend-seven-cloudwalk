import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateOrderDetailsDto } from './dto/create-orderDetails.dto';
import { OrderDetailsService } from './orderDetails.service';

@ApiTags('orderDetails')
@Controller('orderDetails')
export class OrderDetailsController {
  constructor(private readonly ordersDetailsService: OrderDetailsService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Listar os detalhes de um pedido',
  })      
  findOne(@Param('id') id: string) {
    return this.ordersDetailsService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar detalhes do pedido',
  })      
  create(@Body() createOrderDto: CreateOrderDetailsDto) {
    return this.ordersDetailsService.create(createOrderDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Alterar um pedido',
  })      
  update(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDetailsDto) {
    return this.ordersDetailsService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar um detalhe do um pedido',
  })      
  delete(@Param('id') id: string) {
    return this.ordersDetailsService.delete(id);
  }
}
