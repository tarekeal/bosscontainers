import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Boss Containers - Container rental in Brussels";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e293b",
          position: "relative",
        }}
      >
        {/* Amber accent bar at top */}
        <div
          style={{
            width: "100%",
            height: "6px",
            backgroundColor: "#d97706",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 80px",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "20px",
            }}
          >
            <span
              style={{
                fontSize: "96px",
                fontWeight: 700,
                color: "#d97706",
                letterSpacing: "-2px",
              }}
            >
              BOSS
            </span>
            <span
              style={{
                fontSize: "96px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-2px",
              }}
            >
              CONTAINERS
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              color: "#94a3b8",
              marginTop: "24px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Container Rental | Brussels & Region | 8-30m³
          </div>
        </div>

        {/* Bottom amber accent bar */}
        <div
          style={{
            width: "100%",
            height: "6px",
            backgroundColor: "#d97706",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
