import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "../../components/ui/skeleton.jsx";

export function MemberList() {
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    //회원 목록 요청
    axios.get("/api/member/list").then((res) => setMemberList(res.data));
  }, []);

  if (!memberList || memberList.length === 0) {
    return <Skeleton />;
  }

  return (
    <Box>
      <h3>회원 목록</h3>
    </Box>
  );
}
