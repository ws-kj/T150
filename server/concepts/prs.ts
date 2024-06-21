import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotFoundError } from "./errors";

export interface PRDoc extends BaseDoc {
  rower: string;
  type: string;
  date: string;
  pr: number;
}

export default class PRConcept {
  public readonly prs = new DocCollection<PRDoc>("prs");

  async addOrUpdate(rower: string, type: string, date: string, pr: number) {
    const oldPR = await this.prs.readOne({ rower, type });
    if (oldPR === null) {
      const _id = await this.prs.createOne({ rower, type, date, pr });
      return { msg: "PR successfully submitted!", pr: await this.prs.readOne({ _id }) };
    } else {
      await this.prs.updateOne({ _id: oldPR._id }, { date, pr });
      return { msg: "PR successfully updated!" };
    }
  }

  async getPRById(_id: ObjectId) {
    const pr = await this.prs.readOne({ _id });
    if (pr === null) {
      throw new NotFoundError(`PR not found!`);
    }
    return pr;
  }

  async getPRsByType(type: string) {
    if (type === "maxBenchPress" || type === "maxSquat") {
      return await this.prs.readMany({ type }, { sort: { pr: -1 } });
    } else {
      return await this.prs.readMany({ type }, { sort: { pr: 1 } });
    }
  }

  async getByRower(rower: string) {
    const pr = await this.prs.readMany({ rower });
    if (pr === null) {
      throw new NotFoundError(`Rower not found!`);
    }
    return pr;
  }

  async delete(_id: ObjectId) {
    await this.prs.deleteOne({ _id });
    return { msg: "PR deleted successfully!" };
  }

  async deleteByRower(rower: string) {
    await this.prs.deleteMany({ rower });
    return { msg: `PRs deleted successfully!` };
  }

  async existsPR(rower: string, type?: string) {
    const results = await this.prs.readMany({ rower, type });
    if (results === null) {
      return false;
    } else {
      return true;
    }
  }
}
