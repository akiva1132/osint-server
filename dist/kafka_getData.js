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
exports.getMessageFromKafka = void 0;
const kafka_1 = require("./configuration/kafka");
const processNewsItems_1 = require("./processNewsItems");
const getMessageFromKafka = (topics) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield kafka_1.consumer.connect();
        yield kafka_1.consumer.subscribe({ topics, fromBeginning: true });
        yield kafka_1.consumer.run({
            eachMessage: ({ message, topic }) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const messageString = message.value && message.value.toString('utf-8');
                    const kafkaMessage = messageString && JSON.parse(messageString);
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
