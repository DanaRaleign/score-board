export const APP_URL = "https://score-board-orpin.vercel.app";
export const APP_NAME = "score-board";
export const APP_DESCRIPTION =
  "Submit your score, climb the live leaderboard, and track rank momentum on Base.";
export const APP_TAGLINE = "Race the board";
export const APP_ICON_URL = `${APP_URL}/api/miniapp-icon`;
export const APP_SPLASH_URL = `${APP_URL}/api/miniapp-splash`;
export const APP_IMAGE_URL = `${APP_URL}/api/miniapp-image`;

export const MINIAPP_EMBED = JSON.stringify({
  version: "next",
  imageUrl: APP_IMAGE_URL,
  button: {
    title: "Open App",
    action: {
      type: "launch_miniapp",
      url: APP_URL,
    },
  },
});
