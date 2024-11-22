import { Box, Group, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useContext, useState } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";
import { GoPencil } from "react-icons/go";

export function CommentInput({ boardId, onSaveClick }) {
  const [comment, setComment] = useState("");
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <Box mx={"auto"} w={{ md: "500px" }}>
      <Group>
        <Textarea
          h={127}
          w={300}
          value={comment}
          disabled={!isAuthenticated}
          placeholder={isAuthenticated ? "" : "로그인 후 댓글을 남겨주세요."}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          disabled={!isAuthenticated}
          onClick={() => {
            setComment("");
            onSaveClick(comment);
          }}
          variant={"surface"}
          colorPalette={"green"}
          px={5}
        >
          댓글 쓰기
          <GoPencil />
        </Button>
      </Group>
    </Box>
  );
}
