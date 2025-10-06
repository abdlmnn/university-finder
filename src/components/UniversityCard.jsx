import React from "react";

const UniversityCard = ({ university, onAddFavorite }) => {
  return (
    <div className="university-card">
      <h3 className="university-name">{university.name}</h3>
      <p className="university-country">{university.country}</p>
      <button
        className="add-favorite-btn"
        onClick={() => onAddFavorite(university.id)}
      >
        Add to Favorites
      </button>
    </div>
  );
};

export default UniversityCard;
