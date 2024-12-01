import { enqueueSnackbar } from "notistack";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ImageWithFallback from "../../components/ImageWithFallback";
import { useLoginMutation } from "../../data/auth/auth.api";
import { loginThunk } from "../../data/auth/auth.thunk";
import { APP_ROUTE } from "../../helpers/constants/route.constant";
import { useAppDispatch } from "../../hooks/reduxHooks";

type LoginInput = {
  userName: string;
  password: string;
};

function LoginPage() {
  const formMethods = useForm<LoginInput>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const { control, handleSubmit } = formMethods;

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const onLogin = async (data: LoginInput) => {
    await login({
      userName: data.userName,
      password: data.password,
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

  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full gap-8 flex-row flex-wrap justify-center items-center">
      <ImageWithFallback
        className="h-96"
        alt=""
        src="../login-iphone-frame.png"
      />
      <FormProvider {...formMethods}>
        <form
          className="flex border py-16 px-8 flex-col gap-4 w-full max-w-[300px]"
          onSubmit={handleSubmit(onLogin)}
        >
          <ImageWithFallback
            className="w-48 self-center"
            src="/ChitChatLong.svg"
            alt="ChitChat"
          />
          <div className="w-full px-3 text-xs py-2 focus:outline-none bg-gray-100 border border-gray-300 rounded-md">
            <Controller
              control={control}
              name="userName"
              render={({ field }) => (
                <input
                  {...field}
                  autoComplete="off"
                  className="focus:outline-none bg-transparent w-full"
                  placeholder="Enter your username, phone or email"
                />
              )}
            />
          </div>
          <div className="w-full px-3 text-xs py-2 focus:outline-none bg-gray-100 border border-gray-300 rounded-md">
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <input
                  {...field}
                  className="focus:outline-none bg-transparent w-full"
                  placeholder="Enter your password"
                  type="password"
                />
              )}
            />
          </div>

          <button
            disabled={isLoginLoading}
            onClick={handleSubmit(onLogin)}
            className="px-4 text-xs font-semibold text-white py-2 bg-[#4BB4F8] rounded-md"
          >
            Login
          </button>

          <div className="text-xs text-gray-500 flex flex-row justify-center gap-2">
            Don't have an account?{" "}
            <button
              onClick={() => {
                navigate(APP_ROUTE.AUTH.SIGNUP);
              }}
              className="text-[#4BB4F8] text-xs font-medium "
            >
              Sign up
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default LoginPage;
