import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <h2>Steakz</h2>

      <nav>
        <Link to="/admin">Admin Dashboard</Link>
        <Link to="/hm">HQ Manager</Link>
        <Link to="/bm">Branch Manager</Link>
        <Link to="/chef">Chef</Link>
        <Link to="/cashier">Cashier</Link>
        <Link to="/waiter">Waiter</Link>

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
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;