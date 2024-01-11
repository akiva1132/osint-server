import { ItemModel } from "./types/mongo";
import { Details, DetailsFromDB, NewsItem } from "./types/types";

export const saveInDB = async (newsItem: NewsItem) => {
    const newItem = new ItemModel(newsItem);
    try {
        const result = await newItem.save();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getFromDB = async (topic: string) => {
    try {
        const result = await ItemModel.find({ topic: topic })
        if (result[0] !== undefined) {
            console.log(result);

            return result[0]
        }
        else {
            return false;

        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
//Type any should be treated
export const updatePriority = async (itemId: string, details: any) => {
    try {
        details.priority += 1
        const update = { $set: { data: details } };
        const item = await ItemModel.updateOne({ _id: itemId }, update);
        console.log("nn" + item);

        return item
    } catch (err) {
        console.error(err);
        throw err;
    }
}