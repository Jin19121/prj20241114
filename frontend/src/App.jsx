import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BoardAdd } from "./page/board/BoardAdd.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { MemberList } from "./page/member/MemberList.jsx";
import MemberInfo from "./page/member/MemberInfo.jsx";
import { BoardEdit } from "./page/board/BoardEdit.jsx";
import { MemberEdit } from "./page/member/MemberEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BoardList /> },
      { path: "add", element: <BoardAdd /> },
      { path: "view/:id", element: <BoardView /> },
      { path: "edit/:id", element: <BoardEdit /> },
      { path: "member/list", element: <MemberList /> },
      { path: "member/:id", element: <MemberInfo /> },
      { path: "member/:id", element: <MemberEdit /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
