import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Procura e checa se o user existe, usando o email
    const user = await this.prisma.users.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    // Valida se a senha informada é correta
    const isHashValid = await bcrypt.compare(password, user.password);

    if (!isHashValid) {
      throw new UnauthorizedException('Usuário e/ou senha inválidos');
    }

    delete user.password;

    return {
      token: this.jwtService.sign({ email }),
      user,
    };
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const url = `https://seven-cloudwalk.herokuapp.com/users/recovery/${email}`;

    const user = await this.mailerService.sendMail({});

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    const mail = {
      to: user.email,
      subject: 'Recuperação de senha',
      template: './recovery-password',
      context: {
        token: user.recoverToken,
        url,
      },
    };

    await this.mailerService.sendMail(mail);
  }
}
