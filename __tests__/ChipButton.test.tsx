import React from "react";
import { screen, render } from "@testing-library/react";
import ChipButton from "@/components/ChipButton";

describe("ChipButton Component", () => {
  it("renders correctly without detailPage prop", () => {
    render(<ChipButton change={5} />);
    const typography = screen.getByText("5.00%");
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveStyle("font-size: 14px");
    expect(typography).toHaveStyle("font-weight: 400");
    expect(screen.getByTestId("KeyboardArrowUpIcon")).toBeInTheDocument();
  });

  it("renders correctly with detailPage prop", () => {
    render(<ChipButton change={10} detailPage />);
    const typography = screen.getByText("10.00%");
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveStyle("font-size: 20px");
    expect(typography).toHaveStyle("font-weight: 500");
  });

  it("renders correctly with negative change", () => {
    render(<ChipButton change={-5} />);
    expect(screen.getByText("5.00%")).toBeInTheDocument();
    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
  });
});
