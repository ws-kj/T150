import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { WorkoutDoc } from "./workout";
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

  async getMeterByRower(rower: string) {
    return (await this.meters.readOne({ rower }))?.meter;
  }

  async update(rower: string, workouts: WorkoutDoc[]) {
    const meter = this.compute(workouts);
    const update = { meter };
    await this.meters.updateOne({ rower }, update);
    return { msg: "Workout successfully updated!" };
  }

  async delete(rower: string) {
    await this.meters.deleteOne({ rower });
    return { msg: "Workout deleted successfully!" };
  }

  private compute(workouts: WorkoutDoc[]) {
    let totalMeter = 0;
    for (const workout of workouts) {
      if (workout.type === "single") {
        totalMeter += workout.meter * 1.5;
      } else if (workout.type === "double/pair") {
        totalMeter += workout.meter * 1.25;
      } else if (workout.type === "eight") {
        totalMeter += workout.meter * 1;
      } else if (workout.type === "erg") {
        totalMeter += workout.meter * 1;
      } else if (workout.type === "bikeerg") {
        totalMeter += workout.meter * 0.45;
      } else if (workout.type === "cycling") {
        totalMeter += workout.meter * 0.34;
      } else if (workout.type === "lift") {
        totalMeter += workout.meter * 5000;
      } else if (workout.type === "swimming") {
        totalMeter += workout.meter * 3;
      } else if (workout.type === "running") {
        totalMeter += workout.meter * 3;
      }
    }
    return totalMeter;
  }

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
