import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import SignIn from "./pages/SignIn";
import ComposeLetter from "./pages/ComposeLetter";
import ScheduledLetters from "./pages/ScheduledLetters";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/scheduled" /> : <Landing />}
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/compose" element={<ComposeLetter />} />
      <Route path="/scheduled" element={<ScheduledLetters />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <NavBar />
          <main style={{ paddingTop: 80 }}>
            <AppRoutes />
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Landing() {
  // PUBLIC_INTERFACE
  // App landing page intro
  return (
    <div className="container">
      <div className="hero" style={{ minHeight: 420 }}>
        <div className="subtitle" style={{ color: "#FF69B4", fontWeight: 500 }}>
          Cherish your story
        </div>
        <h1 className="title" style={{ color: "#05004d", marginBottom: 7 }}>
          Write a letter to <br />your future self.
        </h1>
        <div className="description" style={{ color: "#555", fontWeight: 400 }}>
          Express inspiration, dreams, or motivation—your words will reach you when you need them most.<br />
          Private, simple, and just for you.
        </div>
        <a href="/signin">
          <button className="btn btn-large" style={{ background: "#FF69B4" }}>
            Get Started
          </button>
        </a>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ padding: 60, textAlign: "center", color: "#9499aa" }}>
      <h2>404: Page Not Found</h2>
      <div>
        <a href="/" style={{ color: "#FF69B4" }}>
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default App;