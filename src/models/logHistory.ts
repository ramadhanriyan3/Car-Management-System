import { Model, ModelObject } from "objection";

export class LogHistoryModel extends Model {
  id!: number;
  user_id!: string;
  car_id!: string;
  action!: string;
  description!: string;
  created_at!: Date;

  static get tableName() {
    return "log_history";
  }
}

export type Users = ModelObject<LogHistoryModel>;
