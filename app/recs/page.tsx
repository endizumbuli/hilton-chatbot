export default function RecsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "16px" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#1f1bff",
          color: "white",
          padding: "14px 16px",
          borderRadius: 12,
          marginBottom: 16,
          textAlign: "center",
          fontWeight: 700,
        }}
      >
        Recommendations
      </div>

      {/* simple placeholder list */}
      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {[
          { title: "Local Seafood Spot", detail: "5 min walk • $$ • 4.7★" },
          { title: "Sunset Beach", detail: "10 min drive • Free • Best at 7:45 PM" },
          { title: "Coffee & Bakery", detail: "2 min walk • $ • Opens 6:30 AM" },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: 14,
            }}
          >
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div style={{ color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{item.detail}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
