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
class RecordConcept {
    constructor() {
        this.records = new doc_1.default("records");
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
    create(athlete) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.records.createOne({ athlete, totalMeter: 0 });
            return { msg: "Record successfully created!", record: yield this.records.readOne({ _id }) };
        });
    }
    getRecordById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.records.readOne({ _id });
            if (record === null) {
                throw new errors_1.NotFoundError(`Record not found!`);
            }
            return record;
        });
    }
    getRecords(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const records = yield this.records.readMany(query, {
                sort: { totalMeter: -1 },
            });
            return records;
        });
    }
}
exports.default = RecordConcept;
class WorkoutAthleteNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of post {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.WorkoutAthleteNotMatchError = WorkoutAthleteNotMatchError;
//# sourceMappingURL=sixK.js.map