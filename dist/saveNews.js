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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = exports.locationAi = exports.redis = exports.saveData = void 0;
const geminiApi_1 = require("./geminiApi");
const geocodingApi_1 = require("./geocodingApi");
const saveData = (newsUpdate) => {
    newsUpdate.forEach((newsItem) => __awaiter(void 0, void 0, void 0, function* () {
        const newObject = locationUpdate(newsItem.$.title);
        console.log(newObject);
    }));
};
exports.saveData = saveData;
const locationUpdate = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const address = yield (0, geminiApi_1.getAddress)(title);
    const Coordinates = yield (0, geocodingApi_1.getCoordinates)(address);
});
const redis = () => {
};
exports.redis = redis;
const locationAi = () => {
};
exports.locationAi = locationAi;
const mongo = () => {
};
exports.mongo = mongo;
