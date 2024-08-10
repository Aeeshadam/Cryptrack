import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Image from "next/image";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useSearch } from "@/contexts/SearchContext";

export default function SearchResult() {
  const { filteredCoins } = useSearch();
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "400px",
        overflow: "auto",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Coin List 🔥
        </ListSubheader>
      }
    >
      {filteredCoins.map((coin) => (
        <ListItemButton key={coin.id}>
          <ListItemIcon>
            <Image src={coin.image} alt={coin.name} width={30} height={30} />
          </ListItemIcon>
          <ListItemText primary={coin.name} />
        </ListItemButton>
      ))}

      {filteredCoins.length === 0 && (
        <ListItemButton>
          <ListItemText primary="No result found" />
        </ListItemButton>
      )}
    </List>
  );
}
