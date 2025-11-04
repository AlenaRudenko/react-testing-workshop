import { FC, useState } from "react";

const LoginFormInput = {
  USERNAME: "userName",
  PASSWORD: "password",
};

type LoginCredentials = {
  userName: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
};

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!userName || !password) {
      setError("Заполните все поля");
      return;
    }

    try {
      setIsLoading(true);
      await onSubmit({ userName, password });
    } catch (error) {
      setError("Ошибка входа, попробуйте еще раз");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      data-testid="login-form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "100%",
      }}
    >
      <h2>Войти</h2>
      {error && <span data-testid="error-message">{error}</span>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        <label htmlFor={LoginFormInput.USERNAME}>Username</label>
        <input
          data-testid="username-input"
          id={LoginFormInput.USERNAME}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
        }}
      >
        <label htmlFor={LoginFormInput.PASSWORD}>Password</label>
        <input
          data-testid="password-input"
          id={LoginFormInput.PASSWORD}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button data-testid="submit-button" type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};
