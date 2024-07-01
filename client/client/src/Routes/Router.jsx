import { createBrowserRouter } from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/Home';
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import Rules from "../pages/Rule";
import LoginPage from "../pages/login/loginRegister";
import NotificationPage from "../pages/NotificationPage";
import ParticipationHistory from '../pages/ParticipationHistory';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "rules",
        element: <Rules />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "post",
        element: <Post />
      },
      {
        path: "create-post",
        element: <CreatePost />
      },
      {
        path: "notifications",
        element: <NotificationPage />
      },
      {
        path: "participation-history",
        element: <ParticipationHistory />
      }
    ]
  }
]);

export default router;