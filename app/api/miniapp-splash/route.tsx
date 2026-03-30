import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          background: "linear-gradient(135deg, #ffffff 0%, #fff7d1 45%, #eef4ff 100%)",
          color: "#0F172A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 0.88 }}>score-board</div>
        <div style={{ fontSize: 44, marginTop: 16, color: "#475569" }}>Race the board</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
