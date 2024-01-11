import dotenv from "dotenv";


dotenv.config();

const GEOCODING_API = process.env.GEOCODING_API || ""

export const getCoordinates = async (address: string) => {
    const data = await fetch(`https://geocode.maps.co/search?q=${address}&api_key=${GEOCODING_API}`)
        .then(result => result.json())
        .then(data => {
            if (!data || data.length === 0 || !data[0] || address === "לא ידוע" ||
                address === "צפון" || address === "דרום") {
                return {
                    name: "Unknown",
                    coordinates: [0, 0]
                };
            }
            return {
                name: address,
                coordinates: [data[0].lat as number, data[0].lon as number]
            }
        }
        )
        .catch(error => {
            return {
                name: "Unknown",
                coordinates: [0, 0]
            }
        }
        )

    return data
}