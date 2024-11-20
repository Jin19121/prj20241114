import {
  Box,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";

function DeleteButton() {
  return (
    <>
      <DialogRoot>
        <DialogContent>
          <DialogHeader></DialogHeader>
          <DialogFooter>
            <DialogTrigger></DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
}

export function CommentItem({ comment, onDeleteClick }) {
  const { hasAccess } = useContext(AuthenticationContext);

  return (
    <HStack border={"1px solid black"} m={5}>
      <Box flex={1}>
        <Flex justify={"space-between"}>
          <h3>{comment.memberId}</h3>
          <h4>{comment.inserted}</h4>
        </Flex>
        <p>{comment.comment}</p>
      </Box>
      {hasAccess(comment.memberId) && (
        <Box>
          <Button colorPalette={"purple"}>수정</Button>
          <Button
            colorPalette={"red"}
            onClick={() => onDeleteClick(comment.id)}
          >
            삭제
          </Button>
          <DeleteButton />
        </Box>
      )}
    </HStack>
  );
}
