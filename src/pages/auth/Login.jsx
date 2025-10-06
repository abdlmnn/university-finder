import { useState } from "react";
import axios from "axios";

export default function Login({ setUser, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_BASE = import.meta.env.VITE_API_BASE;
      const response = await axios.post(`${API_BASE}/api/auth/login/`, {
        username,
        password,
      });
      const data = response.data;

      // Save token (access) in localStorage or state
      localStorage.setItem("accessToken", data.access);
      setToken(data.access);

      // Fetch the current user info
      const userResponse = await axios.get(`${API_BASE}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      });
      const user = userResponse.data;
      setUser(user);
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">
          Login
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
}
