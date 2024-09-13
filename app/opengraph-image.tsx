import { ImageResponse } from "next/og";
import { webConfig } from "@/config";

export const runtime = "edge";

export const alt = webConfig.description;
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

// Default image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(45deg, #4158D0, #C850C0, #FFCC70)",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter",
                    color: "white",
                }}
            >
                <div
                    style={{
                        fontSize: "72px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        textAlign: "center",
                        maxWidth: "80%",
                    }}
                >
                    {webConfig.name}
                </div>
                <div
                    style={{
                        fontSize: "36px",
                        maxWidth: "70%",
                        textAlign: "center",
                        opacity: 0.8,
                    }}
                >
                    {webConfig.description}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}

// Post-specific image generation
export async function PostImage(title: string, author: string, date: string) {
    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-end",
                    backgroundImage: "linear-gradient(45deg, #0A2647, #144272, #205295)",
                    fontFamily: "Inter",
                    color: "white",
                    padding: "60px",
                }}
            >
                <span
                    style={{
                        position: "absolute",
                        top: "40px",
                        left: "60px",
                        fontSize: "24px",
                        fontWeight: "bold",
                        opacity: 0.8,
                    }}
                >
                    {webConfig.name}
                </span>
                <span
                    style={{
                        fontSize: "64px",
                        fontWeight: "bold",
                        marginBottom: "20px",
                        maxWidth: "80%",
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </span>
                <span
                    style={{
                        fontSize: "24px",
                        opacity: 0.8,
                    }}
                >
                    By {author} • {date}
                </span>
                <span
                    style={{
                        position: "absolute",
                        bottom: "40px",
                        right: "60px",
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                    }}
                />
                <span
                    style={{
                        position: "absolute",
                        top: "80px",
                        right: "100px",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
