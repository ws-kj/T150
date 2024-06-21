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
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class PRConcept {
    constructor() {
        this.prs = new doc_1.default("prs");
        // // Helper function to map PRs to proper formats
        // private mapPRs(prs: PRDoc[]): PRDoc[] {
        //   return prs.map((pr) => {
        //     if (pr.type === "maxBenchPress" || pr.type === "maxSquat") {
        //       // Keep weight as is
        //     } else {
        //       // Convert seconds to HH:MM:SS format
        //       pr.pr = this.secondsToHHMMSS(pr.pr);
        //     }
        //     return pr;
        //   });
        // }
    }
    create(rower, type, pr) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.prs.createOne({ rower, type, pr: this.parsePR(pr) });
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
    getPRsByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const prs = yield this.prs.readMany({ type }, { sort: { pr: -1 } });
            return prs;
        });
    }
    getByRower(rower) {
        return __awaiter(this, void 0, void 0, function* () {
            const pr = yield this.prs.readMany({ rower });
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
    // Helper function to compare PR values
    comparePRs(pr1, pr2) {
        const pr1Value = this.parsePR(pr1);
        const pr2Value = this.parsePR(pr2);
        if (pr1Value !== null && pr2Value !== null) {
            return pr1Value - pr2Value;
        }
        return pr1.localeCompare(pr2);
    }
    // Helper function to parse PR values
    parsePR(pr) {
        if (/^\d{1,2}:\d{2}$/.test(pr)) {
            // MM:SS format
            const [minutes, seconds] = pr.split(":").map(Number);
            return minutes * 60 + seconds;
        }
        else if (/^\d{1,2}:\d{2}:\d{2}$/.test(pr)) {
            // HH:MM:SS format
            const [hours, minutes, seconds] = pr.split(":").map(Number);
            return hours * 3600 + minutes * 60 + seconds;
        }
        else if (/^\d+(\.\d+)?$/.test(pr)) {
            // Weight format
            return parseFloat(pr);
        }
        else {
            return 0;
        }
    }
    // Helper function to convert seconds to HH:MM:SS format
    secondsToHHMMSS(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
}
exports.default = PRConcept;
//# sourceMappingURL=prs.js.map