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
    }
    addOrUpdate(rower, type, date, pr) {
        return __awaiter(this, void 0, void 0, function* () {
            const oldPR = yield this.prs.readOne({ rower, type });
            if (oldPR === null) {
                const _id = yield this.prs.createOne({ rower, type, date, pr });
                return { msg: "PR successfully submitted!", pr: yield this.prs.readOne({ _id }) };
            }
            else {
                yield this.prs.updateOne({ _id: oldPR._id }, { date, pr });
                return { msg: "PR successfully updated!" };
            }
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
            if (type === "maxBenchPress" || type === "maxSquat") {
                return yield this.prs.readMany({ type }, { sort: { pr: -1 } });
            }
            else {
                return yield this.prs.readMany({ type }, { sort: { pr: 1 } });
            }
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
    existsPR(rower, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.prs.readMany({ rower, type });
            if (results === null) {
                return false;
            }
            else {
                return true;
            }
        });
    }
}
exports.default = PRConcept;
//# sourceMappingURL=prs.js.map