import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import theme from "../theme";

export default function SignIn() {
  const { user, signIn, authLoading, authError, setAuthError, register } = useAuth();
  const [formState, setForm] = useState({
    username: "",
    password: ""
  });
  const [showRegister, setShowRegister] = useState(false);
  const [registerName, setRegisterName] = useState("");
  const [registerPwd, setRegisterPwd] = useState("");
  const navigate = useNavigate();

  if (user) return <Navigate to="/scheduled" />;

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");
    const success = await signIn(formState.username, formState.password);
    if (success) navigate("/scheduled");
  }

  async function handleRegister(e) {
    e.preventDefault();
    setAuthError("");
    if (!registerName.trim() || !formState.username.trim() || !registerPwd.trim()) {
      setAuthError("Please fill all registration fields");
      return;
    }
    const success = await register(formState.username, registerName, registerPwd);
    if (success) navigate("/scheduled");
  }

  return (
    <div style={centerContentStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{marginBottom: 20, color: theme.colors.primary}}>Sign In</h2>
        <label>
          Username
          <input
            style={inputStyle}
            value={formState.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            disabled={authLoading}
            autoFocus
            autoComplete="username"
            placeholder="Your username"
          />
        </label>
        <label>
          Password
          <input
            style={inputStyle}
            value={formState.password}
            type="password"
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            disabled={authLoading}
            autoComplete="current-password"
            placeholder="Your password"
          />
        </label>
        {authError && <div style={errorStyle}>{authError}</div>}
        <button
          style={submitBtnStyle}
          type="submit"
          disabled={authLoading}
        >
          {authLoading ? "Signing in..." : "Sign In"}
        </button>
        {!showRegister && (
          <span style={{marginTop: 18, fontSize: 15}}>
            New here?{" "}
            <button
              type="button"
              style={{background: "none", border: "none", color: theme.colors.accent, cursor: "pointer"}}
              onClick={() => {
                setShowRegister(true);
                setAuthError("");
              }}
            >
              Register
            </button>
          </span>
        )}
      </form>
      {showRegister && (
        <form style={formStyle} onSubmit={handleRegister}>
          <h2 style={{marginBottom: 20, color: theme.colors.primary}}>Register</h2>
          <label>
            Name
            <input
              style={inputStyle}
              value={registerName}
              onChange={e => setRegisterName(e.target.value)}
              placeholder="Your full name"
            />
          </label>
          <label>
            Username
            <input
              style={inputStyle}
              value={formState.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              placeholder="Choose a username"
            />
          </label>
          <label>
            Password
            <input
              style={inputStyle}
              value={registerPwd}
              type="password"
              onChange={e => setRegisterPwd(e.target.value)}
              placeholder="Pick a password"
            />
          </label>
          {authError && <div style={errorStyle}>{authError}</div>}
          <button style={submitBtnStyle} type="submit">
            {authLoading ? "Registering..." : "Register"}
          </button>
          <span>
            <button type="button" style={{background: "none", border: "none", color: theme.colors.primary, marginTop: 16, cursor: "pointer"}} onClick={() => setShowRegister(false)}>Back to sign in</button>
          </span>
        </form>
      )}
    </div>
  );
}

// Styles
const centerContentStyle = {
  minHeight: "calc(100vh - 75px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const formStyle = {
  background: "#fff",
  padding: 32,
  borderRadius: "10px",
  boxShadow: "0 4px 36px 0 rgba(0,0,36,0.10)",
  minWidth: 320,
  margin: "20px 18px",
  display: "flex",
  flexDirection: "column",
  gap: 15,
  alignItems: "stretch",
  maxWidth: 370
};
const inputStyle = {
  fontSize: 16,
  padding: "8px 11px",
  marginTop: 6,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 5,
  marginBottom: 10,
  background: "#f9fafc",
  color: theme.colors.primary,
  outline: "none",
  width: "100%"
};
const submitBtnStyle = {
  background: theme.colors.accent,
  color: "#fff",
  border: 0,
  borderRadius: 4,
  padding: "11px 8px",
  fontWeight: 600,
  fontSize: 16,
  marginTop: 10,
  cursor: "pointer"
};
const errorStyle = {
  color: "#cc3051",
  fontWeight: 500,
  fontSize: "0.98rem",
  marginBottom: 6
};
