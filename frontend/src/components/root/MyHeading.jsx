import React from "react";
import { Heading } from "@chakra-ui/react";

function MyHeading({ children, ...rest }) {
  return (
    <Heading size={{ base: "xl", md: "2xl" }} mb={7} {...rest}>
      {children}
    </Heading>
  );
}

export default MyHeading;
