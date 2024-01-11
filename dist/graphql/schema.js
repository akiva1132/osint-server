"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
type Query {
   atmList: String
  }
  type Atm {
    id:String
    address: String
  }

  type Mutation{
    sendMessage(id: String, userName: String, password: String, coordinates: String, amount:Int): String
  }

type Subscription {
  withdrawal(id: String, userName: String, password: String, coordinates: String , amount:Int):String
}


`;
