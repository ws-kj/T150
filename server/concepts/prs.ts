import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface PRDoc extends BaseDoc {
  rower: string;
  type: string;
  pr: string;
}

export default class PRConcept {
  public readonly prs = new DocCollection<PRDoc>("prs");

  async create(rower: string, type: string, pr: string) {
    const _id = await this.prs.createOne({ rower, type, pr });
    return { msg: "PR successfully submitted!", pr: await this.prs.readOne({ _id }) };
  }

  async getPRById(_id: ObjectId) {
    const pr = await this.prs.readOne({ _id });
    if (pr === null) {
      throw new NotFoundError(`PR not found!`);
    }
    return pr;
  }

  async getPRs(query: Filter<PRDoc>) {
    const prs = await this.prs.readMany(query, {
      sort: { pr: -1 },
    });
    return prs;
  }

  async getByRower(rower: string) {
    console.log("here");
    console.log(rower);
    const pr = await this.prs.readMany({ rower });
    console.log(pr);
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

  //   async getTotalMeter(athlete: ObjectId) {
  //     const workouts = await this.workouts.readMany({ athlete });
  //     let total = 0;
  //     for (const workout of workouts) {
  //       total += workout.meter;
  //     }
  //     return total;
  //   }

  //   async isAthlete(user: ObjectId, _id: ObjectId) {
  //     const workout = await this.workouts.readOne({ _id });
  //     if (!workout) {
  //       throw new NotFoundError(`Workout ${_id} does not exist!`);
  //     }
  //     if (workout.athlete.toString() !== user.toString()) {
  //       throw new WorkoutAthleteNotMatchError(user, _id);
  //     }
  //   }

  //   private sanitizeUpdate(update: Partial<WorkoutDoc>) {
  //     // Make sure the update cannot change the athlete.
  //     const allowedUpdates = ["type", "meter"];
  //     for (const key in update) {
  //       if (!allowedUpdates.includes(key)) {
  //         throw new NotAllowedError(`Cannot update '${key}' field!`);
  //       }
  //     }
  //   }
}

export class WorkoutAthleteNotMatchError extends NotAllowedError {
  constructor(
    public readonly author: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} is not the author of post {1}!", author, _id);
  }
}
