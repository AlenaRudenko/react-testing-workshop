import axios from "axios";
import { TUser } from "../components/UsersList/UsersList.types";

export const API_URL = "https://jsonplaceholder.typicode.com";

/**
 * Получение списка пользователей jsonplaceholder.
 *
 * @returns {Promise<TUser[] | []>} Возвращает массив пользователей
 * или пустой массив если произошла ошибка.
 */
export const fetchUsers = async (): Promise<TUser[] | []> => {
  try {
    const { data } = await axios.get<TUser[]>(`${API_URL}/users`);

    return data;
  } catch (e) {
    console.error(e);

    return [];
  }
};

/**
 * Получение данных пользователя по его id.
 *
 * @param {string} id - id пользователя
 *
 * @returns {Promise<TUser | null>} Возвращает объект с пользовательскими
 * данными или null если произошла ошибка.
 */
export const fetchUserById = async (id: string): Promise<TUser | null> => {
  try {
    const { data } = await axios.get(`${API_URL}/users/${id}`);

    return data;
  } catch (e) {
    console.error(e);

    return null;
  }
};
