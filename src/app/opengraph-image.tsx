import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "תרחיב";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #030712 0%, #155e75 60%, #7e22ce 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 220,
            fontWeight: 900,
            background:
              "linear-gradient(135deg, #22d3ee, #a855f7 50%, #67e8f9)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: 1,
          }}
        >
          תרחיב
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          נושאים ישראליים, בצורה שלא ראית
        </div>
      </div>
    ),
    size,
  );
}
