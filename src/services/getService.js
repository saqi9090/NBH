import axios from 'axios';
import { Server } from '../global';
async function getService(req) {
  try {
    const item = await axios.get(`${Server.BASE_URL}` + req);
    return { data: item.data, code: item.status, message: "" };
  } catch (e) {
    if (e.response.data.code == 401) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.data.code == 404) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.data.status == 400) {
      return { data: {}, code: e.response.status, message: e.response.data };
    }
    else {
      return { data: {}, code: e.response.status, message: e.response.data };
    }
  }
}

export { getService };
