import CarRepositories from "../repositories/car";
import { Request } from "express";

export default class CarServices {
  #carRepositories: CarRepositories;

  constructor() {
    this.#carRepositories = new CarRepositories();
  }

  async getAll() {
    return await this.#carRepositories.getAll();
  }

  async getById(req: Request) {
    return await this.#carRepositories.getById(req);
  }

  async deleteCar(req: Request) {
    return await this.#carRepositories.deleteCar(req);
  }

  async postCar(item: any) {
    return await this.#carRepositories.postCar(item);
  }

  async updateCar(req: Request, item: any) {
    return await this.#carRepositories.updateCar(req, item);
  }
}
