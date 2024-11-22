import { useNavigate } from "react-router-dom";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthenticationProvider.jsx";
import { HiOutlinePencilSquare, HiOutlineUserPlus } from "react-icons/hi2";
import { PiAddressBookTabsThin } from "react-icons/pi";
import { CiLogin, CiLogout, CiUser } from "react-icons/ci";

function NavbarItem({ children, ...rest }) {
  return (
    <Box
      css={{
        paddingX: "20px",
        paddingY: "15px",
      }}
      _hover={{
        bgColor: "blue.100",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

export function Navbar() {
  const navigate = useNavigate();

  //step2: context 사용하기
  const { id, isAdmin, isAuthenticated, logout } = useContext(
    AuthenticationContext,
  );

  return (
    <Flex gap={3}>
      <NavbarItem onClick={() => navigate("/")}>HOME</NavbarItem>
      {isAuthenticated && (
        <NavbarItem onClick={() => navigate("/add")}>
          <Icon hideFrom={"md"}>
            <HiOutlinePencilSquare />
          </Icon>
          <Text hideBelow={"md"}>작성</Text>
        </NavbarItem>
      )}
      <Box mx={"auto"}></Box>
      {isAuthenticated || (
        <NavbarItem onClick={() => navigate("/member/signup")}>
          <Icon hideFrom={"md"}>
            <HiOutlineUserPlus />
          </Icon>
          <Text hideBelow={"md"}>가입</Text>
        </NavbarItem>
      )}
      {isAdmin && (
        <NavbarItem onClick={() => navigate("/member/list")}>
          <Icon hideFrom={"md"}>
            <PiAddressBookTabsThin />
          </Icon>
          <Text hideBelow={"md"}>회원목록</Text>
        </NavbarItem>
      )}
      {isAuthenticated || (
        <NavbarItem onClick={() => navigate("/member/login")}>
          <Icon hideFrom={"md"}>
            <CiLogin />
          </Icon>
          <Text hideBelow={"md"}>로그인</Text>
        </NavbarItem>
      )}
      {isAuthenticated && (
        <NavbarItem
          onClick={() => {
            logout();
            navigate("/member/login");
          }}
        >
          <Icon hideFrom={"md"}>
            <CiLogout />
          </Icon>
          <Text hideBelow={"md"}>로그아웃</Text>
        </NavbarItem>
      )}
      <NavbarItem onClick={() => navigate(`/member/${id}`)}>
        {" "}
        <Icon hideFrom={"md"}>
          <CiUser />
        </Icon>
        <Text hideBelow={"md"}>{id}</Text>
      </NavbarItem>
    </Flex>
  );
}
