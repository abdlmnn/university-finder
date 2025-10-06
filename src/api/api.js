import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

// --- API functions ---
export const fetchUniversities = async (country) => {
  const response = await api.get("/api/universities/", { params: { country } });
  return response.data;
};

export const searchUniversity = async (name) => {
  const response = await api.get("/api/search-university/", {
    params: { name },
  });
  return response.data;
};

export const fetchFavorites = async (token) => {
  const response = await api.get("/api/favorites/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addFavorite = async (universityId, token) => {
  const response = await api.post(
    "/api/favorites/",
    { university_id: universityId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Auth functions
export const loginUser = async (username, password) => {
  const response = await api.post("/api/auth/login/", { username, password });
  return response.data; // { access, refresh }
};

export const registerUser = async (username, email, password1, password2) => {
  const data = {
    username,
    email,
    password1,
    password2,
  };
  console.log("Sending registration data:", data);
  try {
    const response = await api.post("/api/auth/registration/", data);
    return response.data;
  } catch (error) {
    console.error("Registration error:", error.response?.data);
    throw error;
  }
};

export const fetchCurrentUser = async (token) => {
  const response = await api.get("/api/auth/user/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
