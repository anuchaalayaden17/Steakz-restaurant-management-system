import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2>🥩 Steakz</h2>

      <nav>
        {role === "ADMIN" && (
          <>
            <Link to="/admin">📈 Dashboard</Link>
            <Link to="/admin/users">👥 User Management</Link>
            <Link to="/admin/customers">🧑 Customer Management</Link>
            <Link to="/admin/menu">🍽️ Menu Management</Link>
            <Link to="/admin/inventory">📦 Inventory Management</Link>
            <Link to="/admin/tables">🍴 Table Management</Link>
            <Link to="/admin/orders">🧾 Orders Overview</Link>
          </>
        )}

        {role === "WAITER" && (
          <Link to="/waiter">📝 Waiter POS</Link>
        )}

        {role === "CHEF" && (
          <Link to="/chef">👨‍🍳 Kitchen Orders</Link>
        )}

        {role === "CASHIER" && (
          <Link to="/cashier">💳 Payments</Link>
        )}

        {role === "HM" && (
          <Link to="/hm">📊 HQ Analytics</Link>
        )}

        {role === "BM" && (
          <Link to="/bm">🏢 Branch Dashboard</Link>
        )}

        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            textAlign: "left",
            padding: "12px 0",
            fontSize: "18px",
          }}
        >
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;