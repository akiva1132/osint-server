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
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const http_1 = require("http");
const schema_1 = require("@graphql-tools/schema");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const schema_2 = require("./graphql/schema");
const resolvers_1 = require("./resolvers");
const cors_1 = __importDefault(require("cors"));
// import { getMessageFromKafka, kafka } from "./configurations/kafka";
// import { connectToMongo } from "./configurations/mongo";
const dotenv_1 = __importDefault(require("dotenv"));
const kafka_getData_1 = require("./kafka_getData");
const mongo_1 = require("./configuration/mongo");
const redis_1 = require("./configuration/redis");
const reductionPriority_1 = require("./reductionPriority");
dotenv_1.default.config();
// export const consumer = kafka.consumer({ groupId: "my-group" });
const PORT = process.env.PORT || 4000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = (0, http_1.createServer)(app);
        const wsServer = new ws_1.WebSocketServer({
            server: httpServer,
            path: '/graphql'
        });
        const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: resolvers_1.resolvers });
        const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
        const apolloServer = new server_1.ApolloServer({
            schema,
            plugins: [
                (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
                {
                    serverWillStart() {
                        return __awaiter(this, void 0, void 0, function* () {
                            return {
                                drainServer() {
                                    return __awaiter(this, void 0, void 0, function* () {
                                        yield serverCleanup.dispose();
                                    });
                                },
                            };
                        });
                    },
                },
            ]
        });
        yield apolloServer.start();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use("/graphql", express_1.default.json(), (0, cors_1.default)(), (0, express4_1.expressMiddleware)(apolloServer));
        httpServer.listen(PORT, () => __awaiter(this, void 0, void 0, function* () {
            yield redis_1.client.connect();
            yield (0, mongo_1.connectToMongo)();
            (0, kafka_getData_1.getMessageFromKafka)(["news"]);
            (0, reductionPriority_1.reductionPriority)();
            console.log(`server is listening on port ${PORT}`);
        }));
    });
}
startServer();
