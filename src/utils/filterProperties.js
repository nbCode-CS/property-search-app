export function filterProperties(properties, criteria = {}) {
  // Normalise criteria so tests can pass partial objects
  const c = {
    term: "",
    type: "Any",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    postcodeArea: "",
    dateFrom: "",
    dateTo: "",
    ...criteria,
  };

  let results = [...(properties || [])];

  // Keyword search (location + description)
  if (c.term.trim() !== "") {
    const term = c.term.trim().toLowerCase();
    results = results.filter((p) => {
      const location = String(p.location || "").toLowerCase();
      const description = String(p.description || "").toLowerCase();
      return location.includes(term) || description.includes(term);
    });
  }

  // Type
  if (c.type && c.type !== "Any") {
    results = results.filter((p) => p.type === c.type);
  }

  // Price
  if (c.minPrice !== "") {
    const min = Number(c.minPrice);
    if (!Number.isNaN(min)) results = results.filter((p) => Number(p.price) >= min);
  }
  if (c.maxPrice !== "") {
    const max = Number(c.maxPrice);
    if (!Number.isNaN(max)) results = results.filter((p) => Number(p.price) <= max);
  }

  // Bedrooms
  if (c.minBeds !== "") {
    const min = Number(c.minBeds);
    if (!Number.isNaN(min)) results = results.filter((p) => Number(p.bedrooms) >= min);
  }
  if (c.maxBeds !== "") {
    const max = Number(c.maxBeds);
    if (!Number.isNaN(max)) results = results.filter((p) => Number(p.bedrooms) <= max);
  }

  // Postcode area (simple match)
  if (c.postcodeArea.trim() !== "") {
    const pc = c.postcodeArea.trim().toUpperCase();
    results = results.filter((p) =>
      String(p.location || "").toUpperCase().includes(pc)
    );
  }

  // Date added range (YYYY-MM-DD)
  const toDate = (p) => {
    const monthMap = {
      january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
      july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
    };
    const m = monthMap[String(p.added?.month || "").toLowerCase()];
    if (m === undefined) return null;
    return new Date(Number(p.added.year), m, Number(p.added.day));
  };

  if (c.dateFrom) {
    const from = new Date(c.dateFrom);
    results = results.filter((p) => {
      const d = toDate(p);
      return d ? d >= from : true;
    });
  }

  if (c.dateTo) {
    const to = new Date(c.dateTo);
    results = results.filter((p) => {
      const d = toDate(p);
      return d ? d <= to : true;
    });
  }

  return results;
}