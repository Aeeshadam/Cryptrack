"use client";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchComponent from "./SearchComponent";
import SearchResult from "./SearchResult";
import { useSearch } from "@/contexts/SearchContext";
import { style } from "@/styles/ModalStyles";

export default function SearchModal() {
  const { openSearch, setOpenSearch } = useSearch();
  return (
    <Box data-testid="outsideElement">
      <Modal
        data-testid="modal"
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        aria-labelledby="modal-transaction"
        aria-describedby="modal-transaction buy and sell"
      >
        <Box sx={style} data-testid="dialog">
          <SearchComponent editable={true} focus={true} mobileVersion={false} />
          <SearchResult />
        </Box>
      </Modal>
    </Box>
  );
}
