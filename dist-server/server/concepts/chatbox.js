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
exports.PostAuthorNotMatchError = void 0;
const axios_1 = __importDefault(require("axios"));
const openai_1 = __importDefault(require("openai"));
const doc_1 = __importDefault(require("../framework/doc"));
const errors_1 = require("./errors");
const openai = new openai_1.default({
    apiKey: process.env["OPENAI_API_KEY"],
});
class ChatConcept {
    constructor() {
        this.chatboxes = new doc_1.default("chat");
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = yield this.chatboxes.createOne({ user, messages: [] });
            return { msg: "Chatbox successfully created!", post: yield this.chatboxes.readOne({ _id }) };
        });
    }
    getMessages(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.chatboxes.readMany(query, {});
            return messages;
        });
    }
    getByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getMessages({ user }))[0];
        });
    }
    update(user, text, author) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = (yield this.getByUser(user)).messages;
            const message = { author, text };
            messages.push(message);
            yield this.chatboxes.updateOne({ user }, { messages });
            return { msg: "Post successfully updated!" };
        });
    }
    removeLast(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = (yield this.getByUser(user)).messages;
            messages.pop();
            yield this.chatboxes.updateOne({ user }, { messages });
            return { msg: "Post successfully updated!" };
        });
    }
    send(user, text) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.update(user, text, "self");
            yield this.update(user, `This might take up to one minute. We appreciate your patience as we are analazing your
    decision. We are also finding recent news. Please refresh the page after a minute. Because of the deployment restriction, we cannot update the page automatically.`, "ai");
            return { msg: "Message is received" };
        });
    }
    deleteByUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.chatboxes.deleteOne({ user });
            return { msg: "Post deleted successfully!" };
        });
    }
    getResponse(user, prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            const news = yield this.getNews(prompt);
            const response = yield this.generateResponse(prompt, news);
            yield this.removeLast(user);
            yield this.update(user, response, "ai");
            return response;
        });
    }
    getNews(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            let keyword;
            try {
                keyword = yield this.generateKeyWord(prompt);
            }
            catch (e) {
                console.log(e);
            }
            const apiKey = "84e797c15318481497b234586bf54b06";
            const apiUrl = "https://newsapi.org/v2/everything";
            const parameters = {
                q: keyword,
                language: "en",
                apiKey: apiKey,
            };
            const articles = yield axios_1.default.get(apiUrl, { params: parameters }).catch((error) => {
                console.error("Error fetching news:", error);
            });
            const articleContent = articles.data.articles[0].content;
            // for (const article of articles!.data.articles) {
            //   articleContent += "One of the articles is as follows \n";
            //   articleContent += article.content;
            // }
            return articleContent;
        });
    }
    generateKeyWord(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            // prompt to be fed into the chat-gpt-api
            const userPrompt = `I am giving you the following prompt: ${prompt}. This prompt is related to investing and trading.
    Give me exactly one keyword that I can use to search for news article related to this prompt. Please return a keyword without any extra words or characters`;
            const response = yield openai.chat.completions.create({
                model: "gpt-4-1106-preview",
                messages: [
                    { role: "system", content: "You are a helpful assistant and researcher." },
                    { role: "user", content: userPrompt },
                ],
                temperature: 0,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
            });
            const keyword = response.choices[0].message.content;
            return keyword;
        });
    }
    generateResponse(decision, news) {
        return __awaiter(this, void 0, void 0, function* () {
            // prompt to be fed into the chat-gpt-api
            const prompt = `You are a financial analyst analyzing a trading decision, thought, or idea. 
    The idea is to ${decision}. Here is the recent news related to this decision: 
    ${news}. 
    Based on this information, what would be the potential impact on the market?`;
            const response = yield openai.chat.completions.create({
                model: "gpt-4-1106-preview",
                messages: [
                    { role: "system", content: "You are a financial analyst assistant." },
                    { role: "user", content: prompt },
                ],
                temperature: 0.8,
                max_tokens: 150,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
            });
            const message = response.choices[0];
            return message.message.content;
        });
    }
}
exports.default = ChatConcept;
class PostAuthorNotMatchError extends errors_1.NotAllowedError {
    constructor(author, _id) {
        super("{0} is not the author of post {1}!", author, _id);
        this.author = author;
        this._id = _id;
    }
}
exports.PostAuthorNotMatchError = PostAuthorNotMatchError;
//# sourceMappingURL=chatbox.js.map