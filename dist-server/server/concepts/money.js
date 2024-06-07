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
class MoneyConcept {
    constructor() {
        this.accounts = new doc_1.default("money");
    }
    /**
     * Adds a user to the database with given balance
     * @param user the id of the user associated with this account
     * @param newBalance (optional) the balance of the user
     * @returns a message that the account was created successfully and the doc associated with the user
     * @throws error if this user already has an account
     */
    create(user, newBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userExists(user)) {
                throw new errors_1.NotAllowedError("Cannot create multiple accounts for one user");
            }
            const balance = newBalance === undefined ? 0 : newBalance; // balance is 0 if previously undefined
            const _id = yield this.accounts.createOne({ user, balance });
            return { msg: "User created successfully!", user: yield this.accounts.readOne({ _id }) };
        });
    }
    /**
     * Finds the balance of a given user
     * @param _id the id of this account or the id of the user associated with this account
     * @returns the balance of the user with this id
     * @throws error if no such id exists in the database
     */
    getBalance(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accounts.readOne({ user });
            const balance = account === null ? 0 : account.balance;
            return balance;
        });
    }
    /**
     * Updates the balance of a given user
     * @param _id the id of this account or the id of the user associated with this account
     * @param newBalance the balance of the user that will be set
     */
    setBalance(_id, newBalance) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.userExists(_id)) {
                throw new errors_1.NotFoundError(`User not found!`);
            }
            const filter = { user: _id };
            const update = { balance: newBalance };
            yield this.accounts.updateOne(filter, update);
        });
    }
    /**
     * Increases the balance of an account by a given number
     * @param _id the id of this account or the id of the user associated with this account
     * @param amount the quantity of money that will be added to the account
     * @returns the updated balance of the account
     */
    deposit(_id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount < 0) {
                throw new errors_1.NotAllowedError("Cannot deposit a negative quantity");
            }
            let balance = yield this.getBalance(_id);
            balance += amount;
            yield this.setBalance(_id, balance);
            return balance;
        });
    }
    /**
     * Decreases the balance of an account by a given number
     * @param _id the id of this account or the id of the user associated with this account
     * @param amount the quantity of money that will be subtracted to the account
     * @returns the updated balance of the account
     */
    withdraw(_id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (amount < 0) {
                throw new errors_1.NotAllowedError("Cannot withdraw a negative quantity");
            }
            let balance = yield this.getBalance(_id);
            if (balance < amount) {
                throw new errors_1.NotAllowedError("Cannot overdraw from account");
            }
            balance -= amount;
            yield this.setBalance(_id, balance);
            return balance;
        });
    }
    hasEnough(user, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.getBalance(user);
            return balance >= amount;
        });
    }
    /**
     * Finds the user associated with a given account
     * @param _id the id of the given doc
     * @returns the ObjectId of the user or undefined if this id does not exist
     */
    accountIdToUserId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accounts.readOne({ _id });
            return account === null || account === void 0 ? void 0 : account.user;
        });
    }
    /**
     * Finds the id of the account associated with the given user
     * @param user the id of the user associated with this accound
     * @returns the ObjectId of the account or undefined if this user does not exist
     */
    userIdToAccountId(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accounts.readOne({ user });
            return account === null || account === void 0 ? void 0 : account._id;
        });
    }
    /**
     * Finds all user ids associated with given account ids
     * @param ids the ids of the requested users
     * @returns an array of the user ids or strings if a user does not exist
     */
    accountIdsToUserIds(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield this.accounts.readMany({ _id: { $in: ids } });
            // Store strings in Map because ObjectId comparison by reference is wrong
            const idToUser = new Map(accounts.map((account) => [account._id.toString(), account.user]));
            return ids.map((id) => { var _a; return (_a = idToUser.get(id.toString())) !== null && _a !== void 0 ? _a : "NO SUCH USER"; });
        });
    }
    /**
     * Deletes a user from the database
     * @param _id the id of an account or user associated with the account
     * @returns a message if the deletion was successful
     */
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.accounts.deleteOne({ _id });
            return { msg: "Account deleted!" };
        });
    }
    /**
     * Checks if there is account with this id or user in the database
     * @param _id the id of an account or user associated with the account
     * @returns true if and only if the user exists in the database
     */
    userExists(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const maybeAccount = yield this.accounts.readOne({ _id });
            return maybeAccount !== null;
        });
    }
}
exports.default = MoneyConcept;
//# sourceMappingURL=money.js.map