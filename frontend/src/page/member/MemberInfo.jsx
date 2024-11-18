import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Input, Spinner, Stack, Textarea } from "@chakra-ui/react";
import { Field } from "../../components/ui/field.jsx";

export function MemberInfo(props) {
  const [member, setMember] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    //회원 정보 얻기
    axios.get(`/api/member/${id}`).then((res) => setMember(res.data));
  }, []);

  if (!member) {
    return <Spinner />;
  }

  return (
    <Box>
      <h3>회원 정보</h3>
      <Stack gap={5}>
        <Field label={"아이디"}>
          <Input readOnly value={member.id}></Input>
        </Field>
        <Field label={"암호"}>
          <Input readOnly value={member.password}></Input>
        </Field>
        <Field label={"자기 소개"}>
          <Textarea readOnly value={member.description}></Textarea>
        </Field>
        <Field label={"가입 일시"}>
          <Input
            type={"datetime-local"}
            readOnly
            value={member.inserted}
          ></Input>
        </Field>
      </Stack>
    </Box>
  );
}

export default MemberInfo;
