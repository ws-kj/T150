// import { ObjectId } from "mongodb";
import { User } from "./app";
import { WorkoutAthleteNotMatchError, WorkoutDoc } from "./concepts/workout";
import { Router } from "./framework/router";
/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
export default class Responses {
  /**
   * Convert WorkoutDoc into more readable format for the frontend by converting the athlete id into a username.
   */
  static async workout(workout: WorkoutDoc | null) {
    if (!workout) {
      return workout;
    }
    const athelte = await User.getUserById(workout.athlete);
    return { ...workout, athlete: athelte.username };
  }

  /**
   * Same as {@link post} but for an array of PostDoc for improved performance.
   */
  static async workouts(workouts: WorkoutDoc[]) {
    const athletes = await User.idsToUsernames(workouts.map((workout) => workout.athlete));
    return workouts.map((workout, i) => ({ ...workout, athlete: athletes[i] }));
  }
}

Router.registerError(WorkoutAthleteNotMatchError, async (e) => {
  const username = (await User.getUserById(e.author)).username;
  return e.formatWith(username, e._id);
});
