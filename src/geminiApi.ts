import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";


dotenv.config();

const GEMINI_KEY = process.env.GEMINI_KEY || ""
// Access your API key as an environment variable (see "Set up your API key" above)

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
export const getAddress = async (topic:string) => {
    
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    
    const prompt = `I now give you a title of news information and you give me back the location of the event if it is indicated in the article. For example: "Clashes in the Gaza area between Israeli forces and Hamas" you must return me only the word Gaza. I would like you to return an additional text besides the name of a place. If there is no name of a place but only an indication of an area such as "Atza HaGalil" or "The North Zone" which are not names of settlements, then give the name of a nearby settlement but still be sure to write only the name The settlement or city without additional text. Be sure to write the name of the settlement or city in Hebrew only. Here is the title of the event:I now give you a title of news information and you give me back the location of the event if it is indicated in the article. For example: "Clashes in the Gaza area between Israeli forces and Hamas" you must return me only the word Gaza. I would like you to return an additional text besides the name of a place. If there is no name of a place but only an indication of an area such as "Atza HaGalil" or "The North Zone" which are not names of settlements, then give the name of a nearby settlement but still be sure to write only the name The location without further text. Be sure to write the name of the location in Hebrew only. Here is the title of the event: `

    const result = await model.generateContent(prompt + topic);
    const response = await result.response;
    const text = response.text();
    return text
  }