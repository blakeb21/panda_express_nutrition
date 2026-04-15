import { ImageResponse } from "next/og";

export const config = {
  runtime: "edge",
};

export default function handler() {
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
          background: "linear-gradient(90deg, #9d0208 0%, #370617 100%)",
          fontFamily: "Arial, sans-serif",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: 64,
              fontWeight: "bold",
              color: "white",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Panda Express
          </p>
          <p
            style={{
              fontSize: 52,
              fontWeight: "bold",
              color: "#FFD700",
              margin: "8px 0 0",
            }}
          >
            Nutrition Calculator
          </p>
          <p
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.85)",
              margin: "28px 0 0",
              textAlign: "center",
            }}
          >
            Free macro &amp; calorie calculator for every menu item
          </p>
          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "48px",
            }}
          >
            {["Calories", "Protein", "Carbs", "Fat"].map((label) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.35)",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <span
                  style={{ color: "#FFD700", fontSize: 20, fontWeight: "bold" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.5)",
              marginTop: "52px",
            }}
          >
            panda-express-calculator.vercel.app
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
