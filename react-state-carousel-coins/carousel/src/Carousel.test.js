import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// Smoke Test
it("renders without crashing", () => {
  render(<Carousel />);
});

// Snapshot Test
it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works: click left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel to second image
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move back to first image
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});
