import { SnackbarProvider } from "notistack";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./data/index.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <SnackbarProvider
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      maxSnack={5}
    >
      <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </Provider>
    </SnackbarProvider>
  </>
);
