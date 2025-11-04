import { FC, useEffect, useState } from "react";
import { TUser } from "./UsersList.types";
import { fetchUsers } from "../../services/userService";

export const UsersList: FC = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers();
        setUsers(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        setError("Failed to load users");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div data-testid="users-list-container">
      <h1>Users List</h1>
      {isLoading && <span data-testid="loading-indicator">Loading...</span>}
      {error && <span data-testid="error-message">{error}</span>}
      {!isLoading && !error && users.length === 0 && <p>No users found</p>}
      <ul data-testid="users-list">
        {users &&
          users.map(({ name, id }) => (
            <li key={id} data-testid={`user-item-${id}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
};
