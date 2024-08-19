import React from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MobileSearchIconWrapper,
} from "../styles/searchStyles";
import { SearchComponentProps } from "@/types";
import { useSearch } from "@/contexts/SearchContext";
import { useState } from "react";
import SearchModal from "./SearchModal";

const SearchComponent = ({
  mobileVersion = true,
  editable = false,
  focus = false,
}: SearchComponentProps) => {
  const { searchQuery, setSearchQuery, handleOpenSearch } = useSearch();

  return (
    <>
      <Box sx={{ flexGrow: 1 }} />
      {mobileVersion ? (
        <>
          <Box
            sx={{
              display: { xs: "none", sm: "block" },
              marginRight: "1rem",
              width: "200px",
            }}
          >
            <Search onClick={handleOpenSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                readOnly={!editable}
                autoFocus={focus}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box
            sx={{
              marginRight: "0.5rem",
              display: { xs: "block", sm: "none" },
              ml: "auto",
            }}
          >
            <MobileSearchIconWrapper onClick={handleOpenSearch}>
              <SearchIcon />
            </MobileSearchIconWrapper>
          </Box>
        </>
      ) : (
        <Box sx={{ display: "block" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              readOnly={!editable}
              value={searchQuery}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(event.target.value)
              }
              autoFocus={focus}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Box>
      )}
    </>
  );
};

export default SearchComponent;
