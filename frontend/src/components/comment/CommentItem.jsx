import { Box, Flex } from "@chakra-ui/react";

export function CommentItem({ comment }) {
  return (
    <Box boarder={"1px solid black"}>
      <Flex justify={"space-between"}>
        <h3>{comment.memberId}</h3>
      </Flex>
      <p>{comment.comment}</p>
    </Box>
  );
}
