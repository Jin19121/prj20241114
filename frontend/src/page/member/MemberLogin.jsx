import { Box, Input, Stack } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";
import { Button } from "../../components/ui/button.jsx";
import { useContext, useState } from "react";
import axios from "axios";
import { toaster } from "../../components/ui/toaster.jsx";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../components/context/AuthenticationProvider.jsx";
import MyHeading from "../../components/root/MyHeading.jsx";

export function MemberLogin() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authentication = useContext(AuthenticationContext);

  function handleLoginClick() {
    axios
      .post("/api/member/login", { id, password })
      .then((res) => res.data)
      .then((data) => {
        //토스트
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        //경로 이동
        navigate("/");
        //localStorage에 token 저장
        console.log(data.token);
        authentication.login(data.token);
      })
      .catch((e) => {
        const message = e.response.data.message;
        //toaster
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally();
  }

  return (
    <Box mx={"auto"} w={{ md: "500px" }}>
      <MyHeading>로그인</MyHeading>
      <Stack gap={5}>
        <Field labe={"아이디"}>
          ID
          <Input value={id} onChange={(e) => setId(e.target.value)} />
        </Field>
        <Field labe={"비밀번호"}>
          Password
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Box>
          <Button onClick={handleLoginClick}>로그인</Button>
        </Box>
      </Stack>
    </Box>
  );
}
