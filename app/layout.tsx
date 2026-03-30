import type { ReactNode } from "react";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./providers";

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
        <meta name="application-name" content="score-board" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="description"
          content="Submit a score, climb the race board, and track leaderboard movement on Base."
        />
        <meta
          name="keywords"
          content="Base, leaderboard, score board, ranking, mini app, game score"
        />
        <meta property="og:title" content="score-board" />
        <meta
          property="og:description"
          content="A race-style mini app for score submission and leaderboard tracking on Base."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="score-board" />
        <meta
          name="twitter:description"
          content="Post your score, verify your rank, and keep up with live leaderboard movement."
        />
      </head>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
