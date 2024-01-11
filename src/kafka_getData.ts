import { consumer } from "./configuration/kafka";
import { saveData } from "./processNewsItems";


export const getMessageFromKafka = async (topics: string[]) => {
    try {
        await consumer.connect();
        await consumer.subscribe({ topics, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ message, topic }) => {
                try {
                    const messageString = message.value && message.value.toString('utf-8');
                    const kafkaMessage = messageString && JSON.parse(messageString)
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
