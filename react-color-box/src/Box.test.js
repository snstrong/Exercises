import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Box from "./Box";

it("renders Box", function () {
  render(<Box />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Box />);
  expect(asFragment()).toMatchSnapshot();
});
