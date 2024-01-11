import { getFromDB, saveInDB, updatePriority } from "./dal";
import { getAddress } from "./geminiApi";
import { getCoordinates } from "./geocodingApi";
import { updateRedis } from "./insertRedis";
import { NewsItem } from "./types/types";


const delay = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  export const saveData = async (newsItems: NewsItem[]) => {
    for (const newsItem of newsItems) {
        if (newsItem.data) {
            continue;
        }
        await delay(1200);
        const address = await getAddress(newsItem.title)
        const Coordinates = await getCoordinates(address)
        newsItem.location = Coordinates
        newsItem.priority = 1
        const isExsist = await getFromDB(newsItem.link)
        if (isExsist) {
            await updatePriority(isExsist._id.toString(), isExsist.priority + 1)
        }
        else{
            await saveInDB(newsItem)
        }
    }
    updateRedis()
}

