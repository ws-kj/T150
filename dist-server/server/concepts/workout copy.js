"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutAthleteNotMatchError = void 0;
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class WorkoutConcept {
    constructor() {
        this.workouts = new doc_1.default("workouts");
    }
    create(athlete, type, meter) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('here2');
            const _id = yield this.workouts.createOne({ athlete, type, meter });
            return { msg: "Workout successfully created!", workout: yield this.workouts.readOne({ _id }) };
        });
    }
    // async idsToPost(ids: ObjectId[]) {
    //   console.log(ids);
    //   console.log({ _id: { $in: ids } });
    //   const posts = await this.posts.readMany({ _id: { $in: ids } });
    //   console.log(posts);
    //   // Store strings in Map because ObjectId comparison by reference is wrong
    //   const idToPost = new Map(posts.map((post) => [post._id.toString(), post]));
    //   console.log(idToPost);
    //   return ids.map((id) => idToPost.get(id.toString())?.content ?? "DELETED_USER");
    // }
    getWorkoutById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const workout = yield this.workouts.readOne({ _id });
            if (workout === null) {
                throw new errors_1.NotFoundError(`Workout not found!`);
            }
            return workout;
        });
    }
    getWorkouts(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const workouts = yield this.workouts.readMany(query, {
                sort: { dateUpdated: -1 },
            });
            return workouts;
        });
    }
    getByAthlete(athlete) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getWorkouts({ athlete });
        });
    }
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sanitizeUpdate(update);
            yield this.workouts.updateOne({ _id }, update);
            return { msg: "Workout successfully updated!" };
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workouts.deleteOne({ _id });
            return { msg: "Workout deleted successfully!" };
        });
    }
    deleteByAthlete(athlete) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.workouts.deleteMany({ athlete: athlete });
            return { msg: `All '${athlete}''s workouts deleted successfully!` };
        });
    }
    isAthlete(user, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            const workout = yield this.workouts.readOne({ _id });
            if (!workout) {
                throw new errors_1.NotFoundError(`Workout ${_id} does not exist!`);
            }
            if (workout.athlete.toString() !== user.toString()) {
                throw new WorkoutAthleteNotMatchError(user, _id);
            }
        });
    }
    sanitizeUpdate(update) {
        // Make sure the update cannot change the athlete.
        const allowedUpdates = ["type", "meter"];
        for (const key in update) {
            if (!allowedUpdates.includes(key)) {
                throw new errors_1.NotAllowedError(`Cannot update '${key}' field!`);
            }
        }
    }
}
exports.default = WorkoutConcept;
class WorkoutAthleteNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of post {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.WorkoutAthleteNotMatchError = WorkoutAthleteNotMatchError;
//# sourceMappingURL=workout%20copy.js.map