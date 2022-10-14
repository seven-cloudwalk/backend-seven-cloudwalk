export class Users {
  // import { Favorite } from './../../favorite/entity/favorite.entity';

  id?: string;
  nickname: string;
  email: string;
  password: string;
  accountType: string;
  roleAdmin?: boolean;
  verificationCode?: string;
  active?:boolean;
  createdAt?: Date;
  updatedAt?: Date;
  //   favorites? : Favorite[]
}