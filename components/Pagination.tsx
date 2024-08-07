"use client";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { AppState, AppDispatch } from "../store/store";
import { setCurrentPage } from "../slice/paginationSlice";

export default function PaginationRounded() {
  const dispatch = useDispatch<AppDispatch>();
  const coins = useSelector((state: AppState) => state.crypto.coins);
  const { currentPage, itemsPerPage } = useSelector(
    (state: AppState) => state.pagination
  );
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    dispatch(setCurrentPage(page));
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
