import { PartialType } from '@nestjs/swagger';
import { CreateOrderDetailsDto } from './create-orderDetails.dto';

export class UpdateOrderDeatilsDto extends PartialType(CreateOrderDetailsDto) {}
