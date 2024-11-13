import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useLoginMutation } from "../../data/auth/auth.api";
import { loginThunk } from "../../data/auth/auth.thunk";
import { useAppDispatch } from "../../hooks/reduxHooks";

function LoginPage() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const handleLogin = async () => {
    await login({
      userName: userName,
      password: password,
    })
      .unwrap()
      .then((res) => {
        dispatch(loginThunk(res.result));
        enqueueSnackbar("Login successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log("err", err);
        enqueueSnackbar("Login failed", { variant: "error" });
      });
  };

  return (
    <div className="flex justify-center">
      <div className="w-48 flex flex-col gap-4 ">
        <div className="flex flex-col mt-12">
          <div>{"Username"}</div>
          <input
            className="px-4 w-full py-2 border-gray-600 border rounded-lg"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <div>
          <div>{"Password"}</div>
          <input
            className="px-4 w-full py-2 border-gray-600 border rounded-lg"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
          />
        </div>
        <button
          disabled={isLoginLoading}
          onClick={handleLogin}
          className="px-4 py-2 bg-gray-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
