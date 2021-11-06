import axios from "axios";
import { BASE_URL } from "../../global/server";


export const getAllAdvertisementByUserId = (userId) => axios.get(`${BASE_URL}/premiumPost/${userId}`);