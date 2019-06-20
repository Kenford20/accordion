import React from "react";
import { DealsContainer } from "../components/deals-container";
import { render, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";

afterAll(cleanup);

const fakePrices = [1, 2, 3, 4, 50];
const { container, getAllByTestId } = render(
  <DealsContainer deal={fakePrices} />
);

it("renders the container", () => {
  expect(container).toMatchSnapshot();
});

it("renders all the deals", () => {
  const deals = getAllByTestId("deal").map(deal => deal.textContent);

  expect(deals).toMatchInlineSnapshot(`
    Array [
      "Deal 1$1",
      "Deal 2$2",
      "Deal 3$3",
      "Deal 4$4",
      "Deal 5$50",
    ]
  `);
});
