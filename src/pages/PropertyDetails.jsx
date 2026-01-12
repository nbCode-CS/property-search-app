import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Prefix paths with Vite base URL (for GitHub Pages)
const withBase = (path) => {
  if (!path) return "";
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
};

const PropertyDetails = ({ allProperties, onAddFavourite }) => {
  const { id } = useParams();

  const property = useMemo(
    () => (allProperties || []).find((p) => p.id === id),
    [allProperties, id]
  );

  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  if (!property) {
    return (
      <main className="property-details">
        <p>Property not found.</p>
        <Link to="/">← Back to search</Link>
      </main>
    );
  }

  const images =
    Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : [property.picture].filter(Boolean);

  const currentMain = mainImage || images[0];

  const { type, bedrooms, price, location, added, description } = property;

  return (
    <main className="property-details">
      <Link className="back-link" to="/">
        ← Back to search
      </Link>

      <h1 className="details-title">
        {type} • {bedrooms} bed • £{Number(price).toLocaleString()}
      </h1>

      <p className="details-location">{location}</p>
      <p className="details-added">
        <strong>Added:</strong> {added.month} {added.day}, {added.year}
      </p>

      <div className="details-layout">
        {/* Main image + thumbnails */}
        <section className="details-media">
          {currentMain && (
            <img
              className="details-main-image"
              src={withBase(currentMain)}
              alt={`${type} in ${location}`}
            />
          )}

          <div className="details-actions">
            <button
              type="button"
              className="btn"
              onClick={() => onAddFavourite(property)}
            >
              Add to favourites
            </button>
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => setShowGallery(true)}
            >
              View all images
            </button>
          </div>

          <div className="thumbs">
            {images.slice(0, 6).map((img) => (
              <button
                key={img}
                type="button"
                className="thumb"
                onClick={() => setMainImage(img)}
                title="Click to view"
              >
                <img src={withBase(img)} alt="thumbnail" />
              </button>
            ))}
          </div>
        </section>

        {/* Tabs */}
        <section className="details-panel">
          <div className="tabs">
            <button
              type="button"
              className={`tab ${activeTab === "description" ? "tab--active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              type="button"
              className={`tab ${activeTab === "floorplan" ? "tab--active" : ""}`}
              onClick={() => setActiveTab("floorplan")}
            >
              Floorplan
            </button>
            <button
              type="button"
              className={`tab ${activeTab === "map" ? "tab--active" : ""}`}
              onClick={() => setActiveTab("map")}
            >
              Map
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "description" && (
              <div className="details-description">
                {String(description || "")
                  .split(/<br\s*\/?>/gi)
                  .map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
              </div>
            )}

            {activeTab === "floorplan" && (
              <div>
                {property.floorplan && (
                  <img
                    className="floorplan-image"
                    src={withBase(property.floorplan)}
                    alt="floorplan"
                  />
                )}
              </div>
            )}

            {activeTab === "map" && (
              <div>
                <iframe
                  title="map"
                  width="100%"
                  height="320"
                  className="map-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Gallery modal */}
      {showGallery && (
        <div className="modal-overlay" onClick={() => setShowGallery(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>All images</h2>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setShowGallery(false)}
              >
                Close
              </button>
            </div>

            <div className="modal-grid">
              {images.map((img) => (
                <img key={img} src={withBase(img)} alt="gallery" />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PropertyDetails;