import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import UserManagement from "../pages/UserManagement/UserManagement";
import MenuManagement from "../pages/MenuManagement/MenuManagement";
import InventoryManagement from "../pages/InventoryManagement/InventoryManagement";
import TableManagement from "../pages/TableManagement/TableManagement";
import CustomerManagement from "../pages/CustomerManagement/CustomerManagement";
import OrderManagement from "../pages/OrderManagement/OrderManagement";

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

      <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute allowedRoles={["ADMIN"]}><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/customers" element={<ProtectedRoute allowedRoles={["ADMIN"]}><CustomerManagement /></ProtectedRoute>} />
      <Route path="/admin/menu" element={<ProtectedRoute allowedRoles={["ADMIN"]}><MenuManagement /></ProtectedRoute>} />
      <Route path="/admin/inventory" element={<ProtectedRoute allowedRoles={["ADMIN"]}><InventoryManagement /></ProtectedRoute>} />
      <Route path="/admin/tables" element={<ProtectedRoute allowedRoles={["ADMIN"]}><TableManagement /></ProtectedRoute>} />
      <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={["ADMIN"]}><OrderManagement /></ProtectedRoute>} />

      <Route path="/hm" element={<ProtectedRoute allowedRoles={["HM"]}><HMDashboard /></ProtectedRoute>} />
      <Route path="/bm" element={<ProtectedRoute allowedRoles={["BM"]}><BMDashboard /></ProtectedRoute>} />
      <Route path="/chef" element={<ProtectedRoute allowedRoles={["CHEF"]}><ChefDashboard /></ProtectedRoute>} />
      <Route path="/cashier" element={<ProtectedRoute allowedRoles={["CASHIER"]}><CashierDashboard /></ProtectedRoute>} />
      <Route path="/waiter" element={<ProtectedRoute allowedRoles={["WAITER"]}><WaiterDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;