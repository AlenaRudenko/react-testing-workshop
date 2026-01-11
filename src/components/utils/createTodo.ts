import { v4 } from "uuid";
import { API_URL } from "../../services/userService";

export const createTodo = (title: string) => ({
  title,
  id: v4(),
  completed: false,
});

export const createTodoOnServer = async (title: string) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createTodo(title)),
    });

    if (!response.ok) {
      throw new Error("Cannot create todo");
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
};
