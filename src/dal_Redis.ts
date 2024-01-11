import { client } from "./configuration/redis"
import { getItemsWithPriorityGreaterThanZero } from "./dal"
import { NewsItem } from "./types/types"




export const updateRedis = async () => {
    try {
        const newsItems = await getItemsWithPriorityGreaterThanZero()
        client.flushAll()
        newsItems.forEach(async (newsItem: any) => {            
            await client.json.set(`${newsItem._id.toString()}`, `$`, {
                link: newsItem.link,
                date: newsItem.date,
                title: newsItem.title,
                snippet: newsItem.snippet,
                source: newsItem.source,
                imageUrl: newsItem.imageUrl,
                priority: newsItem.priority,
                location: newsItem.location,
                topic: newsItem.topic
            })
        })
    }
    catch (error) {
        throw error
    }
}

export const getItemsFromRedis = async () => {
    try {
        const newsItems = await getItemsWithPriorityGreaterThanZero();
        const keys = await client.keys('*')

        const values = await client.json.mGet(keys, '$');
        console.log(values);
        return values
        
        // for (let i = 0; i < keys.length; i++) {
        //     const key = keys[i];
        //     const value = JSON.parse(values[i]); // אני מניח שהערכים ב-Redis הם JSON

        //     // כעת אתה יכול לעבוד עם המפתח key והערך value
        //     console.log(`Key: ${key}, Value:`, value);
        // }

    } catch (error) {
        throw error;
    }
}
