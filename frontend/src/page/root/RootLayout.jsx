import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../../components/root/Navbar.jsx";

export function RootLayout() {
  return (
    <Stack>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
}
