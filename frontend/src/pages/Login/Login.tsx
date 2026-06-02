import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@steakz.com");
  const [password, setPassword] = useState("Admin123!");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") navigate("/admin");
      else if (user.role === "HM") navigate("/hm");
      else if (user.role === "BM") navigate("/bm");
      else if (user.role === "CHEF") navigate("/chef");
      else if (user.role === "CASHIER") navigate("/cashier");
      else if (user.role === "WAITER") navigate("/waiter");
      else setMessage("Unknown user role.");
    } catch (error) {
      setMessage("Login failed. Check email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="login-logo">
          Steakz
        </Link>

        <h1>Welcome Back</h1>
        <p>Sign in to access the Steakz management dashboard.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@steakz.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Admin123!"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign In</button>
        </form>

        {message && <p className="login-error">{message}</p>}
      </div>
    </div>
  );
}

export default Login;