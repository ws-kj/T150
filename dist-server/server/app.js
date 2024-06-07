"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = exports.Workout = exports.WebSession = exports.User = void 0;
const user_1 = __importDefault(require("./concepts/user"));
const websession_1 = __importDefault(require("./concepts/websession"));
const workout_1 = __importDefault(require("./concepts/workout"));
const records_1 = __importDefault(require("./concepts/records"));
// App Definition using concepts
exports.User = new user_1.default();
exports.WebSession = new websession_1.default();
exports.Workout = new workout_1.default();
exports.Record = new records_1.default();
//# sourceMappingURL=app.js.map