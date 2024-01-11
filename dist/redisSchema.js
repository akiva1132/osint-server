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
exports.connectToRedis = void 0;
const redis_1 = require("redis");
const redis_2 = require("./configuration/redis");
const schema = {
    '$.country': {
        type: redis_1.SchemaFieldTypes.TEXT,
        SORTABLE: true,
        AS: 'country'
    },
    '$.area': {
        type: redis_1.SchemaFieldTypes.TEXT,
        SORTABLE: true,
        AS: 'area'
    },
    '$.rounds': {
        type: redis_1.SchemaFieldTypes.NUMERIC,
        SORTABLE: true,
        AS: 'rounds'
    },
    '$.missileAmount': {
        type: redis_1.SchemaFieldTypes.NUMERIC,
        AS: 'missileAmount'
    },
    '$.creationTime': {
        type: redis_1.SchemaFieldTypes.NUMERIC,
        AS: 'creationTime'
    },
    '$.lastUpdateTime': {
        type: redis_1.SchemaFieldTypes.NUMERIC,
        AS: 'lastUpdateTime'
    },
};
const connectToRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    redis_2.client.connect();
    try {
        yield redis_2.client.ft.create('idx:countryes-test3', schema, {
            ON: 'JSON',
            PREFIX: 'countryes-test3:'
        });
    }
    catch (e) {
        if (e instanceof Error && e.message === 'Index already exists') {
            console.log('Index exists already, skipped creation.');
        }
        else {
            console.error(e);
        }
    }
    return redis_2.client;
});
exports.connectToRedis = connectToRedis;
