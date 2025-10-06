import { useState } from "react";
import axios from "axios";

export default function Register({ setUser, setToken }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password1, password2 } = formData;

    try {
      const API_BASE = import.meta.env.VITE_API_BASE;
      const response = await axios.post(`${API_BASE}/api/auth/registration/`, {
        username,
        email,
        password1,
        password2,
      });
      const data = response.data;

      // Save token and fetch user info
      localStorage.setItem("accessToken", data.access);
      setToken(data.access);

      const userResponse = await axios.get(`${API_BASE}/api/auth/user/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      });
      const user = userResponse.data;
      setUser(user);
      setError("");
    } catch (err) {
      const errorMessage = err.response?.data?.detail || "Registration failed";
      console.error("Registration error:", err.response?.data);

      // Handle backend errors
      const messages = Object.values(err.response?.data || {})
        .flat()
        .join(" ");
      setError(messages || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="register-title">Register</h2>
        <input
          className="register-input"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password1"
          placeholder="Password"
          value={formData.password1}
          onChange={handleChange}
          required
        />
        <input
          className="register-input"
          type="password"
          name="password2"
          placeholder="Confirm Password"
          value={formData.password2}
          onChange={handleChange}
          required
        />
        <button className="register-button" type="submit">
          Register
        </button>
        {error && <p className="register-error">{error}</p>}
      </form>
    </div>
  );
}
