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
        this.meters = new doc_1.default("meters");
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
    getMeterByRower(rower) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield this.meters.readOne({ rower }))) === null || _a === void 0 ? void 0 : _a.meter;
        });
    }
    update(rower, workouts) {
        return __awaiter(this, void 0, void 0, function* () {
            const meter = this.compute(workouts);
            const update = { meter };
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
    compute(workouts) {
        let totalMeter = 0;
        for (const workout of workouts) {
            if (workout.type === "single") {
                totalMeter += workout.meter * 1.5;
            }
            else if (workout.type === "double/pair") {
                totalMeter += workout.meter * 1.25;
            }
            else if (workout.type === "eight") {
                totalMeter += workout.meter * 1;
            }
            else if (workout.type === "erg") {
                totalMeter += workout.meter * 1;
            }
            else if (workout.type === "bikeerg") {
                totalMeter += workout.meter * 0.45;
            }
            else if (workout.type === "cycling") {
                totalMeter += workout.meter * 0.34;
            }
            else if (workout.type === "lift") {
                totalMeter += workout.meter * 5000;
            }
            else if (workout.type === "swimming") {
                totalMeter += workout.meter * 3;
            }
            else if (workout.type === "running") {
                totalMeter += workout.meter * 1.5;
            }
        }
        return totalMeter;
    }
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