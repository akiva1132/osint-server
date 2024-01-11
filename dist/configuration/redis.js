"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_HOST = process.env.REDIS_HOST || "";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
const REDIS_PORT = process.env.REDIS_PORT || "";
exports.client = (0, redis_1.createClient)({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: Number(REDIS_PORT),
    },
});
