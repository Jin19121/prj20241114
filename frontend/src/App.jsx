import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BoardAdd } from "./page/board/BoardAdd.jsx";
import { BoardList } from "./page/board/BoardList.jsx";
import { RootLayout } from "./page/root/RootLayout.jsx";
import { BoardView } from "./page/board/BoardView.jsx";
import { MemberList } from "./page/member/MemberList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <BoardList /> },
      { path: "add", element: <BoardAdd /> },
      { path: "view/:id", element: <BoardView /> },
      { path: "member/list", element: <MemberList /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
