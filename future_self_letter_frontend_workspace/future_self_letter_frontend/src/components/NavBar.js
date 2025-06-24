import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import theme from "../theme";

function NavBar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  function handleSignOut() {
    signOut();
    navigate("/signin");
  }

  return (
    <nav style={navStyle}>
      <div style={navInnerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link style={logoStyle} to="/">
            <span style={{ color: theme.colors.accent, fontWeight: 800 }}>✉</span>
            <span>Future Self Letter</span>
          </Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {user && (
            <>
              <NavLinkTab to="/compose" label="Compose" active={isActive("/compose")} />
              <NavLinkTab to="/scheduled" label="Scheduled" active={isActive("/scheduled")} />
              <span style={{ marginLeft: 10, color: theme.colors.textSecondary, fontSize: 15 }}>
                Hi, {user.name}
              </span>
              <button style={signOutBtnStyle} onClick={handleSignOut}>
                Sign out
              </button>
            </>
          )}
          {!user && (
            <NavLinkTab to="/signin" label="Sign In" active={isActive("/signin")} />
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLinkTab({ to, label, active }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        fontWeight: 500,
        fontSize: 16,
        color: active ? theme.colors.accent : theme.colors.primary,
        padding: "5px 15px",
        borderRadius: "20px",
        background: active ? theme.colors.bgAlt : "transparent",
        transition: "background 0.15s"
      }}
    >
      {label}
    </Link>
  );
}

const navStyle = {
  background: theme.colors.bg,
  borderBottom: `1px solid ${theme.colors.border}`,
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 100,
  boxShadow: "0px 2px 8px 0 rgba(50,55,80,0.07)"
};
const navInnerStyle = {
  maxWidth: 900,
  margin: "0 auto",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  height: 64,
  boxSizing: "border-box"
};
const logoStyle = {
  textDecoration: "none",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: 8,
  fontSize: 19,
  color: theme.colors.primary
};
const signOutBtnStyle = {
  background: "none",
  color: theme.colors.accent,
  border: "none",
  fontWeight: 500,
  fontSize: 15,
  marginLeft: 8,
  cursor: "pointer"
};

export default NavBar;
