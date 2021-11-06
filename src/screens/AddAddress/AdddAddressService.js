import Axios from "axios";
import { Server } from "../../global";

// export const getAllPosts = () => Axios.get(`${Server.BASE_URL}/posts/latest`);

export const saveAddress = (postData) => Axios.post(`${Server.BASE_URL}/users/addAddress`, postData);
export const getAddress = (addressId) => Axios.get(`${Server.BASE_URL}/users/${addressId}/address`);
export const editAddress = (addressId, postData) => Axios.put(`${Server.BASE_URL}/users/addressId/${addressId}/editAddress`, postData);