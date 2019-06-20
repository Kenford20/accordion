import React from "react";
import { Accordion } from "../components/accordion";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";

afterAll(cleanup);
const { container, getByTestId, getAllByTestId } = render(<Accordion />);
const initialGrandTotal = getAllByTestId("deals-total")
    .map(dealHeader => dealHeader.textContent.match(/\d+/)[0])
    .reduce((a, b) => +a + +b);

it("renders the accordion", () => {
  expect(container).toMatchSnapshot();
});

it("should display the correct grand total price of all prices", () => {
  const grandTotal = getByTestId("grand-total");
  expect(grandTotal).toHaveTextContent(initialGrandTotal);
});

// just tests one instance of dealHeader component, assuming all instances will behave the same
it("should update a dealHeader total when its add deal button is clicked", () => {
  const addDealBtn = getAllByTestId("add-deal-btn")[0];
  const currentTotal = getAllByTestId("deals-total")[0].textContent.match(/\d+/)[0];
  fireEvent.click(addDealBtn);

  const updatedTotal = getAllByTestId("deals-total")[0].textContent.match(/\d+/)[0];
  console.log(updatedTotal);

  expect(+updatedTotal).toBeGreaterThan(+currentTotal);
});

it("should update grand total when an add deal button is clicked", () => {
  const addDealBtn = getAllByTestId("add-deal-btn")[0];
  fireEvent.click(addDealBtn);
  const grandTotal = getByTestId("grand-total").textContent.match(/\d+/)[0];
  console.log(grandTotal)

  expect(+grandTotal).toBeGreaterThan(initialGrandTotal);
});

it("should render a new deal in the deal container component when an add deal button is clicked", () => {
  const addDealBtn = getAllByTestId("add-deal-btn")[0];
  const currentNumDeals = getAllByTestId("deals-container")[0].children.length;
  fireEvent.click(addDealBtn);
  const updatedNumDeals = getAllByTestId("deals-container")[0].children.length;

  expect(+updatedNumDeals).toBeGreaterThan(+currentNumDeals);
})