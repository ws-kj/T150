import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface RecordDoc extends BaseDoc {
  athlete: string;
  totalMeter: number;
}

export default class RecordConcept {
  public readonly records = new DocCollection<RecordDoc>("records");

  async create(athlete: string) {
    const _id = await this.records.createOne({ athlete, totalMeter: 0 });
    return { msg: "Record successfully created!", record: await this.records.readOne({ _id }) };
  }

  async getRecordById(_id: ObjectId) {
    const record = await this.records.readOne({ _id });
    if (record === null) {
      throw new NotFoundError(`Record not found!`);
    }
    return record;
  }

  async getRecords(query: Filter<RecordDoc>) {
    const records = await this.records.readMany(query, {
      sort: { totalMeter: -1 },
    });
    return records;
  }
  //   async getByAthlete(athlete: ObjectId) {
  //     return await this.getWorkouts({ athlete });
  //   }

  //   async update(_id: ObjectId, update: Partial<WorkoutDoc>) {
  //     this.sanitizeUpdate(update);
  //     await this.workouts.updateOne({ _id }, update);
  //     return { msg: "Workout successfully updated!" };
  //   }

  //   async delete(_id: ObjectId) {
  //     await this.workouts.deleteOne({ _id });
  //     return { msg: "Workout deleted successfully!" };
  //   }

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
