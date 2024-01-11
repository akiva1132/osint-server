import { ItemModel } from "./types/mongo";
import { NewsItem } from "./types/types";

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

export const getFromDB = async (link: string) => {
    try {
        const result = await ItemModel.find({ link: link })
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


export const getItemsWithPriorityGreaterThanZero = async () => {
    try {
        const result = await ItemModel.find({ priority: { $gt: 0 } }) as any;
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

//Type any should be treated
export const updatePriority = async (itemId: string, inceryBy:number) => {
    try {
        const update = { $set: { priority: inceryBy } };
        const item = await ItemModel.updateOne({ _id: itemId }, update);
        return item
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const reductionPriorityInDB = async () => {
    try {
        const update = { $inc: { priority: -30 } };
        const item = await ItemModel.updateMany(update);
        return item;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
