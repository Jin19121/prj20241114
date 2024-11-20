import { Box } from "@chakra-ui/react";
import * as PropTypes from "prop-types";
import { CommentItem } from "./CommentItem.jsx";

CommentItem.propTypes = { comment: PropTypes.any };

export function CommentList({ boardId, commentList, onDeleteClick }) {
  return (
    <Box>
      {commentList.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </Box>
  );
}
