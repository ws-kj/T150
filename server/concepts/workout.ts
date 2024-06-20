import { Filter, ObjectId } from "mongodb";

import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface WorkoutDoc extends BaseDoc {
  athlete: ObjectId;
  type: string;
  meter: number;
  workoutDate: string;
  description: string;
}

export default class WorkoutConcept {
  public readonly workouts = new DocCollection<WorkoutDoc>("workouts");

  async create(athlete: ObjectId, type: string, meter: number, workoutDate: string, description: string) {
    const _id = await this.workouts.createOne({ athlete, type, meter, workoutDate, description });
    return { msg: "Workout successfully created!", workout: await this.workouts.readOne({ _id }) };
  }

  async getWorkoutById(_id: ObjectId) {
    const workout = await this.workouts.readOne({ _id });
    if (workout === null) {
      throw new NotFoundError(`Workout not found!`);
    }
    return workout;
  }

  async getWorkouts(query: Filter<WorkoutDoc>) {
    const workouts = await this.workouts.readMany(query, {
      sort: { workoutDate: -1 },
    });
    return workouts;
  }

  async getByAthlete(athlete: ObjectId) {
    return await this.getWorkouts({ athlete });
  }

  async update(_id: ObjectId, update: Partial<WorkoutDoc>) {
    this.sanitizeUpdate(update);
    await this.workouts.updateOne({ _id }, update);
    return { msg: "Workout successfully updated!" };
  }

  async delete(_id: ObjectId) {
    await this.workouts.deleteOne({ _id });
    return { msg: "Workout deleted successfully!" };
  }

  async deleteByAthlete(athlete: ObjectId) {
    await this.workouts.deleteMany({ athlete: athlete });
    return { msg: `All '${athlete}''s workouts deleted successfully!` };
  }

  async getTotalMeter(athlete: ObjectId) {
    const workouts = await this.workouts.readMany({ athlete });
    let total = 0;
    for (const workout of workouts) {
      total += workout.meter;
    }
    return total;
  }

  async isAthlete(user: ObjectId, _id: ObjectId) {
    const workout = await this.workouts.readOne({ _id });
    if (!workout) {
      throw new NotFoundError(`Workout ${_id} does not exist!`);
    }
    if (workout.athlete.toString() !== user.toString()) {
      throw new WorkoutAthleteNotMatchError(user, _id);
    }
  }

  async getRecentWeekWorkouts() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const workouts = await this.getWorkouts({ workoutDate: { $gte: oneWeekAgo.toISOString().split("T")[0] } });
    return workouts;
  }

  private sanitizeUpdate(update: Partial<WorkoutDoc>) {
    // Make sure the update cannot change the athlete.
    const allowedUpdates = ["type", "meter", "description"];
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
