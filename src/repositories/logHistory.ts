import { LogHistoryModel } from "../models/logHistory";
import { UsersModel } from "../models/users";

export default class LogHistory {
  async postLog(logData: any) {
    return await LogHistoryModel.query().insert(logData).returning("*");
  }

  async getLogList() {
    return await LogHistoryModel.query();
  }

  async getLog(id: number) {
    return await LogHistoryModel.query().findById(id);
  }
}
