import { ImageResponse } from "next/og";

export const alt = "Ravi Yadav — Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d9488 0%, #0f172a 55%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700 }}>Ravi Yadav</div>
        <div
          style={{
            fontSize: 26,
            marginTop: 12,
            opacity: 0.92,
            fontWeight: 500,
          }}
        >
          CS & AI Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
