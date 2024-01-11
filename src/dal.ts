import { ItemModel } from "./types/mongo";
import { NewsItem } from "./types/types";

export const saveInDB = async (newsItem:NewsItem) => {    
    const newItem = new ItemModel(newsItem);
    try {
      const result = await newItem.save();
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

export const getFromDB = async (topic:string) => {    
    try {
      const result = await ItemModel.find({ topic: topic });
      console.log(result);
      
      if (result) return result
      return false;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

export const updateInDB = async (itemId:string) => {    
    try {
      const item = await ItemModel.findById(itemId);
      return item
    } catch (err) {
      console.error(err);
      throw err;
    }
}