import React, { useMemo, useState } from "react";
import ImageCard from "./ImageCard";

const Gallery = ({
  properties,
  favourites,
  addFavourite,
  removeFavourite,
  clearFavourites,
}) => {
  // Lookup so we can add by id safely
  const propertyById = useMemo(() => {
    const map = new Map();
    [...(properties || []), ...(favourites || [])].forEach((p) =>
      map.set(p.id, p)
    );
    return map;
  }, [properties, favourites]);

  const [isOverFavPanel, setIsOverFavPanel] = useState(false);
  const [isOverAvailPanel, setIsOverAvailPanel] = useState(false);

  const handleDropAddToFav = (e) => {
    e.preventDefault();
    setIsOverFavPanel(false);
    const id = e.dataTransfer.getData("text/plain");
    const prop = propertyById.get(id);
    if (prop) addFavourite(prop);
  };

  const handleDropRemoveFromFav = (e) => {
    e.preventDefault();
    setIsOverAvailPanel(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) removeFavourite(id);
  };

  return (
    <div className="container">
      {/* Available properties */}
      <div
        className={`all-items ${isOverAvailPanel ? "panel-drop-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOverAvailPanel(true);
        }}
        onDragLeave={() => setIsOverAvailPanel(false)}
        onDrop={handleDropRemoveFromFav}
      >
        <h2>Available</h2>

        <div className="gallery">
          {properties.map((property) => (
            <ImageCard
              key={property.id}
              property={property}
              isFavourite={false}
              onAdd={() => addFavourite(property)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", property.id);
                e.dataTransfer.effectAllowed = "copy";
              }}
            />
          ))}
        </div>
      </div>

      {/* Favourite properties */}
      <div
        className={`favorites ${isOverFavPanel ? "panel-drop-over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsOverFavPanel(true);
        }}
        onDragLeave={() => setIsOverFavPanel(false)}
        onDrop={handleDropAddToFav}
      >
        <h2>Favorites</h2>

        {favourites.length > 0 && (
          <button type="button" className="btn" onClick={clearFavourites}>
            Clear all
          </button>
        )}

        <div className="gallery">
          {favourites.map((property) => (
            <ImageCard
              key={property.id}
              property={property}
              isFavourite
              onRemove={() => removeFavourite(property.id)}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/plain", property.id);
                e.dataTransfer.effectAllowed = "move";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;