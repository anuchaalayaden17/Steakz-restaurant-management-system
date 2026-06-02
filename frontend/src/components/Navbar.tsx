import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const roleMap: Record<string, string> = {
    "/admin": "ADMIN",
    "/hm": "HQ MANAGER",
    "/bm": "BRANCH MANAGER",
    "/chef": "CHEF",
    "/cashier": "CASHIER",
    "/waiter": "WAITER",
  };

  return (
    <header className="dashboard-navbar">
      <h1>Steakz Restaurant Management System</h1>
      <p>{roleMap[location.pathname] || "USER"}</p>
    </header>
  );
}

export default Navbar;