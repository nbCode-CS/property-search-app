import React, { useEffect, useMemo, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import SearchBar from "./components/SearchBar";
import Gallery from "./components/Gallery";
import PropertyDetails from "./pages/PropertyDetails";
import { filterProperties } from "./utils/filterProperties";

import "./App.css";

function App() {
  const [properties, setProperties] = useState([]);

  const [criteria, setCriteria] = useState({
    term: "",
    type: "Any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    postcodeArea: "",
    dateFrom: "",
    dateTo: "",
  });

  const [favourites, setFavourites] = useState([]);

  // Load property data
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}properties.json`);
      const data = await response.json();
      setProperties(data.properties || []);
    };
    fetchData();
  }, []);

  // Apply filters
  const filtered = useMemo(
    () => filterProperties(properties, criteria),
    [properties, criteria]
  );

  // Favourites
  const addFavourite = (property) => {
    setFavourites((prev) =>
      prev.some((p) => p.id === property.id) ? prev : [...prev, property]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavourites = () => setFavourites([]);

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar criteria={criteria} setCriteria={setCriteria} />
              <Gallery
                properties={filtered}
                favourites={favourites}
                addFavourite={addFavourite}
                removeFavourite={removeFavourite}
                clearFavourites={clearFavourites}
              />
            </>
          }
        />
        <Route
          path="/property/:id"
          element={
            <PropertyDetails
              allProperties={properties}
              onAddFavourite={addFavourite}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;