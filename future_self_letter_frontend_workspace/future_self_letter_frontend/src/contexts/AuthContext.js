import React, { createContext, useContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * AuthContext provides user authentication state and methods.
 */
const AuthContext = createContext();

// PUBLIC_INTERFACE
/**
 * useAuth is a custom hook to access authentication state and actions.
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Simple (demo) user storage (replace with real backend or OAuth as needed).
 */
const LOCAL_USER_KEY = "future_self_letter_user";

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USER_KEY));
  } catch (e) {
    return null;
  }
}

function setStoredUser(user) {
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
}

function clearStoredUser() {
  localStorage.removeItem(LOCAL_USER_KEY);
}

/**
 * Mock/Local authentication for demonstration.
 * Replace with real API calls for production use.
 */
const DEMO_USERS = [
  { username: "alice", password: "futureme", name: "Alice" },
  { username: "bob", password: "lettertomorrow", name: "Bob" }
];

// PUBLIC_INTERFACE
/**
 * <AuthProvider> supplies auth state and actions to children.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (user) setStoredUser(user);
    else clearStoredUser();
  }, [user]);

  // PUBLIC_INTERFACE
  // Handles sign in. Returns true on success, error string on failure.
  const signIn = async (username, password) => {
    setAuthLoading(true);
    setAuthError("");
    // Simulates "backend" check
    await new Promise((r) => setTimeout(r, 600));
    const found = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ username: found.username, name: found.name });
      setAuthLoading(false);
      return true;
    }
    setAuthLoading(false);
    setAuthError("Invalid username or password");
    return false;
  };

  // PUBLIC_INTERFACE
  // Sign out user
  const signOut = () => {
    setUser(null);
    setAuthError("");
  };

  // DEBUG: allows simplified "register" for demo, saves to memory only.
  const register = async (username, name, password) => {
    setAuthLoading(true);
    setAuthError("");
    await new Promise((r) => setTimeout(r, 600));
    if (DEMO_USERS.find((u) => u.username === username)) {
      setAuthError("Username already exists");
      setAuthLoading(false);
      return false;
    }
    DEMO_USERS.push({ username, password, name });
    setUser({ username, name });
    setAuthLoading(false);
    return true;
  };

  const value = {
    user,
    signIn,
    signOut,
    register,
    authLoading,
    authError,
    setAuthError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
