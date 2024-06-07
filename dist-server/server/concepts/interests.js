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
const axios_1 = __importDefault(require("axios"));
const doc_1 = __importDefault(require("../framework/doc"));
class InterestConcept {
    constructor() {
        this.tags = new doc_1.default("tags");
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.tags.createOne({ user, interests: [] });
            return { msg: "Interests successfully created!", tag: yield this.tags.readOne({ _id }) };
        });
    }
    getInterests(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const tags = yield this.tags.readMany(query);
            return tags;
        });
    }
    getByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getInterests({ user }))[0];
        });
    }
    update(user, interests) {
        return __awaiter(this, void 0, void 0, function* () {
            // const interests = (await this.getByUser(user)).interests;
            // interests.push(interest);
            yield this.tags.updateOne({ user }, { interests });
            return { msg: "Interests successfully updated!" };
        });
    }
    removeTag(user, interestToRemove) {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = (yield this.getByUser(user)).interests.filter((interest) => {
                return interest !== interestToRemove;
            });
            yield this.tags.updateOne({ user }, { interests });
            return { msg: "Interest successfully removed!" };
        });
    }
    delete(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tags.deleteOne({ user: user });
            return { msg: "Interest deleted successfully!" };
        });
    }
    getNews(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = (yield this.getByUser(user)).interests;
            const q = interests.join(",");
            const API_KEY = "KZHRUF576K9VJM0S";
            const BASE_URL = "https://www.alphavantage.co/";
            const response = yield axios_1.default.get(`${BASE_URL}query?function=NEWS_SENTIMENT&tickers=${q}&time_from=20220410T0130&limit=1000&sort=LATEST&apikey=${API_KEY}`);
            const data = yield response.data;
            return yield data["feed"];
        });
    }
}
exports.default = InterestConcept;
//# sourceMappingURL=interests.js.map