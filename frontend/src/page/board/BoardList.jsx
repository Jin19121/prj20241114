import { Badge, Box, Center, Heading, HStack, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../components/ui/pagination.jsx";
import { FaCommentDots, FaImages } from "react-icons/fa6";
import { GoHash, GoHeartFill, GoPersonFill } from "react-icons/go";
import { IoCalendar } from "react-icons/io5";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get("/api/board/list", {
        params: searchParams,
        signal: controller.signal,
      })
      .then((res) => res.data)
      .then((data) => {
        setBoardList(data.list);
        setCount(data.count);
      });

    return () => {
      controller.abort();
    };
  }, [searchParams]);

  //searchParams
  console.log(searchParams.toString());

  //page번호
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  function handleRowClick(id) {
    navigate(`/view/${id}`);
  }

  function handlePageChange(e) {
    console.log(e.page);
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("page", e.page);
    setSearchParams(nextSearchParams);
  }

  return (
    <Center>
      <Box>
        <Heading size={{ base: "xl", md: "2xl" }} mb={7}>
          게시물 목록
        </Heading>

        {boardList.length > 0 ? (
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>
                  <GoHash />
                </Table.ColumnHeader>
                <Table.ColumnHeader>제목</Table.ColumnHeader>
                <Table.ColumnHeader>
                  <GoHeartFill />
                </Table.ColumnHeader>
                <Table.ColumnHeader>
                  <GoPersonFill />
                </Table.ColumnHeader>
                <Table.ColumnHeader hideBelow={"md"}>
                  <IoCalendar />
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {boardList.map((board) => (
                <Table.Row
                  onClick={() => handleRowClick(board.id)}
                  key={board.id}
                >
                  <Table.Cell>{board.id}</Table.Cell>
                  <Table.Cell>
                    {board.title}
                    {board.countComment > 0 && (
                      <Badge variant={"subtle"} colorPalette={"green"}>
                        <FaCommentDots />
                        {board.countComment}
                      </Badge>
                    )}
                    {board.countFile > 0 && (
                      <Badge variant={"subtle"} colorPalette={"gray"}>
                        <FaImages />
                        {board.countFile}
                      </Badge>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {board.countLike > 0 ? board.countLike : ""}
                  </Table.Cell>
                  <Table.Cell>{board.writer}</Table.Cell>
                  <Table.Cell hideBelow={"md"}>{board.inserted}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        ) : (
          <p>조회된 결과가 없습니다.</p>
        )}
        <PaginationRoot
          onPageChange={handlePageChange}
          count={count}
          pagesize={10}
          page={page}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Box>
    </Center>
  );
}
