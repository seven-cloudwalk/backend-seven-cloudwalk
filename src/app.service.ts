import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Aplicação de Gerenciamento de E-commerce';
  }
}
