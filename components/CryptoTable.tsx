"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ChipButton from "./ChipButton";
import Image from "next/image";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const HiddenCellOnMobile = styled(TableCell)({
  "@media (max-width: 768px)": {
    display: "none",
  },
});
export default function CryptoTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "secondary.main" }}
    >
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="left">Crypto</TableCell>
            <TableCell align="right">Prices</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <HiddenCellOnMobile align="right">MarketCap</HiddenCellOnMobile>
            <HiddenCellOnMobile align="right">Volume(24h)</HiddenCellOnMobile>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell align="left">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-st"
                gap="6px"
              >
                <Image src="/Bnb.svg" alt="bitcoin" width={24} height={24} />
                <Typography variant="h6">BNB</Typography>
              </Box>
            </TableCell>
            <TableCell align="right">$53,000</TableCell>
            <TableCell align="right">
              <ChipButton change={0.51} />
            </TableCell>
            <HiddenCellOnMobile align="right">$25,000,000</HiddenCellOnMobile>
            <HiddenCellOnMobile align="right">$5,000,00</HiddenCellOnMobile>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell align="left">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-st"
                gap="6px"
              >
                <Image src="/Bnb.svg" alt="bitcoin" width={24} height={24} />
                <Typography variant="h6">BNB</Typography>
              </Box>
            </TableCell>
            <TableCell align="right">$53,000</TableCell>
            <TableCell align="right">
              <ChipButton change={1.59} />
            </TableCell>
            <HiddenCellOnMobile align="right">$25,000,000</HiddenCellOnMobile>
            <HiddenCellOnMobile align="right">$5,000,00</HiddenCellOnMobile>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell align="left">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-st"
                gap="6px"
              >
                <Image src="/Bnb.svg" alt="bitcoin" width={24} height={24} />
                <Typography variant="h6">BNB</Typography>
              </Box>
            </TableCell>
            <TableCell align="right">$53,000</TableCell>
            <TableCell align="right">
              <ChipButton change={0.62} />
            </TableCell>
            <HiddenCellOnMobile align="right">$25,000,000</HiddenCellOnMobile>
            <HiddenCellOnMobile align="right">$5,000,00</HiddenCellOnMobile>
          </TableRow>
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            <TableCell component="th" scope="row">
              1
            </TableCell>
            <TableCell align="left">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-st"
                gap="6px"
              >
                <Image src="/Bnb.svg" alt="bitcoin" width={24} height={24} />
                <Typography variant="h6">BNB</Typography>
              </Box>
            </TableCell>
            <TableCell align="right">$53,000</TableCell>
            <TableCell align="right">
              <ChipButton change={0.34} />
            </TableCell>
            <HiddenCellOnMobile align="right">$25,000,000</HiddenCellOnMobile>
            <HiddenCellOnMobile align="right">$5,000,00</HiddenCellOnMobile>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
