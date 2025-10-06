import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { searchUniversity, addFavorite } from "../api/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const { token } = useContext(AuthContext);

  const handleSearch = async () => {
    if (!query) return alert("Enter a university name");
    try {
      const data = await searchUniversity(query);
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("University not found");
      setResult(null);
    }
  };

  const handleAddFavorite = async () => {
    if (!token || !result) return alert("You must be logged in");
    try {
      await addFavorite(result.id, token); // Use the university ID from DB if available
      alert("Added to favorites!");
    } catch (error) {
      console.error(error);
      alert("Failed to add favorite");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Search University</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter university name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {result && (
        <div className="border p-4 rounded shadow">
          <h3 className="text-xl font-bold">{result.name}</h3>
          <p>{result.address}</p>
          <p>
            Lat: {result.lat}, Lng: {result.lng}
          </p>
          {token && (
            <button
              onClick={handleAddFavorite}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add to Favorites
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
