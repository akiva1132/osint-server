import { getFromDB, saveInDB, updatePriority } from "./dal";
import { getAddress } from "./geminiApi";
import { getCoordinates } from "./geocodingApi";
import { Details, NewsItem } from "./types/types";


const delay = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  export const saveData = async (newsItems: NewsItem[]) => {
    for (const newsItem of newsItems) {
        if (typeof newsItem.data === 'string') {
            continue;
        }
        await delay(1200);
        const address = await getAddress(newsItem.data.title)
        const Coordinates = await getCoordinates(address)
        newsItem.data.location = Coordinates
        newsItem.data.priority = 1
        const isExsist = await getFromDB(newsItem.topic)
        if (isExsist) {
            if (isExsist.data?.priority !== undefined)
            await updatePriority(isExsist._id.toString(), isExsist.data)
        }
        else{
            await saveInDB(newsItem)
        }
        // console.log(newsItem);
    }
}

// const locationUpdate = async (details: Details) => {
//     if (typeof details !== 'string') {
        
//         const Coordinates = await getCoordinates(address)
//         details.location = Coordinates
//         return details
//     }
// }


export const redis = (newsItem:NewsItem) => {

}

export const locationAi = () => {

}

