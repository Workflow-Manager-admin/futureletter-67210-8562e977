import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import theme from "../theme";
import { saveLetter } from "../utils/letters";

export default function ComposeLetter() {
  const { user } = useAuth();
  const [letter, setLetter] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!user) return <Navigate to="/signin" />;

  function daysOut(dateString) {
    const today = new Date();
    const d = new Date(dateString);
    return Math.round((d - today) / (1000 * 60 * 60 * 24));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!letter.trim() || !date) {
      setMessage("Please write your letter and pick a delivery date.");
      return;
    }
    if (daysOut(date) < 1) {
      setMessage("Pick a future date (minimum: tomorrow).");
      return;
    }
    setSaving(true);
    await saveLetter(user.username, {
      content: letter,
      deliverOn: date,
      createdAt: new Date().toISOString(),
      id: Date.now()
    });
    setSaving(false);
    setMessage("Letter saved! See it in Scheduled Letters.");
    setLetter("");
    setDate("");
    setTimeout(() => navigate("/scheduled"), 1200);
  }

  return (
    <div style={centerContentStyle}>
      <form style={formStyle} onSubmit={handleSubmit}>
        <h2 style={{ color: theme.colors.primary, marginBottom: 18 }}>
          Compose a Future Letter
        </h2>
        <label>
          To be delivered on
          <input
            style={inputStyle}
            type="date"
            value={date}
            min={new Date(Date.now() + 86400000).toISOString().slice(0, 10)}
            onChange={e => setDate(e.target.value)}
            disabled={saving}
            required
          />
        </label>
        <label>
          Your Letter
          <textarea
            style={textareaStyle}
            rows={8}
            value={letter}
            onChange={e => setLetter(e.target.value)}
            placeholder="Write a message to your future self..."
            disabled={saving}
            required
          />
        </label>
        {message && (
          <div style={{ color: "#229769", marginBottom: 10 }}>{message}</div>
        )}
        <button style={submitBtnStyle} type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Letter"}
        </button>
      </form>
    </div>
  );
}

const centerContentStyle = {
  minHeight: "calc(100vh - 80px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};
const formStyle = {
  background: "#fff",
  padding: 32,
  borderRadius: "10px",
  boxShadow: "0 4px 36px 0 rgba(0,0,36,0.10)",
  minWidth: 370,
  margin: "20px 18px",
  display: "flex",
  flexDirection: "column",
  gap: 18,
  alignItems: "stretch",
  maxWidth: 500
};
const inputStyle = {
  fontSize: 16,
  padding: "8px 11px",
  marginTop: 8,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 5,
  marginBottom: 15,
  background: "#eef4fa",
  color: theme.colors.primary,
  outline: "none",
  width: "100%"
};
const textareaStyle = {
  fontSize: 16,
  padding: "12px 11px",
  marginTop: 8,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 8,
  background: "#eef4fa",
  color: theme.colors.primary,
  outline: "none",
  resize: "vertical",
  marginBottom: 10,
  width: "100%"
};
const submitBtnStyle = {
  background: theme.colors.primary,
  color: "#fff",
  border: 0,
  borderRadius: 4,
  padding: "12px 8px",
  fontWeight: 600,
  fontSize: 16,
  marginTop: 8,
  cursor: "pointer"
};
