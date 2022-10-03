export class Users {
  // import { Favorite } from './../../favorite/entity/favorite.entity';

  id?: string;
  nickname: string;
  email: string;
  password: string;
  pj: boolean;
  roleAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  //   favorites? : Favorite[]
}
