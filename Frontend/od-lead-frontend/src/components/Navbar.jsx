import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">

        <Link to="/" className="logo">
          FinanceAssist
        </Link>

        <nav className="nav-links">
          <a href="/#products">Products</a>
          <a href="/#calculator">Calculator</a>
          <a href="/#how-it-works">How It Works</a>
          <a href="/#faq">FAQ</a>
          <a href="/#apply">OverDraftForm</a>
        </nav>

        <a
          href="/#apply"
          className="btn btn-primary"
        >
          Check Eligibility
        </a>

      </div>
    </header>
  );
}