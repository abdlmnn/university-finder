import React, { useEffect, useState, useContext } from "react";
import { fetchFavorites } from "../api/api";
import { AuthContext } from "../contexts/AuthContext";

const Favorites = () => {
  const { token } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (token) {
      fetchFavorites(token).then((data) => setFavorites(data));
    }
  }, [token]);

  if (!token) return <p>Please log in to view your favorites.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">My Favorite Universities</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul className="space-y-2">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="border p-2 rounded shadow flex justify-between"
            >
              <div>
                <h3 className="font-bold">{fav.university.name}</h3>
                <p>{fav.university.country}</p>
              </div>
              <span>{new Date(fav.added_at).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
