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
exports.updatePriority = exports.getFromDB = exports.saveInDB = void 0;
const mongo_1 = require("./types/mongo");
const saveInDB = (newsItem) => __awaiter(void 0, void 0, void 0, function* () {
    const newItem = new mongo_1.ItemModel(newsItem);
    try {
        const result = yield newItem.save();
        return result;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.saveInDB = saveInDB;
const getFromDB = (topic) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield mongo_1.ItemModel.find({ topic: topic });
        if (result[0] !== undefined) {
            console.log(result);
            return result[0];
        }
        else {
            return false;
        }
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.getFromDB = getFromDB;
//Type any should be treated
const updatePriority = (itemId, details) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        details.priority += 1;
        const update = { $set: { data: details } };
        const item = yield mongo_1.ItemModel.updateOne({ _id: itemId }, update);
        console.log("nn" + item);
        return item;
    }
    catch (err) {
        console.error(err);
        throw err;
    }
});
exports.updatePriority = updatePriority;
