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
exports.resolvers = exports.pubsub = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const dal_Redis_1 = require("./dal_Redis");
// import { getMessageFromKafka, producer } from "./configurations/kafka";
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Query: {
        itemsNews() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const itemsNews = yield (0, dal_Redis_1.getItemsFromRedis)();
                    return itemsNews;
                }
                catch (error) {
                    throw error;
                }
            });
        },
    },
    Mutation: {
        sendMessage(_, args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const messageId = args.id || "000";
                    const { userName, password, atmId, amount } = args;
                    // await WithdrawalConfirmation(userName, password, atmId, amount, messageId)
                    return "The request has been sent for processing";
                }
                catch (error) {
                    throw error;
                }
            });
        },
    },
    Subscription: {
        withdrawal: {
            subscribe: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
                const messageId = args.id || "000";
                const { userName, password, coordinates, amount } = args;
                // WithdrawalConfirmation(userName, password, coordinates, amount, messageId)
                // return "The request has been sent for processing"
                return exports.pubsub.asyncIterator([args.id]);
            })
        }
    }
};
