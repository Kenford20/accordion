import React from "react";
import Accordion from "../components/accordion";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";

afterAll(cleanup);
const { container, getByTestId, getAllByTestId } = render(<Accordion />);

it("renders the accordion", () => {
  expect(container).toMatchSnapshot();
});

it("renders a deal header for each deal type", () => {
  const dealHeaders = getAllByTestId("deal-header").map(
    dealHeader => dealHeader.textContent
  );

  expect(dealHeaders).toMatchInlineSnapshot(`
    Array [
      "Local DealsTotal: $60",
      "Getaway DealsTotal: $150",
      "Goods DealsTotal: $240",
      "Groupon DealsTotal: $160",
    ]
  `);
});

it("should display the correct grand total price of all prices", () => {
  const sumOfDealsTotals = getAllByTestId("deals-total")
    .map(dealHeader => dealHeader.textContent.match(/\d+/)[0])
    .reduce((a, b) => +a + +b);

  const grandTotal = getByTestId("grand-total");
  expect(grandTotal).toHaveTextContent(sumOfDealsTotals);
});
