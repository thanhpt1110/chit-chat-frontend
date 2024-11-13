import { RouterProvider } from "react-router-dom";
import "./App.css";
import { syncAccessTokenThunk } from "./data/auth/auth.thunk";
import { useAppDispatch } from "./hooks/reduxHooks";
import { router } from "./router";

function App() {
  const dispatch = useAppDispatch();
  dispatch(syncAccessTokenThunk());
  return <RouterProvider router={router} />;
}

export default App;
