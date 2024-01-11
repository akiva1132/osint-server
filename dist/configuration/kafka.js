"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const KAFKA_HOST = process.env.KAFKA_HOST || "";
const KAFKA_USERNAME = process.env.KAFKA_USERNAME || "";
const KAFKA_PASS = process.env.KAFKA_PASS || "";
exports.kafka = new kafkajs_1.Kafka({
    clientId: 'my-app',
    brokers: [KAFKA_HOST],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: KAFKA_USERNAME,
        password: KAFKA_PASS
    },
    logLevel: kafkajs_1.logLevel.ERROR,
});
exports.consumer = exports.kafka.consumer({ groupId: "my-group" });
