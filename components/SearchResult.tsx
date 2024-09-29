import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useSearch } from "@/contexts/SearchContext";

export default function SearchResult() {
  const { filteredCoins, setOpenSearch } = useSearch();
  const router = useRouter();

  const handleClick = (coinId: string) => {
    router.push(`/coin/${coinId}`);
    setOpenSearch(false);
  };

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
        <ListItemButton key={coin.id} onClick={() => handleClick(coin.id)}>
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
