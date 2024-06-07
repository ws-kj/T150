import { ObjectId } from "mongodb";

import { User, WebSession, Workout, Record } from "./app";
import { UserDoc } from "./concepts/user";
import { WebSessionDoc } from "./concepts/websession";
import { WorkoutDoc } from "concepts/workout";
import { Router, getExpressRouter } from "./framework/router";
import Responses from "./responses";

class Routes {
  @Router.get("/session")
  async getSessionUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);
    return await User.getUserById(user);
  }

  @Router.get("/users")
  async getUsers() {
    const users = await User.getUsers();
    return users;
  }

  @Router.get("/users/:username")
  async getUser(username: string) {
    const user = await User.getUserByUsername(username);
    return user;
  }

  @Router.get("/users/search/:username")
  async searchUsersByUsername(username?: string) {
    let users;
    if (username) {
      users = await User.searchUsersByUsername(username);
    } else {
      users = await User.getUsers();
    }
    return users;
  }

  @Router.post("/users")
  async createUser(session: WebSessionDoc, username: string, password: string, profilePhoto: string, code: string) {
    WebSession.isLoggedOut(session);
    const user = await User.create(username, password, profilePhoto, code);
    await Record.create(user.user.username);
    return user.user;
  }

  @Router.patch("/users")
  async updateUser(session: WebSessionDoc, update: Partial<UserDoc>) {
    const user = WebSession.getUser(session);
    return await User.update(user, update);
  }

  @Router.delete("/users")
  async deleteUser(session: WebSessionDoc) {
    const user = WebSession.getUser(session);

    WebSession.end(session);
    return await User.delete(user);
  }

  @Router.post("/login")
  async logIn(session: WebSessionDoc, username: string, password: string) {
    const u = await User.authenticate(username, password);
    WebSession.start(session, u._id);
    return { msg: "Logged in!" };
  }

  @Router.post("/logout")
  async logOut(session: WebSessionDoc) {
    WebSession.end(session);
    return { msg: "Logged out!" };
  }

  // Workouts
  @Router.get("/workouts")
  async getWorkouts(athlete?: string) {
    let workouts;
    if (athlete) {
      const id = (await User.getUserByUsername(athlete))._id;
      workouts = await Workout.getByAthlete(id);
    } else {
      workouts = await Workout.getWorkouts({});
    }
    return Responses.workouts(workouts);
  }

  @Router.post("/workouts")
  async createWorkout(session: WebSessionDoc, type: string, meter: string, workoutDate: string) {
    const user = WebSession.getUser(session);
    const created = await Workout.create(user, type, Number(meter), workoutDate);
    return { msg: created.msg, post: await Responses.workout(created.workout) };
  }

  @Router.patch("/workouts/:_id")
  async updateWorkout(session: WebSessionDoc, _id: ObjectId, update: Partial<WorkoutDoc>) {
    const user = WebSession.getUser(session);
    await Workout.isAthlete(user, _id);
    return await Workout.update(_id, update);
  }

  @Router.delete("/workouts/:_id")
  async deleteWorkout(session: WebSessionDoc, _id: ObjectId) {
    const user = WebSession.getUser(session);
    await Workout.isAthlete(user, _id);
    return Workout.delete(_id);
  }

  @Router.get("/meter")
  async getMeter(session: WebSessionDoc, athlete?: string) {
    let meter: number;
    if (athlete) {
      const id = (await User.getUserByUsername(athlete))._id;
      meter = await Workout.getTotalMeter(id);
    } else {
      const id = WebSession.getUser(session);
      meter = await Workout.getTotalMeter(id);
    }
    return meter;
  }

  @Router.get("/record")
  async getAllMeter() {
    return Record.getRecords({});
  }
}

export default getExpressRouter(new Routes());
