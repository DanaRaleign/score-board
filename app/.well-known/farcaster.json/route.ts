import { NextResponse } from "next/server";
import { APP_DESCRIPTION, APP_ICON_URL, APP_IMAGE_URL, APP_NAME, APP_SPLASH_URL, APP_TAGLINE, APP_URL } from "@/lib/site";

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: process.env.FARCASTER_HEADER ?? "",
      payload: process.env.FARCASTER_PAYLOAD ?? "",
      signature: process.env.FARCASTER_SIGNATURE ?? "",
    },
    frame: {
      version: "1",
      name: APP_NAME,
      iconUrl: APP_ICON_URL,
      homeUrl: APP_URL,
      imageUrl: APP_IMAGE_URL,
      buttonTitle: "Open App",
      splashImageUrl: APP_SPLASH_URL,
      splashBackgroundColor: "#F8FAFC",
      subtitle: "Submit and rank",
      description: APP_DESCRIPTION,
      primaryCategory: "games",
      tags: ["leaderboard", "scores", "ranking", "base", "competition"],
      heroImageUrl: `${APP_IMAGE_URL}?view=board`,
      tagline: APP_TAGLINE,
      ogTitle: APP_NAME,
      ogDescription: APP_DESCRIPTION,
      ogImageUrl: `${APP_IMAGE_URL}?view=hub`,
      screenshotUrls: [
        `${APP_IMAGE_URL}?view=hub`,
        `${APP_IMAGE_URL}?view=submit`,
        `${APP_IMAGE_URL}?view=rank`
      ],
      noindex: false,
    },
  });
}
