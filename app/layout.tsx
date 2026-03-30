import type { ReactNode } from "react";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";
import { APP_DESCRIPTION, APP_IMAGE_URL, APP_NAME, APP_URL, MINIAPP_EMBED } from "@/lib/site";

const displayFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69ca300854fba99e37411018" />
        <meta
          name="talentapp:project_verification"
          content="ccb4a87aeb728e3921bed2ba782a98fc1671f9f4fc476c866986e3517a2563229371a84691ab6a1be2efc00004473c761b9bb677ca841d1da2438bd622af1688"
        />
        <meta name="fc:miniapp" content={MINIAPP_EMBED} />
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="keywords" content="base, leaderboard, scores, mini app, ranking, competition" />
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content={APP_DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={APP_URL} />
        <meta property="og:image" content={APP_IMAGE_URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={APP_NAME} />
        <meta name="twitter:description" content={APP_DESCRIPTION} />
        <meta name="twitter:image" content={APP_IMAGE_URL} />
        <link rel="canonical" href={APP_URL} />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
