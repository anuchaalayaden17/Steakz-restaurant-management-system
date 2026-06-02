import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <header className="home-navbar">
        <h2>Steakz</h2>

        <nav>
          <Link to="/">Home</Link>
          <a href="#">Menu</a>
          <a href="#">Branches</a>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <section className="home-hero">
        <p className="home-tagline">Premium Multi-Branch Restaurant System</p>

        <h1>Steakz Restaurant Management System</h1>

        <p className="home-description">
          Manage branches, staff, menus, orders, payments and reports from one
          centralized restaurant management platform.
        </p>

        <Link to="/login" className="home-button">
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default Home;