import { ImageResponse } from "next/og";
import { APP_NAME } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") ?? "hub";

  const labelMap: Record<string, string> = {
    hub: "Competition Hub",
    submit: "Submit Score",
    rank: "My Rank",
    board: "Leaderboard",
  };

  const label = labelMap[view] ?? "Competition Hub";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #fff7d1 0%, #ffffff 45%, #eef4ff 100%)",
          padding: "52px",
          color: "#0F172A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#475569" }}>
            Base Mini App
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: 180,
              height: 52,
              borderRadius: 999,
              background: "#0F172A",
              color: "#FFFFFF",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Live Board
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 124, fontWeight: 800, lineHeight: 0.88, textTransform: "uppercase" }}>
            {APP_NAME}
          </div>
          <div style={{ fontSize: 54, fontWeight: 700 }}>{label}</div>
          <div style={{ fontSize: 30, color: "#475569" }}>
            Submit results. Track rank. Race the board.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18 }}>
          {[
            { text: "Rank Focus", bg: "#FACC15" },
            { text: "Score Momentum", bg: "#F97316" },
            { text: "Base Attribution", bg: "#1D4ED8", color: "#FFFFFF" },
          ].map((chip) => (
            <div
              key={chip.text}
              style={{
                display: "flex",
                padding: "16px 22px",
                borderRadius: 18,
                background: chip.bg,
                color: chip.color ?? "#0F172A",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {chip.text}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
