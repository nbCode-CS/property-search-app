import React from "react";
import { useNavigate } from "react-router-dom";

// Prefix paths with Vite base URL (for GitHub Pages)
const withBase = (path) => {
  if (!path) return "";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
};

const ImageCard = ({
  property,
  isFavourite = false,
  onAdd,
  onRemove,
  draggable = false,
  onDragStart,
}) => {
  const navigate = useNavigate();

  const { type, bedrooms, price, location, added, picture, description } =
    property;

  const shortDesc =
    typeof description === "string"
      ? description.replace(/<br\s*\/?>/gi, " ").slice(0, 140) + "..."
      : "";

  return (
    <section
      className="card"
      draggable={draggable}
      onDragStart={onDragStart}
      style={{ cursor: draggable ? "grab" : "default" }}
    >
      {/* Thumbnail */}
      <div className="image">
        <img src={withBase(picture)} alt={`${type} in ${location}`} />
      </div>

      {/* Details */}
      <div className="description">
        <h3>
          {type} • {bedrooms} bed
        </h3>
        <h3>£{Number(price).toLocaleString()}</h3>

        <p>{location}</p>
        <p>
          <strong>Added:</strong> {added.month} {added.day}, {added.year}
        </p>

        <p>{shortDesc}</p>

        <button
          type="button"
          className="btn"
          onClick={() => navigate(`/property/${property.id}`)}
        >
          View details
        </button>

        {!isFavourite ? (
          <button type="button" className="btn" onClick={onAdd}>
            Add to Favorites
          </button>
        ) : (
          <button type="button" className="btn btn--secondary" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
    </section>
  );
};

export default ImageCard;