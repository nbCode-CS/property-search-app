import { describe, it, expect } from "vitest";
import { filterProperties } from "../filterProperties";

const base = [
  {
    id: "prop1",
    type: "House",
    bedrooms: 3,
    price: 750000,
    location: "Petts Wood Road, Orpington BR5",
    description: "Nice family home",
    added: { month: "October", day: 12, year: 2022 },
  },
  {
    id: "prop2",
    type: "Flat",
    bedrooms: 2,
    price: 399995,
    location: "Crofton Road, Orpington BR6",
    description: "Modern flat",
    added: { month: "September", day: 14, year: 2022 },
  },
];

describe("filterProperties", () => {
  it("filters by keyword term (location/description)", () => {
    const result = filterProperties(base, { term: "crofton" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("prop2");
  });

  it("filters by type", () => {
    const result = filterProperties(base, { type: "House" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("prop1");
  });

  it("filters by min/max bedrooms", () => {
    const result = filterProperties(base, { minBeds: "3", maxBeds: "3" });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("prop1");
  });
});