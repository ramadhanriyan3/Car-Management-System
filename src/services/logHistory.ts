import LogHistoryRepo from "../repositories/logHistory";

export default class LogServices {
  #logHistoryRepo: LogHistoryRepo;

  constructor() {
    this.#logHistoryRepo = new LogHistoryRepo();
  }

  async postLog(logData: any) {
    return this.#logHistoryRepo.postLog(logData);
  }

  async getLogList() {
    return this.#logHistoryRepo.getLogList();
  }

  async getLog(id: number) {
    return this.#logHistoryRepo.getLog(id);
  }
}
