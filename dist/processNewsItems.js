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
exports.saveData = void 0;
const dal_1 = require("./dal");
const geminiApi_1 = require("./geminiApi");
const geocodingApi_1 = require("./geocodingApi");
const dal_Redis_1 = require("./dal_Redis");
const delay = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};
const saveData = (newsItems) => __awaiter(void 0, void 0, void 0, function* () {
    for (const newsItem of newsItems) {
        if (newsItem.data) {
            continue;
        }
        yield delay(1200);
        const address = yield (0, geminiApi_1.getAddress)(newsItem.title);
        const Coordinates = yield (0, geocodingApi_1.getCoordinates)(address);
        newsItem.location = Coordinates;
        newsItem.priority = 1;
        const isExsist = yield (0, dal_1.getFromDB)(newsItem.link);
        if (isExsist) {
            yield (0, dal_1.updatePriority)(isExsist._id.toString(), isExsist.priority + 1);
        }
        else {
            yield (0, dal_1.saveInDB)(newsItem);
        }
    }
    (0, dal_Redis_1.updateRedis)();
});
exports.saveData = saveData;
