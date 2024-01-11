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
exports.getAddress = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GEMINI_KEY = process.env.GEMINI_KEY || "";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_KEY);
const getAddress = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `I now give you a title of news information and you give me back the location of the event if it is indicated in the article. For example: "Clashes in the Gaza area between Israeli forces and Hamas" you must return me only the word Gaza. I would like you to return an additional text besides the name of a place. If there is no name of a place but only an indication of an area such as "Atza HaGalil" or "The North Zone" which are not names of settlements, then give the name of a nearby settlement but still be sure to write only the name The settlement or city without additional text. Be sure to write the name of the settlement or city in Hebrew only. Here is the title of the event:I now give you a title of news information and you give me back the location of the event if it is indicated in the article. For example: "Clashes in the Gaza area between Israeli forces and Hamas" you must return me only the word Gaza. I would like you to return an additional text besides the name of a place. If there is no name of a place but only an indication of an area such as "Atza HaGalil" or "The North Zone" which are not names of settlements, then give the name of a nearby settlement but still be sure to write only the name The location without further text. Be sure to write the name of the location in Hebrew only. Here is the title of the event: `;
    const result = yield model.generateContent(prompt + topic);
    const response = yield result.response;
    const text = response.text();
    return text;
});
exports.getAddress = getAddress;
