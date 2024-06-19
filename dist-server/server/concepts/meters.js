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
class MeterConcept {
    constructor() {
        this.meters = new doc_1.default("records");
    }
    create(rower) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.meters.createOne({ rower, meter: 0 });
            return { msg: "Meter successfully created!", meter: yield this.meters.readOne({ _id }) };
        });
    }
    getMeterById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const meter = yield this.meters.readOne({ _id });
            if (meter === null) {
                throw new errors_1.NotFoundError(`Record not found!`);
            }
            return meter;
        });
    }
    getMeters(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const meters = yield this.meters.readMany(query, {
                sort: { meter: -1 },
            });
            return meters;
        });
    }
    update(rower, update) {
        return __awaiter(this, void 0, void 0, function* () {
            this.sanitizeUpdate(update);
            yield this.meters.updateOne({ rower }, update);
            return { msg: "Workout successfully updated!" };
        });
    }
    delete(rower) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.meters.deleteOne({ rower });
            return { msg: "Workout deleted successfully!" };
        });
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
    sanitizeUpdate(update) {
        // Make sure the update cannot change the athlete.
        const allowedUpdates = ["meter"];
        for (const key in update) {
            if (!allowedUpdates.includes(key)) {
                throw new errors_1.NotAllowedError(`Cannot update '${key}' field!`);
            }
        }
    }
}
exports.default = MeterConcept;
class WorkoutAthleteNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of post {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.WorkoutAthleteNotMatchError = WorkoutAthleteNotMatchError;
//# sourceMappingURL=meters.js.map