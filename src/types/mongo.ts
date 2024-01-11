import mongoose, { Schema, InferSchemaType, Document, Model } from "mongoose";

const ItemSchema = new Schema(
  {
    data: {
      title: { type: String, required: true },
      link: { type: String, required: true },
      snippet: { type: String, required: true },
      date: { type: String, required: true },
      source: { type: String, required: true },
      imageUrl: { type: String, required: true },
      priority: { type: Number, required: true },
      location: {
        name: { type: String, required: false },
        coordinates: { type: Array, required: false }
      }
    },
    topic: { type: String, required: true }
  }
);


type Item = InferSchemaType<typeof ItemSchema>;

export const ItemModel: Model<Item> = mongoose.model<Item>(
  "Item",
  ItemSchema
);
