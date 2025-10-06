import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import UniversityCard from "../components/UniversityCard";
import { AuthContext } from "../contexts/AuthContext";

const countries = [
  "Philippines",
  "Japan",
  "India",
  "Australia",
  "Canada",
  "Singapore",
  "Thailand",
  "Saudi Arabia",
  "United Kingdom",
];

const Home = () => {
  const [universities, setUniversities] = useState([]);
  const [country, setCountry] = useState("Philippines");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadUniversities = async () => {
      setLoading(true);
      setError("");
      try {
        const API_BASE = import.meta.env.VITE_API_BASE;
        const response = await axios.get(`${API_BASE}/api/universities/`, {
          params: { country },
        });
        const data = response.data;
        const universitiesData = Array.isArray(data)
          ? data
          : data.results || [];
        setUniversities(universitiesData);
      } catch (err) {
        console.error("Failed to fetch universities:", err);
        setError("Failed to load universities.");
        setUniversities([]);
      } finally {
        setLoading(false);
      }
    };

    loadUniversities();
  }, [country]);

  const handleAddFavorite = async (universityId) => {
    if (!token) return alert("Please log in!");
    try {
      const API_BASE = import.meta.env.VITE_API_BASE;
      await axios.post(
        `${API_BASE}/api/favorites/`,
        { university_id: universityId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to favorites!");
    } catch (error) {
      console.error("Failed to add favorite:", error);
      alert("Failed to add to favorites");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Universities in {country}</h1>

      {/* Country selector */}
      <div className="country-selector">
        <select
          id="country"
          className="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading universities...</p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="universities-list">
        {universities.length > 0
          ? universities.map((u) => (
              <UniversityCard
                key={u.id || u.name} // fallback if no DB ID
                university={u}
                onAddFavorite={handleAddFavorite}
              />
            ))
          : !loading && <p>No universities found for this country.</p>}
      </div>
    </div>
  );
};

export default Home;
