import { useState } from "react";
import { Box, Group, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import axios from "axios";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";

export function MemberSignup() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  function handleSaveClick() {
    axios
      .post("/api/member/signup", { id, email, password, description })
      .then((res) => {
        console.log("잘됨, 페이지 이동, 토으스 출력");
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        navigate("/api/member/list");
      })
      .catch((e) => {
        console.log("안됐을 때");
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        console.log("성공/실패 모두");
      });
  }

  const handleIdCheckClick = () => {
    axios
      .get(`/api/member/check`, {
        params: { id: id },
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: emssage.type,
          description: message.text,
        });
      });
  };

  return (
    <Box>
      <h3>회원 가입</h3>
      <Stack>
        <Field label={"아이디"}>
          <Group attached w={"100%"}>
            <Input value={id} onChange={(e) => setId(e.target.value)} />
            <Button onClick={handleIdCheckClick} varient={"outline"} />
          </Group>
        </Field>
        <Field label={"이메일"}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label={"암호"}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Field label={"자기 소개"}>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <Box>
          <Button onClick={handleSaveClick}>가입</Button>
        </Box>
      </Stack>
    </Box>
  );
}
