import { createBrowserRouter } from "react-router-dom";
import { APP_ROUTE } from "../helpers/constants/route.constant";
import MainLayout from "../layouts/MainLayout";
import PrivateRoute from "../layouts/PrivateRoute";
import PublicRoute from "../layouts/PublicRoute";
import ExplorePage from "../pages/private/ExplorePage/ExplorePage";
import HomePage from "../pages/private/HomePage/HomePage";
import MessagesPage from "../pages/private/MessagePage/MessagesPage";
import ProfilePage from "../pages/private/ProfilePage/ProfilePage";
import LoginPage from "../pages/public/LoginPage";
import SignUpPage from "../pages/public/SignUpPage";

export const router = createBrowserRouter([
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            path: APP_ROUTE.MAIN.HOME,
            element: <HomePage />,
          },
          {
            path: APP_ROUTE.MAIN.EXPLORE,
            element: <ExplorePage />,
          },
          {
            path: APP_ROUTE.MAIN.MESSAGES,
            element: <MessagesPage />,
          },
          {
            path: APP_ROUTE.MAIN.PROFILE,
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: APP_ROUTE.LOGIN,
        element: <LoginPage />,
      },
      {
        path: APP_ROUTE.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
]);
