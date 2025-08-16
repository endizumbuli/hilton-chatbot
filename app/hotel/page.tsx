export default function HotelInfoPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "16px" }}>
      {/* Top bar */}
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
        Hotel Info
      </div>

      {/* Hero image */}
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop"
        alt="Hotel"
        style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 16 }}
      />

      <h1 style={{ fontSize: 28, marginTop: 16, marginBottom: 8, fontWeight: 800 }}>
        Welcome, Baker Ryan!
      </h1>
      <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 16 }}>
        Room — Enjoy your stay at Craigville Beach Inn
      </p>

      {/* Hotel card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: 12,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          padding: 12,
          marginBottom: 20,
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1501117716987-c8e77c1f4b3f?q=80&w=800&auto=format&fit=crop"
          alt="Craigville Beach Inn"
          style={{ width: "100%", height: 90, objectFit: "cover", borderRadius: 12 }}
        />
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>Craigville Beach Inn</div>
          <div style={{ color: "rgba(255,255,255,0.75)" }}>
            369 S Main St, Centerville, MA 02632
          </div>
          <div style={{ marginTop: 6 }}>★★★★★</div>
        </div>
      </div>

      <h2 style={{ fontSize: 20, marginTop: 16, marginBottom: 8, fontWeight: 700 }}>
        Hotel Information:
      </h2>
      <ul style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.9)" }}>
        <li>Check-in: 3:00 PM</li>
        <li>Check-out: 11:00 AM</li>
        <li>Breakfast: 7:30–9:30 AM</li>
        <li>Wi-Fi: Envoyya-Guest (password at front desk)</li>
      </ul>
    </main>
  );
}
