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
const errors_1 = require("./errors");
class AssetConcept {
    constructor() {
        this.assets = new doc_1.default("assets");
    }
    create(ticker, owner, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            const pricePurchased = yield this.getCurrentPrice(ticker);
            const _id = yield this.assets.createOne({ ticker, owner, quantity, pricePurchased });
            return { msg: "Asset created successfully!", asset: yield this.getAssetById(_id) };
        });
    }
    sanitizeAsset(asset) {
        // eslint-disable-next-line
        return asset;
    }
    sanitizeAssets(assets) {
        // eslint-disable-next-line
        return assets.map((asset) => this.sanitizeAsset(asset));
    }
    getAssetOwner(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const asset = yield this.assets.readOne({ _id });
            if (asset === null) {
                throw new errors_1.NotFoundError(`Asset not found!`);
            }
            return asset.owner;
        });
    }
    getAssetById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // GETS ASSET BY ITS OBJECTID
            const asset = yield this.assets.readOne({ _id });
            if (asset === null) {
                throw new errors_1.NotFoundError(`Asset not found!`);
            }
            return this.sanitizeAsset(asset);
        });
    }
    getManyAssetsById(Ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const assets = [];
            for (const _id of Ids) {
                const asset = yield this.assets.readOne({ _id });
                assets.push(asset);
            }
            return assets;
        });
    }
    getAssetsByShareholderId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // GETS ALL OF THE ASSETS OWNED BY A USER
            const assets = yield this.assets.readMany({ owner: user_id });
            if (assets.length === 0) {
                throw new errors_1.NotFoundError(`This user is not a shareholder of any assets`);
            }
            return this.sanitizeAssets(assets);
        });
    }
    searchAssetsByTicker(ticker) {
        return __awaiter(this, void 0, void 0, function* () {
            // REGEX SEARCHES FOR ASSET TICKERS THAT MATCH
            const assets = yield this.assets.readMany({ ticker });
            if (assets.length === 0) {
                throw new errors_1.NotFoundError(`This user is not a shareholder of any assets`);
            }
            return this.sanitizeAssets(assets);
        });
    }
    deleteOne(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assets.deleteOne({ _id });
            return { msg: "Asset deleted!" };
        });
    }
    deleteByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.assets.deleteMany({ user });
            return { msg: "User deleted!" };
        });
    }
    getAssetsValue(assets) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = 0;
            for (const assetId of assets) {
                const asset = yield this.assets.readOne({ _id: assetId });
                const quantity = asset.quantity;
                const price = yield this.getCurrentPrice(asset.ticker);
                value += quantity * price;
            }
            return value;
        });
    }
    getCurrentPrice(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_KEY = "KZHRUF576K9VJM0S";
            const BASE_URL = "https://www.alphavantage.co/";
            const response = yield axios_1.default.get(`${BASE_URL}query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
            const data = yield response.data;
            const currentPrice = yield data["Global Quote"]["05. price"];
            return currentPrice;
        });
    }
    getHistory(symbol, timeSeries) {
        return __awaiter(this, void 0, void 0, function* () {
            const API_KEY = "KZHRUF576K9VJM0S";
            const BASE_URL = "https://www.alphavantage.co/";
            let response;
            let dates;
            let prices;
            if (timeSeries === "24hours") {
                response = yield axios_1.default.get(`${BASE_URL}query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=30min&outputsize=compact&apikey=${API_KEY}`);
                const data = yield response.data;
                const currentPrice = yield data["Time Series (30min)"];
                dates = Object.keys(currentPrice).reverse();
                prices = dates.map((date) => parseFloat(currentPrice[date]["4. close"]));
            }
            else if (timeSeries === "daily") {
                response = yield axios_1.default.get(`${BASE_URL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`);
                const data = yield response.data;
                const currentPrice = yield data["Time Series (Daily)"];
                dates = Object.keys(currentPrice).reverse();
                prices = dates.map((date) => parseFloat(currentPrice[date]["4. close"]));
            }
            else {
                response = yield axios_1.default.get(`${BASE_URL}query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`);
                const data = yield response.data;
                const currentPrice = yield data["Monthly Time Series"];
                dates = Object.keys(currentPrice).reverse();
                prices = dates.map((date) => parseFloat(currentPrice[date]["4. close"]));
            }
            return { dates, prices };
        });
    }
}
exports.default = AssetConcept;
//# sourceMappingURL=asset.js.map