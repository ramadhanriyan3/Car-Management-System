import { CarsModel } from "../models/cars";
import express, { Express, Request, Response } from "express";

export default class CarRepositories {
  async getAll() {
    return await CarsModel.query();
  }

  async getById(req: Request) {
    const getId = +req.params.id;
    return await CarsModel.query().where("car_id", getId);
  }

  async deleteCar(req: Request) {
    const getId = +req.params.id;
    return await CarsModel.query().where("car_id", getId).del();
  }

  async postCar(item: any) {
    return await CarsModel.query().insert(item).returning("*");
  }

  async updateCar(req: Request, item: any) {
    const getId = +req.params.id;
    return await CarsModel.query().where("car_id", "=", getId).update(item);
  }
}
