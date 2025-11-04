import axios from "axios";
import { TUser } from "../components/UsersList/UsersList.types";

const API_URL = "https://jsonplaceholder.typicode.com";

export const fetchUsers = async (): Promise<TUser[]> => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const fetchUserById = async (id: string): Promise<TUser> => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};
