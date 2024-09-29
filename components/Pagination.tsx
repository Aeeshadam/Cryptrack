"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Pagination, Stack } from "@mui/material";

import { setCurrentPage } from "../slice/paginationSlice";
import { AppDispatch, AppState } from "../store/store";

export default function PaginationRounded() {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: AppState) => state.coinList.coins);
  const { currentPage, itemsPerPage } = useSelector(
    (state: AppState) => state.pagination
  );
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
    console.log("Current Page: ", page);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.ceil(coins.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        shape="rounded"
      />
    </Stack>
  );
}
