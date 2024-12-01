import { Navigate, Outlet } from "react-router-dom";
import { AuthState } from "../data/auth/auth.slice";
import { APP_ROUTE } from "../helpers/constants/route.constant";
import { useAppSelector } from "../hooks/reduxHooks";

function PrivateRoute() {
  const { isAuthenticated }: AuthState = useAppSelector((state) => state.auth);
  return isAuthenticated ? <Outlet /> : <Navigate to={APP_ROUTE.AUTH.LOGIN} />;
}

export default PrivateRoute;
