import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface MeterDoc extends BaseDoc {
  rower: string;
  meter: number;
}

export default class MeterConcept {
  public readonly meters = new DocCollection<MeterDoc>("meters");

  async create(rower: string) {
    const _id = await this.meters.createOne({ rower, meter: 0 });
    return { msg: "Meter successfully created!", meter: await this.meters.readOne({ _id }) };
  }

  async getMeterById(_id: ObjectId) {
    const meter = await this.meters.readOne({ _id });
    if (meter === null) {
      throw new NotFoundError(`Record not found!`);
    }
    return meter;
  }

  async getMeters(query: Filter<MeterDoc>) {
    const meters = await this.meters.readMany(query, {
      sort: { meter: -1 },
    });
    return meters;
  }

  async update(rower: string, update: Partial<MeterDoc>) {
    this.sanitizeUpdate(update);
    await this.meters.updateOne({ rower }, update);
    return { msg: "Workout successfully updated!" };
  }

  async delete(rower: string) {
    await this.meters.deleteOne({ rower });
    return { msg: "Workout deleted successfully!" };
  }

  //   async deleteByAthlete(athlete: ObjectId) {
  //     await this.workouts.deleteMany({ athlete: athlete });
  //     return { msg: `All '${athlete}''s workouts deleted successfully!` };
  //   }

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

  private sanitizeUpdate(update: Partial<MeterDoc>) {
    // Make sure the update cannot change the athlete.
    const allowedUpdates = ["meter"];
    for (const key in update) {
      if (!allowedUpdates.includes(key)) {
        throw new NotAllowedError(`Cannot update '${key}' field!`);
      }
    }
  }
}

export class WorkoutAthleteNotMatchError extends NotAllowedError {
  constructor(
    public readonly author: ObjectId,
    public readonly _id: ObjectId,
  ) {
    super("{0} is not the author of post {1}!", author, _id);
  }
}
