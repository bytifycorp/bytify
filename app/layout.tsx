import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/custom/header-nav";
import FooterPromotion from "@/components/custom/footer-promotion";
import Footer from "@/components/custom/footer";
import { webConfig } from "@/config";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        default: webConfig.title,
        template: `%s | ${webConfig.title}`,
    },
    description: webConfig.description,
    metadataBase: new URL(webConfig.website_url),
    openGraph: {
        title: webConfig.title,
        description: webConfig.description,
        url: webConfig.website_url,
        siteName: webConfig.name,
        images: [
            {
                url: `${webConfig.website_url}/opengraph-image`,
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: webConfig.title,
        description: webConfig.description,
        images: [`${webConfig.website_url}/opengraph-image`],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <GoogleTagManager gtmId="G-XKX4ZYC6JL" />
            <body className={inter.className}>
                <div className="relative">
                    <HeaderNav />
                    {children}
                    {/* <FooterPromotion /> */}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
