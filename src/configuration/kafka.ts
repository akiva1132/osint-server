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

const consumer = kafka.consumer({ groupId: "my-group" });

export const getMessageFromKafka = async (topics: string[]) => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topics, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message, topic }) => {
                try {
                    const messageString = message.value && message.value.toString('utf-8');
                    const kafkaMessage = messageString && JSON.parse(messageString)
                    // console.log(kafkaMessage);
                    
                    saveData(kafkaMessage)
                } catch (error) {
                    console.error("Error processing Kafka message:", error);
                }
            }
        });
    } catch (error) {
        if (error instanceof Error) return Promise.reject(error);
    }
};
