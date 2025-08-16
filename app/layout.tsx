import BottomTabs from "./ui/BottomTabs";

export const metadata = {
  title: "Envoyya",
  description: "Hotel concierge + recommendations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0b0b0b", color: "white", margin: 0 }}>
        {/* Give room for the fixed bottom tabs */}
        <div style={{ minHeight: "100vh", paddingBottom: 72 }}>{children}</div>
        <BottomTabs />
      </body>
    </html>
  );
}
