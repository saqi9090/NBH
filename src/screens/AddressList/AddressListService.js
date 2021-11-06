import Axios from "axios";
import { Server } from "../../global";

// export const getAllPosts = () => Axios.get(`${Server.BASE_URL}/posts/latest`);

export const getAddress = (userId) => Axios.get(`${Server.BASE_URL}/users/${userId}/allAddress`);
export const deleteAddress = (addressId) => Axios.delete(`${Server.BASE_URL}/users/addressId/${addressId}/deleteAddress`);
export const editAddress = (addressId, postData) => Axios.put(`${Server.BASE_URL}/users/${addressId}/address`, postData);