import axios from "axios";
import { Server } from "../../global";

export const getTodayAd = () => axios.get(`${Server.BASE_URL}/premiumPost/todaysPost`)