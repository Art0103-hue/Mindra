import { createBrowserRouter } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/cadastro",
    Component: Register,
  },
  {
    path: "/esqueci-senha",
    Component: ForgotPassword,
  },
]);