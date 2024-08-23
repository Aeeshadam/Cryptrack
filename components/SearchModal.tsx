"use client";
import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchComponent from "./SearchComponent";
import SearchResult from "./SearchResult";
import { useSearch } from "@/contexts/SearchContext";
const style = {
  zIndex: 9999,
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: 400,
    md: 600,
    lg: 700,
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SearchModal() {
  const { openSearch, setOpenSearch } = useSearch();
  return (
    <div data-testid="outsideElement">
      <Modal
        data-testid="modal"
        open={openSearch}
        onClose={() => setOpenSearch(false)}
        aria-labelledby="modal-search"
        aria-describedby="modal-search input and result"
      >
        <Box sx={style} data-testid="dialog">
          <SearchComponent editable={true} focus={true} mobileVersion={false} />
          <SearchResult />
        </Box>
      </Modal>
    </div>
  );
}
