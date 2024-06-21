import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotFoundError } from "./errors";

export interface PRDoc extends BaseDoc {
  rower: string;
  type: string;
  pr: string | number;
}

type HHMMSS = string;

export default class PRConcept {
  public readonly prs = new DocCollection<PRDoc>("prs");

  async create(rower: string, type: string, pr: string) {
    const _id = await this.prs.createOne({ rower, type, pr: this.parsePR(pr) });
    return { msg: "PR successfully submitted!", pr: await this.prs.readOne({ _id }) };
  }

  async getPRById(_id: ObjectId) {
    const pr = await this.prs.readOne({ _id });
    if (pr === null) {
      throw new NotFoundError(`PR not found!`);
    }
    return pr;
  }

  async getPRsByType(type: string) {
    const prs = await this.prs.readMany({ type }, { sort: { pr: -1 } });
    return prs;
  }

  async getByRower(rower: string) {
    const pr = await this.prs.readMany({ rower });
    if (pr === null) {
      throw new NotFoundError(`Rower not found!`);
    }
    return pr;
  }

  async update(_id: ObjectId, update: Partial<PRDoc>) {
    await this.prs.updateOne({ _id }, update);
    return { msg: "PR successfully updated!" };
  }

  async delete(_id: ObjectId) {
    await this.prs.deleteOne({ _id });
    return { msg: "PR deleted successfully!" };
  }

  async deleteByRower(rower: string) {
    await this.prs.deleteMany({ rower });
    return { msg: `PRs deleted successfully!` };
  }

  // Helper function to compare PR values
  private comparePRs(pr1: string, pr2: string): number {
    const pr1Value = this.parsePR(pr1);
    const pr2Value = this.parsePR(pr2);
    if (pr1Value !== null && pr2Value !== null) {
      return pr1Value - pr2Value;
    }
    return pr1.localeCompare(pr2);
  }

  // Helper function to parse PR values
  private parsePR(pr: string): number {
    if (/^\d{1,2}:\d{2}$/.test(pr)) {
      // MM:SS format
      const [minutes, seconds] = pr.split(":").map(Number);
      return minutes * 60 + seconds;
    } else if (/^\d{1,2}:\d{2}:\d{2}$/.test(pr)) {
      // HH:MM:SS format
      const [hours, minutes, seconds] = pr.split(":").map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    } else if (/^\d+(\.\d+)?$/.test(pr)) {
      // Weight format
      return parseFloat(pr);
    } else {
      return 0;
    }
  }

  // Helper function to convert seconds to HH:MM:SS format
  private secondsToHHMMSS(seconds: number): HHMMSS {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  // // Helper function to map PRs to proper formats
  // private mapPRs(prs: PRDoc[]): PRDoc[] {
  //   return prs.map((pr) => {
  //     if (pr.type === "maxBenchPress" || pr.type === "maxSquat") {
  //       // Keep weight as is
  //     } else {
  //       // Convert seconds to HH:MM:SS format
  //       pr.pr = this.secondsToHHMMSS(pr.pr);
  //     }
  //     return pr;
  //   });
  // }
}
