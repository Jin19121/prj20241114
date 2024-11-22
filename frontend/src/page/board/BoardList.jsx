import { Badge, Box, Center, HStack, Input, Table } from "@chakra-ui/react";
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
import { CiSearch } from "react-icons/ci";
import { Button } from "../../components/ui/button.jsx";
import MyHeading from "../../components/root/MyHeading.jsx";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({ type: "all", keyword: "" });
  const navigate = useNavigate();

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

  function handleSearchClick() {
    if (search.keyword.trim().length > 0) {
      //검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("st", search.type);
      nextSearchParam.set("sk", search.keyword);
      nextSearchParam.set("page", 1);

      setSearchParams(nextSearchParam);
    } else {
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("st");
      nextSearchParam.delete("sk");

      setSearchParams(nextSearchParam);
    }
  }

  return (
    <Box>
      <MyHeading>게시물 목록</MyHeading>

      {boardList.length > 0 ? (
        <Table.Root interactive>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontWeight={"bold"} color={"purple"}>
                <GoHash />
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={"bold"}>제목</Table.ColumnHeader>
              <Table.ColumnHeader>
                <GoHeartFill color={"red"} />
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                <GoPersonFill color={"blue"} />
              </Table.ColumnHeader>
              <Table.ColumnHeader hideBelow={"md"}>
                <IoCalendar color="green" />
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {boardList.map((board) => (
              <Table.Row
                _hover={{
                  cursor: "pointer",
                  colorPalette: "blue",
                  variant: "blue",
                }}
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
      <Center>
        <HStack my={7} w={{ sm: "400px" }}>
          <Box>
            <select
              value={search.type}
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
            >
              <option value="all">전체</option>
              <option value="title">제목</option>
              <option value="content">본문</option>
            </select>
          </Box>
          <Input
            value={search.keyword}
            onChange={(e) =>
              setSearch({ ...search, keyword: e.target.value.trim() })
            }
          />
          <Button
            colorPalette={"blue"}
            variant={"subtle"}
            onClick={handleSearchClick}
          >
            <CiSearch />
          </Button>
        </HStack>
      </Center>
      <Center>
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
      </Center>
    </Box>
  );
}
