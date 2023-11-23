import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
  user_id!: string;
  name!: string;
  email!: string;
  password!: string;
  role!:string;
  created_at!: Date;

  static get tableName() {
    return "users";
  }
}

export type Users = ModelObject<UsersModel>;
