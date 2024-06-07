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
exports.MediaCreatorNotMatchError = void 0;
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
class MediaConcept {
    constructor() {
        this.media = new doc_1.default("media");
    }
    create(creator, media_url, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.media.createOne({ creator: creator, media_url: media_url, target: target });
            return { msg: `Media was successfully created!`, media: yield this.media.readOne({ _id }) };
        });
    }
    getMedia(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = yield this.media.readMany(query, {
                sort: { dateUpdated: -1 },
            });
            return media;
        });
    }
    getMediaByCreator(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = yield this.media.readMany({ creator: user });
            // if (media.length === 0) {
            //   throw new NotFoundError(`This user has not uploaded any media`);
            // }
            return media;
        });
    }
    getMediaByTarget(target) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = yield this.media.readMany({ target: target });
            if (media.length === 0) {
                throw new errors_1.NotFoundError(`This target does not have any associated media`);
            }
            return media;
        });
    }
    getMediaById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = yield this.media.readOne({ _id: _id });
            if (media === null) {
                throw new errors_1.NotFoundError(`Media with the id '${_id}' was not found!`);
            }
            return media;
        });
    }
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.media.updateOne({ _id }, update);
            return { msg: "Media successfully updated!" };
        });
    }
    delete(_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.isCreator(_id, user, true);
            yield this.media.deleteOne({ _id });
            return { msg: "Media deleted successfully!" };
        });
    }
    isCreator(_id, user, throw_error = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = yield this.getMediaById(_id);
            const is_creator = media.creator.toString() !== user.toString();
            if (!throw_error)
                return is_creator;
            if (!is_creator)
                throw new MediaCreatorNotMatchError(user, _id);
        });
    }
    isNotCreator(_id, user, throw_error = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const is_not_creator = !this.isCreator(_id, user, false);
            if (!throw_error)
                return is_not_creator;
            if (!is_not_creator)
                throw new errors_1.NotAllowedError("This user is the creator of the media");
        });
    }
}
exports.default = MediaConcept;
class MediaCreatorNotMatchError extends errors_1.NotAllowedError {
    constructor(creator, _id) {
        super("{0} is not the creator of media {1}!", creator, _id);
        this.creator = creator;
        this._id = _id;
    }
}
exports.MediaCreatorNotMatchError = MediaCreatorNotMatchError;
//# sourceMappingURL=media.js.map