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
          background: "linear-gradient(135deg, #FACC15 0%, #F97316 100%)",
          borderRadius: 220,
          color: "#0F172A",
          fontFamily: "sans-serif",
          fontSize: 230,
          fontWeight: 900,
          letterSpacing: 8,
        }}
      >
        SB
      </div>
    ),
    { width: 512, height: 512 },
  );
}
