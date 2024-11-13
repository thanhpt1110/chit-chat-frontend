import { Navigate, Outlet } from "react-router-dom";
import { AuthState } from "../data/auth/auth.slice";
import { APP_ROUTE } from "../helpers/constants/route.constant";
import { useAppSelector } from "../hooks/reduxHooks";

function PublicRoute() {
  const { isAuthenticated }: AuthState = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to={APP_ROUTE.MAIN.HOME} /> : <Outlet />;
}

export default PublicRoute;
