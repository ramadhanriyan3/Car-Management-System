import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  car_id!: number;
  car_name!: string;
  brand_id!: number;
  type_id!: number;
  capacity!: number;
  car_year!: number;
  image_url!: string;
  price!: number;
  availability!: boolean;

  static get tableName() {
    return "cars";
  }
}

export type Cars = ModelObject<CarsModel>;
