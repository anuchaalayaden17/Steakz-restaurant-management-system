import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import HMDashboard from "../pages/HMDashboard/HMDashboard";
import BMDashboard from "../pages/BMDashboard/BMDashboard";
import ChefDashboard from "../pages/ChefDashboard/ChefDashboard";
import CashierDashboard from "../pages/CashierDashboard/CashierDashboard";
import WaiterDashboard from "../pages/WaiterDashboard/WaiterDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hm"
        element={
          <ProtectedRoute allowedRoles={["HM"]}>
            <HMDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bm"
        element={
          <ProtectedRoute allowedRoles={["BM"]}>
            <BMDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chef"
        element={
          <ProtectedRoute allowedRoles={["CHEF"]}>
            <ChefDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cashier"
        element={
          <ProtectedRoute allowedRoles={["CASHIER"]}>
            <CashierDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/waiter"
        element={
          <ProtectedRoute allowedRoles={["WAITER"]}>
            <WaiterDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;