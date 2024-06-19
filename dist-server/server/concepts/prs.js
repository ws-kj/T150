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
class PRConcept {
    constructor() {
        this.prs = new doc_1.default("prs");
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
    create(rower, type, pr) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.prs.createOne({ rower, type, pr });
            return { msg: "PR successfully submitted!", pr: yield this.prs.readOne({ _id }) };
        });
    }
    getPRById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const pr = yield this.prs.readOne({ _id });
            if (pr === null) {
                throw new errors_1.NotFoundError(`PR not found!`);
            }
            return pr;
        });
    }
    getPRs(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const prs = yield this.prs.readMany(query, {
                sort: { pr: -1 },
            });
            return prs;
        });
    }
    getByRower(rower) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("here");
            console.log(rower);
            const pr = yield this.prs.readMany({ rower });
            console.log(pr);
            if (pr === null) {
                throw new errors_1.NotFoundError(`Rower not found!`);
            }
            return pr;
        });
    }
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prs.updateOne({ _id }, update);
            return { msg: "PR successfully updated!" };
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prs.deleteOne({ _id });
            return { msg: "PR deleted successfully!" };
        });
    }
    deleteByRower(rower) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prs.deleteMany({ rower });
            return { msg: `PRs deleted successfully!` };
        });
    }
}
exports.default = PRConcept;
class WorkoutAthleteNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of post {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.WorkoutAthleteNotMatchError = WorkoutAthleteNotMatchError;
//# sourceMappingURL=prs.js.map