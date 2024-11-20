import { Box, Stack } from "@chakra-ui/react";
import { CommentList } from "./CommentList.jsx";
import { CommentInput } from "./CommentInput.jsx";

export function CommentContainer({ boardId }) {
  return (
    <Box>
      <Stack gap={5}>
        <h3>댓글</h3>
        <CommentInput boardId={boardId} />
        <CommentList boardId={boardId} />
      </Stack>
    </Box>
  );
}
