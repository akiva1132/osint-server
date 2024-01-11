"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinates = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GEOCODING_API = process.env.GEOCODING_API || "";
const getCoordinates = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://geocode.maps.co/search?q=${address}&api_key=${GEOCODING_API}`)
        .then(result => result.json())
        .then(data => {
        if (!data || data.length === 0 || !data[0]) {
            return { name: "Unknown" };
        }
        return {
            name: address,
            coordinates: [data[0].lat, data[0].lon]
        };
    })
        .catch(error => { return { name: "Unknown" }; });
    return data;
});
exports.getCoordinates = getCoordinates;