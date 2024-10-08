import { ImageResponse } from "next/og";
import { webConfig } from "@/config";

export const runtime = "edge";

export const alt = webConfig.description;
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: "linear-gradient(45deg, rgba(59, 178, 93, 0.20) 0%, rgba(59, 121, 178, 0.20) 100%)",
                    display: "flex",
                    height: "100%",
                    width: "100%",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    letterSpacing: "-.02em",
                    padding: "64px 48px",
                    color: "#222",
                }}
            >
                <div style={{ display: "flex" }}>
                    <span
                        style={{
                            fontSize: "24px",
                            fontWeight: 400,
                        }}
                    >
                        {webConfig.name}
                    </span>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        width: "auto",
                        maxWidth: "70%",
                    }}
                >
                    <p
                        style={{
                            fontWeight: "bold",
                            fontSize: "48px",
                            lineHeight: 1.1,
                        }}
                    >
                        {webConfig.name}
                    </p>

                    <p
                        style={{
                            fontSize: "20px",
                        }}
                    >
                        {webConfig.description}
                    </p>
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
