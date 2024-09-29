import React from "react";

import { fireEvent, screen, waitFor } from "@testing-library/react";

import PaginationRounded from "../../components/Pagination";
import { renderWithRedux } from "../../utils/test-util";

describe("PaginationRounded Component", () => {
  it("renders PaginationRounded and handles page change", async () => {
    const { store } = renderWithRedux(<PaginationRounded />, {
      currentState: {
        coinList: {
          coins: Array(50).fill({ id: "ethereum", name: "ethereum" }),
          loading: false,
          error: null,
        },
      },
    });

    const pagination = screen.getByRole("navigation");
    expect(pagination).toBeInTheDocument();
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(6); // Includes 4 page buttons + 2 for previous and next

    const page2Button = screen.getByLabelText("Go to page 2");

    expect(page2Button).toBeInTheDocument();
    fireEvent.click(page2Button);

    await waitFor(() => {
      const newState = store.getState();
      expect(newState.pagination.currentPage).toBe(2);
    });
  });
});
