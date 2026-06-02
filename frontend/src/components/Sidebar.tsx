import { Link } from "react-router-dom";

function Sidebar() {
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
        <Link to="/login">Logout</Link>
      </nav>
    </aside>
  );
}

export default Sidebar;