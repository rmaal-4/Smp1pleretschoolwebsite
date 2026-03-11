import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import GuruDashboard from "./pages/guru/GuruDashboard";
import SiswaDashboard from "./pages/siswa/SiswaDashboard";
import WaliDashboard from "./pages/wali/WaliDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/guru",
    Component: GuruDashboard,
  },
  {
    path: "/siswa",
    Component: SiswaDashboard,
  },
  {
    path: "/wali",
    Component: WaliDashboard,
  },
]);
