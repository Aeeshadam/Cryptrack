import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
  MobileSearchIconWrapper,
} from "../styles/searchStyles";
import { SearchComponentProps } from "@/types";

const SearchComponent = ({
  setOpenSearch,
  mobileVersion = true,
  editable = false,
  focus = false,
}: SearchComponentProps) => {
  const handleOpenSearch = () => {
    if (setOpenSearch) {
      setOpenSearch(true);
    }
  };

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
      )}
    </>
  );
};

export default SearchComponent;
