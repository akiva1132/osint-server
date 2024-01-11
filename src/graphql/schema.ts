export const typeDefs = `
type Query {
  itemsNews:[ [ItemsNew]]
  }

  type ItemsNew {
    link: String
      priority: Int
      snippet: String
      title: String
      date: String
      imageUrl: String
      location: Location
      source: String
      topic: String
  }

  
  type Location {
      name: String
      coordinates: [Int]
  }

  type Mutation{
    sendMessage(id: String, userName: String, password: String, coordinates: String, amount:Int): String
  }

type Subscription {
  withdrawal(id: String, userName: String, password: String, coordinates: String , amount:Int):String
}


`