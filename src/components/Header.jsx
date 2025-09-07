import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../asserts/Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]); // close menu on route change

  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="/">
          ⚡ NetMonitor
        </a>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${open ? "open" : ""}`} role="navigation">
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/"
          >
            Dashboard
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/devices"
          >
            Devices
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/history"
          >
            Traffic History
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/alerts"
          >
            Alerts
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/reports"
          >
            Reports
          </NavLink>
          <NavLink
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            to="/predict"
          >
            Predict
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
