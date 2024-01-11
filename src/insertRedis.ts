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