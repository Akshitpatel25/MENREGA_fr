import DashboardLayout from "./components/dashboardLayout/DashboardLayout";
import { Outlet } from "react-router-dom";

export default function App() {
  return <DashboardLayout >
    <Outlet/>
  </DashboardLayout>;
}

