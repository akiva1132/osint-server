import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./resolvers";
import cors from "cors";
// import { getMessageFromKafka, kafka } from "./configurations/kafka";
// import { connectToMongo } from "./configurations/mongo";
import dotenv from "dotenv";
import { getMessageFromKafka } from "./configuration/kafka";
import { connectToMongo } from "./configuration/mongo";


dotenv.config();

// export const consumer = kafka.consumer({ groupId: "my-group" });
const PORT = process.env.PORT || 4000;

async function startServer() {
    const app = express();
    const httpServer = createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);

    const apolloServer = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ]
    });
    await apolloServer.start();
    app.use(express.json())
    app.use(cors())
    app.use("/graphql", express.json(), cors(), expressMiddleware(apolloServer));

    httpServer.listen(PORT, async () => {
        // connectPostGres()
        connectToMongo()
        getMessageFromKafka(["news"])
        console.log(`server is listening on port ${PORT}`);
    });
}

startServer();