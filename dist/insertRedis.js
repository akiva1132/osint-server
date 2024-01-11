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
exports.updateRedis = void 0;
const redis_1 = require("./configuration/redis");
const dal_1 = require("./dal");
const updateRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newsItems = yield (0, dal_1.getItemsWithPriorityGreaterThanZero)();
        redis_1.client.flushAll();
        newsItems.forEach((newsItem) => __awaiter(void 0, void 0, void 0, function* () {
            yield redis_1.client.json.set(`${newsItem._id.toString()}`, `$`, {
                link: newsItem.link,
                date: newsItem.date,
                title: newsItem.title,
                snippet: newsItem.snippet,
                source: newsItem.source,
                imageUrl: newsItem.imageUrl,
                priority: newsItem.priority,
                location: newsItem.location,
                topic: newsItem.topic
            });
        }));
    }
    catch (error) {
        throw error;
    }
});
exports.updateRedis = updateRedis;
