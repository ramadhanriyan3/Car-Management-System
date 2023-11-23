import UserRepositories from "../repositories/user";

export default class UserServices {
  #userRepositories: UserRepositories;

  constructor() {
    this.#userRepositories = new UserRepositories();
  }

  // register
  async register(userData: any) {
    return this.#userRepositories.postUser(userData);
  }

  async getUser(params: any) {
    return this.#userRepositories.getUser(params);
  }
}
