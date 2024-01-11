import { Kafka, Partitioners, logLevel } from 'kafkajs';
import chalk from 'chalk';
import dotenv from "dotenv";
import { pubsub } from '../resolvers';
import { saveData } from '../processNewsItems';

dotenv.config();

const KAFKA_HOST = process.env.KAFKA_HOST || ""
const KAFKA_USERNAME = process.env.KAFKA_USERNAME || ""
const KAFKA_PASS = process.env.KAFKA_PASS || ""


export const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [KAFKA_HOST],
    ssl: true,
    sasl: {
        mechanism: 'scram-sha-256',
        username: KAFKA_USERNAME,
        password: KAFKA_PASS
    },
    logLevel: logLevel.ERROR,
});

export const consumer = kafka.consumer({ groupId: "my-group" });

