import { Route, Routes, BrowserRouter } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { AdminScreen } from "../components/admin/AdminScreen";
import { EmployeeScreen } from "../components/employee/EmployeeScreen";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*  <Route path="/login" element={<LoginScreen />} /> */}

        <Route
          path="/login"
          element={
            <PublicRouter>
              <LoginScreen />
            </PublicRouter>
          }
        />

        <Route
          path="/employee"
          element={
            <PrivateRouter>
              <EmployeeScreen />
            </PrivateRouter>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRouter>
              <AdminScreen />
            </PrivateRouter>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRouter>
              <EmployeeScreen />
            </PrivateRouter>
          }
        />
        {/* <Route path="/*" element={<DashboardRoutes />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
