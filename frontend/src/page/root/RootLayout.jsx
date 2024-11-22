import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { Navbar } from "../../components/root/Navbar.jsx";

export function RootLayout() {
  return (
    <Stack>
      <Box bgColor={"blue.50"} mb={10} px={{ md: 20, lg: 40 }}>
        <Navbar />
      </Box>
      <Box mx={{ md: 20, lg: 40 }}>
        <Outlet />
      </Box>
    </Stack>
  );
}
