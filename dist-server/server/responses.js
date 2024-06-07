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
Object.defineProperty(exports, "__esModule", { value: true });
// import { ObjectId } from "mongodb";
const app_1 = require("./app");
const workout_1 = require("./concepts/workout");
const router_1 = require("./framework/router");
/**
 * This class does useful conversions for the frontend.
 * For example, it converts a {@link PostDoc} into a more readable format for the frontend.
 */
class Responses {
    /**
     * Convert WorkoutDoc into more readable format for the frontend by converting the athlete id into a username.
     */
    static workout(workout) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!workout) {
                return workout;
            }
            const athelte = yield app_1.User.getUserById(workout.athlete);
            return Object.assign(Object.assign({}, workout), { athlete: athelte.username });
        });
    }
    /**
     * Same as {@link post} but for an array of PostDoc for improved performance.
     */
    static workouts(workouts) {
        return __awaiter(this, void 0, void 0, function* () {
            const athletes = yield app_1.User.idsToUsernames(workouts.map((workout) => workout.athlete));
            return workouts.map((workout, i) => (Object.assign(Object.assign({}, workout), { athlete: athletes[i] })));
        });
    }
}
exports.default = Responses;
router_1.Router.registerError(workout_1.WorkoutAthleteNotMatchError, (e) => __awaiter(void 0, void 0, void 0, function* () {
    const username = (yield app_1.User.getUserById(e.author)).username;
    return e.formatWith(username, e._id);
}));
//# sourceMappingURL=responses.js.map