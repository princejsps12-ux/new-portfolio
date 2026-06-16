import { ImageResponse } from "next/og";
import { site, contact } from "@/lib/data";

export const runtime = "edge";
export const alt = `${site.name} — Software Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic Open Graph card so recruiter link previews look intentional.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #090C11 0%, #0F141B 55%, #0b1410 100%)",
          padding: "72px",
          fontFamily: "monospace",
          color: "#E2E8F0",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#4ADE80",
              boxShadow: "0 0 24px #4ADE80",
            }}
          />
          <div style={{ fontSize: 24, color: "#4ADE80", letterSpacing: 4 }}>
            ALL SYSTEMS OPERATIONAL
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#F8FAFC" }}>
            {site.name}
          </div>
          <div style={{ fontSize: 32, color: "#94A3B8", maxWidth: 900 }}>
            Full-Stack · Backend · AI Agent Developer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#64748B",
            borderTop: "1px solid #1F2935",
            paddingTop: 24,
          }}
        >
          <span>4 production platforms · 3 national hackathons</span>
          <span style={{ color: "#4ADE80" }}>{contact.github.label}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
