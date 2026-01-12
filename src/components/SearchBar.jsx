import React, { useMemo } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const SearchBar = ({ criteria, setCriteria }) => {
  const update = (patch) => setCriteria((c) => ({ ...c, ...patch }));

  // Normalise slider values
  const priceValue = useMemo(() => {
    const min = criteria.minPrice === "" ? 0 : Number(criteria.minPrice);
    const max = criteria.maxPrice === "" ? 2000000 : Number(criteria.maxPrice);
    return [min, max];
  }, [criteria.minPrice, criteria.maxPrice]);

  const bedsValue = useMemo(() => {
    const min = criteria.minBeds === "" ? 0 : Number(criteria.minBeds);
    const max = criteria.maxBeds === "" ? 10 : Number(criteria.maxBeds);
    return [min, max];
  }, [criteria.minBeds, criteria.maxBeds]);

  return (
    <section className="search-container">
      {/* Heading */}
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Believe in Finding it
      </Typography>
      <Typography variant="subtitle1">
        Search for properties for sale or rent
      </Typography>

      {/* Filters */}
      <Box component="form" sx={{ mt: 2, width: "min(720px, 95vw)" }}>
        <Stack spacing={2}>
          <TextField
            label="Location keyword"
            value={criteria.term}
            onChange={(e) => update({ term: e.target.value })}
            placeholder="e.g. Orpington"
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="type-label">Property type</InputLabel>
            <Select
              labelId="type-label"
              label="Property type"
              value={criteria.type}
              onChange={(e) => update({ type: e.target.value })}
            >
              <MenuItem value="Any">Any</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Flat">Flat</MenuItem>
            </Select>
          </FormControl>

          <Box>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Price range</Typography>
            <Slider
              value={priceValue}
              onChange={(_, newValue) => {
                const [min, max] = newValue;
                update({ minPrice: String(min), maxPrice: String(max) });
              }}
              valueLabelDisplay="auto"
              min={0}
              max={2000000}
              step={5000}
            />
            <Typography variant="body2">
              £{priceValue[0].toLocaleString()} — £{priceValue[1].toLocaleString()}
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ mb: 1, fontWeight: 600 }}>Bedrooms</Typography>
            <Slider
              value={bedsValue}
              onChange={(_, newValue) => {
                const [min, max] = newValue;
                update({ minBeds: String(min), maxBeds: String(max) });
              }}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={1}
            />
            <Typography variant="body2">
              {bedsValue[0]} — {bedsValue[1]} beds
            </Typography>
          </Box>

          <TextField
            label="Postcode area"
            value={criteria.postcodeArea}
            onChange={(e) => update({ postcodeArea: e.target.value.toUpperCase() })}
            placeholder="e.g. BR6"
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Date added (from)"
              type="date"
              value={criteria.dateFrom}
              onChange={(e) => update({ dateFrom: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Date added (to)"
              type="date"
              value={criteria.dateTo}
              onChange={(e) => update({ dateTo: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="contained">For Sale</Button>
            <Button variant="outlined">For Rent</Button>
            <Button
              variant="text"
              onClick={() =>
                setCriteria({
                  term: "",
                  type: "Any",
                  minPrice: "",
                  maxPrice: "",
                  minBeds: "",
                  maxBeds: "",
                  postcodeArea: "",
                  dateFrom: "",
                  dateTo: "",
                })
              }
            >
              Clear filters
            </Button>
          </Stack>
        </Stack>
      </Box>
    </section>
  );
};

export default SearchBar;