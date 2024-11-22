import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../../components/root/Navbar.jsx";

export function RootLayout() {
  return (
    <Stack mx={{ md: 20, lg: 40 }}>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
}
