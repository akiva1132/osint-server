import { PubSub } from "graphql-subscriptions";
// import { getMessageFromKafka, producer } from "./configurations/kafka";

export const pubsub = new PubSub();


export const resolvers = {
  Query:{
    async atmList() {
      try {
        
        return "list"
      }
      catch (error) {
        throw error
      }

    },
  },
  Mutation: {
    async sendMessage(_: any, args: any) {
      try {
        const messageId = args.id || "000"
        const {userName, password, atmId, amount} = args
        // await WithdrawalConfirmation(userName, password, atmId, amount, messageId)
            return "The request has been sent for processing"
      }
      catch (error) {
        throw error
      }

    },
  },
  Subscription: {
    withdrawal: {
      subscribe: async (_: any, args: any) => {
        const messageId = args.id || "000"
        const {userName, password, coordinates, amount} = args
        // WithdrawalConfirmation(userName, password, coordinates, amount, messageId)
            // return "The request has been sent for processing"
        return pubsub.asyncIterator([args.id])
      }
    }
  }
};