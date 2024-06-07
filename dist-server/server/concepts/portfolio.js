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
class PortfolioConcept {
    constructor() {
        this.portfolios = new doc_1.default("portfolios");
    }
    create(name, owner, username, isPublic) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.canCreate(name, owner);
            const shares = [];
            const _id = yield this.portfolios.createOne({ name, owner, username, isPublic, shares });
            return { msg: "Portfolio created successfully!", asset: yield this.getPortfolioById(_id) };
        });
    }
    getPortfolios(query, sort) {
        return __awaiter(this, void 0, void 0, function* () {
            let portfolios;
            if (sort) {
                portfolios = yield this.portfolios.readMany(query, sort);
            }
            else {
                portfolios = yield this.portfolios.readMany(query, {
                    sort: { dateUpdated: -1 },
                });
            }
            return portfolios;
        });
    }
    getOnePortfolioByUser(owner, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getPortfolios({ owner, name });
        });
    }
    getPortfoliosByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getPortfolios({ owner });
        });
    }
    getViewablePortfoliosByOwner(owner, viewer) {
        return __awaiter(this, void 0, void 0, function* () {
            if (viewer.equals(owner)) {
                return yield this.getPortfoliosByOwner(owner);
            }
            return yield this.getPortfolios({ owner: owner, isPublic: true });
        });
    }
    portfolioIsPublic(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.portfolios.readOne({ _id });
            if (portfolio) {
                return portfolio.isPublic;
            }
            else {
                throw new errors_1.NotFoundError(`Portfolio not found!`);
            }
        });
    }
    getPortfolioOwner(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.portfolios.readOne({ _id });
            if (portfolio) {
                return portfolio.owner;
            }
            else {
                throw new errors_1.NotFoundError(`Portfolio not found!`);
            }
        });
    }
    getPortfolioShares(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.portfolios.readOne({ _id });
            if (portfolio) {
                return portfolio.shares;
            }
            else {
                throw new errors_1.NotFoundError(`Portfolio not found!`);
            }
        });
    }
    getPortfolioById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.portfolios.readOne({ _id });
            if (portfolio === null) {
                throw new errors_1.NotFoundError(`Portfolio not found!`);
            }
            return portfolio;
        });
    }
    getPortfolioByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.getPortfolios({ name });
            if (portfolio === null) {
                throw new errors_1.NotFoundError(`Portfolio not found!`);
            }
            return portfolio[0];
        });
    }
    getAssets(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.getPortfolioById(_id);
            return portfolio.shares;
        });
    }
    getUserAssets(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolios = yield this.portfolios.readMany({ owner: user });
            const assets = [];
            for (const portfolio of portfolios) {
                for (const asset of portfolio.shares) {
                    assets.push(asset);
                }
            }
            return assets;
        });
    }
    addAssetToPortfolio(owner, name, asset) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = (yield this.portfolios.readMany({ owner, name }))[0];
            const shares = portfolio.shares;
            shares.push(asset);
            yield this.update(portfolio._id, { shares });
            return { msg: `Successfully added share '${asset}' to portfolio '${portfolio.name}'` };
        });
    }
    removeAssetFromPortfolio(portfolioId, assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            const portfolio = yield this.portfolios.readOne({ _id: portfolioId });
            let shares = portfolio.shares;
            shares = shares.filter((element) => element.toString() !== assetId);
            yield this.portfolios.updateOne({ _id: portfolioId }, { shares });
            return { msg: `Successfully removed share` };
        });
    }
    update(_id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.portfolios.updateOne({ _id }, update);
            return { msg: "Portfolio updated successfully!" };
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.portfolios.deleteOne({ _id });
            return { msg: "Portfolio deleted!" };
        });
    }
    deleteByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.portfolios.deleteMany({ user });
            return { msg: "User deleted!" };
        });
    }
    portfolioIdExists(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybePortfolio = yield this.portfolios.readOne({ _id });
            return maybePortfolio === null;
        });
    }
    portfolioNameExists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybePortfolio = yield this.portfolios.readOne({ name });
            return maybePortfolio !== null;
        });
    }
    canCreate(name, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name) {
                throw new errors_1.BadValuesError("Cannot create portfolio with empty name");
            }
            if (!owner) {
                throw new errors_1.BadValuesError("Cannot create portfolio without an owner");
            }
            if ((yield this.portfolios.readOne({ name, owner })) !== null) {
                throw new errors_1.NotAllowedError(`A portfolio with name ${name} owned by ${owner} already exists`);
            }
            return true;
        });
    }
}
exports.default = PortfolioConcept;
//# sourceMappingURL=portfolio.js.map