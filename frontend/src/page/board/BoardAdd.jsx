import { useState } from "react";
import axios from "axios";
import { Box, Input, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useNavigate } from "react-router-dom";
import { toaster } from "../../components/ui/toaster.jsx";

export function BoardAdd() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);

  const handleSaveClick = () => {
    setProgress(true);

    axios
      .post(
        "/api/board/add",
        {
          title, //이름이 같으면 생략 가능 title : title
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });

        navigate(`/view/${data.data.id}`);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          description: message.text,
          type: message.type,
        });
      })
      .finally(() => {
        setProgress(false);
        //성공|실패 상관 없이 loading이 결국 풀리도록
      });
  };

  const disabled = !(title.trim().length > 0 && content.trim().length > 0);

  return (
    <Box>
      <h2>게시물 작성</h2>
      <Stack gap={5}>
        <Field label={"제목"}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>
        <Field label={"본문"}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Field>
        <Box>
          <Button
            loading={progress}
            onClick={handleSaveClick}
            disabled={disabled}
          >
            저장
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
