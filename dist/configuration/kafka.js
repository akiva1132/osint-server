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
exports.getMessageFromKafka = exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const dotenv_1 = __importDefault(require("dotenv"));
const processNewsItems_1 = require("../processNewsItems");
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
const consumer = exports.kafka.consumer({ groupId: "my-group" });
const getMessageFromKafka = (topics) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield consumer.connect();
        yield consumer.subscribe({ topics, fromBeginning: true });
        yield consumer.run({
            eachMessage: ({ message, topic }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const messageString = message.value && message.value.toString('utf-8');
                    const kafkaMessage = messageString && JSON.parse(messageString);
                    // console.log(kafkaMessage);
                    (0, processNewsItems_1.saveData)(kafkaMessage);
                }
                catch (error) {
                    console.error("Error processing Kafka message:", error);
                }
            })
        });
    }
    catch (error) {
        if (error instanceof Error)
            return Promise.reject(error);
    }
});
exports.getMessageFromKafka = getMessageFromKafka;
