import React from "react";
import DealHeader from "../components/deal-header";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect";

afterAll(cleanup);

const fakePrices = [10, 20, 30, 40, 50];
const { container, getByTestId } = render(
    <DealHeader header="Foo" prices={fakePrices}/>
);

it("renders the deal header", () => {
    expect(container).toMatchSnapshot();
});

it("should display the correct total price of deals", () => {
    const totalPriceNode = getByTestId("deals-total");
    const totalPrice = fakePrices.reduce((a,b) => a+b);

    expect(totalPriceNode).toHaveTextContent(totalPrice);
});

it("should toggle the deals container's visibility when it is clicked", () => {
    const dealsContainer = getByTestId("deals-container");
    const dealHeader = getByTestId("deal-header");

    expect(dealsContainer).toBeVisible();
    fireEvent.click(dealHeader);
    expect(dealsContainer).not.toBeVisible();
    fireEvent.click(dealHeader);
    expect(dealsContainer).toBeVisible();
});



