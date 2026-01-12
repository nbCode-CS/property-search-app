import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  it("renders key form widgets", () => {
    const criteria = {
      term: "",
      type: "Any",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      postcodeArea: "",
      dateFrom: "",
      dateTo: "",
    };

    render(<SearchBar criteria={criteria} setCriteria={() => {}} />);

    expect(screen.getByLabelText(/location keyword/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/property type/i)).toBeInTheDocument();
    expect(screen.getByText(/price range/i)).toBeInTheDocument();
    expect(screen.getByText(/bedrooms/i)).toBeInTheDocument();
  });

  it("updates term when user types", async () => {
    const user = userEvent.setup();

    let criteria = {
      term: "",
      type: "Any",
      minPrice: "",
      maxPrice: "",
      minBeds: "",
      maxBeds: "",
      postcodeArea: "",
      dateFrom: "",
      dateTo: "",
    };

    const setCriteria = vi.fn((updater) => {
      // simulate React setState callback style
      criteria = typeof updater === "function" ? updater(criteria) : updater;
    });

    render(<SearchBar criteria={criteria} setCriteria={setCriteria} />);

    const input = screen.getByLabelText(/location keyword/i);
    await user.type(input, "Orpington");

    // setCriteria should have been called at least once
    expect(setCriteria).toHaveBeenCalled();
  });
});