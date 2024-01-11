"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reductionPriority = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const dal_1 = require("./dal");
const reductionPriority = () => {
    node_cron_1.default.schedule('0 12 * * *', () => {
        console.log("reduction priority in progress");
        (0, dal_1.reductionPriorityInDB)();
    });
    node_cron_1.default.schedule('0 0 * * *', () => {
        console.log("reduction priority in progress");
        (0, dal_1.reductionPriorityInDB)();
    });
};
exports.reductionPriority = reductionPriority;
