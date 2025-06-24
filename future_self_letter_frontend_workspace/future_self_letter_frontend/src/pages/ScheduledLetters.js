import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import theme from "../theme";
import { getLetters } from "../utils/letters";

export default function ScheduledLetters() {
  const { user } = useAuth();
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      setLetters(await getLetters(user.username));
      setLoading(false);
    })();
  }, [user]);

  if (!user) return <Navigate to="/signin" />;
  if (loading) return <div style={{ paddingTop: 90, textAlign: "center" }}>Loading ...</div>;

  const sorted = [...letters].sort((a, b) => new Date(a.deliverOn) - new Date(b.deliverOn));

  return (
    <div className="container" style={{paddingTop: 90, paddingBottom: 36}}>
      <h2 style={{color: theme.colors.primary, marginBottom: 20, fontWeight: 600 }}>Scheduled Letters</h2>
      {sorted.length === 0 && (
        <div style={{marginTop: 50, fontSize: 17, color: theme.colors.textSecondary}}>
          No scheduled letters yet.
        </div>
      )}
      <div style={cardGridStyle}>
        {sorted.map((letter) => (
          <LetterCard key={letter.id} letter={letter} />
        ))}
      </div>
    </div>
  );
}

function LetterCard({ letter }) {
  const [show, setShow] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const canShow = today >= letter.deliverOn;

  return (
    <div style={cardStyle}>
      <div>
        <div style={{color: theme.colors.secondary, fontWeight: 600}}>
          To be delivered on: <span>{letter.deliverOn}</span>
        </div>
        <div style={{fontSize: 13, color: theme.colors.textSecondary, marginBottom: 10}}>
          Written on: {new Date(letter.createdAt).toLocaleDateString()}
        </div>
      </div>
      <button
        style={{
          ...cardBtnStyle,
          background: canShow ? theme.colors.accent : theme.colors.primary,
          opacity: canShow ? 1 : 0.65
        }}
        disabled={!canShow}
        onClick={() => setShow((v) => !v)}
      >
        {canShow ? (show ? "Hide Letter" : "Reveal Letter") : "Locked"}
      </button>
      {show && (
        <div style={letterContentStyle}>
          <strong>Letter:</strong>
          <p style={{whiteSpace: "pre-wrap", fontSize: 16, color: theme.colors.text}}>
            {letter.content}
          </p>
        </div>
      )}
    </div>
  );
}

const cardGridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 22,
  marginTop: 7
};
const cardStyle = {
  background: "#fff",
  color: theme.colors.primary,
  borderRadius: 12,
  boxShadow: "0 4px 24px 0 rgba(0,0,36,0.07)",
  padding: 22,
  marginBottom: 10,
  minWidth: 280,
  maxWidth: 380,
  flex: "1 1 300px",
  display: "flex",
  flexDirection: "column",
  gap: 8
};
const cardBtnStyle = {
  background: theme.colors.accent,
  color: "#fff",
  fontWeight: 500,
  border: "none",
  borderRadius: 4,
  padding: "8px 0",
  fontSize: 16,
  margin: "10px 0",
  cursor: "pointer"
};
const letterContentStyle = {
  background: theme.colors.bgAlt,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: 6,
  marginTop: 7,
  fontSize: 15,
  padding: 10
};
