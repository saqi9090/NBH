import axios from 'axios';
import { Server } from '../global';


async function PutService(url, body) {
  try {
    const item = await axios.put(`${Server.BASE_URL}` + url, body);
    return { data: item.data, code: item.status, message: "" };
  } catch (e) {
    if (e.response.data.code === 401) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.data.code === 400) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.data.code === 403) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.data.code === 409) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.status === 502) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.status === 504) {
      return { data: {}, code: e.response.status, message: e.response.data };
    } else if (e.response.data.code === 402) {
      return { data: {}, code: e.response.status, message: e.response.data };
    }
    else {
      return { data: {}, code: e.response.status, message: e.response.data };
    }
  }

}

export { PutService };
