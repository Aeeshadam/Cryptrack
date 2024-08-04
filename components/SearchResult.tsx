import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import Image from "next/image";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function SearchResult() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
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
          Trending Coins 🔥
        </ListSubheader>
      }
    >
      {Array.from({ length: 15 }, (_, index) => (
        <ListItemButton key={index}>
          <ListItemIcon>
            <Image src="/Bnb.svg" alt="bitcoin" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="BNB" />
        </ListItemButton>
      ))}
    </List>
  );
}
