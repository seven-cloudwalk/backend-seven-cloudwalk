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
      accountType: dto.accountType,
      roleAdmin: dto.roleAdmin,
      verificationCode: dto.verificationCode,
      active: dto.active
    };

    try {
      // cria usuário no banco de dados 
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
    
    // code exists
    // muda status de usuário para ativo e retorna true
    await this.update( user.id, { 'active': true } )

    return true;
  }
}


/*
emailValidation: function(req, res, next) {
  let sess =req.session;
  let email =req.body.email;

  // check in database if a user with the email exists
  User.findOne({ where: { 'email' : email } })
      .then(
          function(user) {
              // If email does not exist, log the error send message back
              if (!user){
                  winston.log('error', 'User Not Found with email:'+email);
                  sess.error_message ='Usuário não localizado.';
                  res.send( {'message':sess.error_message, 'err': true } );
                  return;
              };
              // email exists
              // armazenamento das variaveis do usuário na sessão sera feito em verificationCode 
              //sess.user =user;
              //sess.success_message ='Usuário localizado';
              
              // grava codigo de verificação em >>cod_confirmacao  
              let code = Math.floor(1000 + Math.random() * 9000); // jwt.sign( { email: user.email} , process.env.SECRET_KEY, { expiresIn: '1d' }  );
              User.update( { 'cod_confirmacao': code }, { where: { 'id': user.id} } )
              
              // send **email verification** to client's email box
              let _empresa =process.env.EMPRESA;
              let _filename =path.resolve( process.env.APP_BASEDIR +'/mjml-templates/' ,'template1.ejs' );
                  sendData = {'nome': user.nome, 'empresa': _empresa, 'code': code};
              
              // render email verification file from /mjml-templates/template1.ejs
              ejs.renderFile(_filename ,sendData ,null ,function(err, html) {
                  if( err ){
                      winston.log('error', err.message );
                      return
                  }
                  let html_message =html;
                  let from =process.env.EMAIL + '@gmail.com';
                  let mailOptions = {
                      from: { name: _empresa, 
                             address: from
                            },
                      to: email,
                      subject: 'Código De Verificação',
                      html: html_message,
                      attachments: [
                              {
                                filename: "image_email_header.jpg",
                                path: process.env.APP_BASEDIR + "/public/imagens/image_email_header.jpg",
                                cid: "image_email_header@gmail.com",
                              },
                      ],
                  };
                  //
                  //send email
                  transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                          sess.error_message ='Houve algum erro enviando o email. ';
                          winston.log('error', sess.error_message + error.message );
                          res.send( {'message':sess.error_message, 'err': true, data: null } );
                          return;
                      };
                      winston.log('info', 'Sucesso.' + info.response);
                      sess.success_message ='sucesso';
                      //
                      // send view **verification Code** back to client
                      _filename =path.resolve( process.env.APP_BASEDIR +'/views/' ,'pwdVerificationCode.ejs' );
                      ejs.renderFile(_filename ,null ,null ,function(err, html) {
                          if( err ){
                              winston.log('error', err.message );
                              return;
                          }
                          res.send( {'message':sess.success_message, 'err': null, data: html } );
                      })
                  })
              })
          })
      .catch( err => {
          if (err) {
              sess.error_message =err.message;
              sess.user =null;

              // send message back to client
              res.send( {'message':sess.error_message, 'err': true } );
          }
      });
  return
},
verificationCode: function(req, res, next) {
  let code =req.body.code;
  let sess =req.session;
  
  // check in database if code exists
  User.findOne({ where: { 'cod_confirmacao' : code } })
      .then(
          function(user) {
              // If code does not exist, log the error and send message back
              if(!user) {
                  winston.log('error', 'Code Not Found. '+code);
                  sess.error_message ='Codigo inválido ou expirado';
                  // send message back to client
                  res.send( {'message':sess.error_message, 'err': true } );
                  return;
              };
              // code exists
              sess.user =user;
              sess.success_message ='Codigo Verificado';
              //
              // send view **password update** back to client
              let _filename =path.resolve( process.env.APP_BASEDIR +'/views/' ,'pwdUpdate.ejs' );
                  sendData = { 'email': user.email };
              ejs.renderFile(_filename ,sendData ,null ,function(err, html) {
                  if( err ){
                      winston.log('error', err.message );
                      sess.error_message ='Error :'+ err.message;
                      // send error message back to client
                      res.send( {'message':sess.error_message, 'err': true } );
                      return;
                  }
                  // send view **password update** back to client
                  res.send( {'message':sess.success_message, 'err': null, data: html } );
              })
          })
      .catch( err => {
          if (err) {
              sess.error_message =err.message;
              sess.user =null;

              // send error message back to client
              res.send( {'message':sess.error_message, 'err': true } );
          }
      });
},
*/