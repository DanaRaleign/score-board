import { createConfig, createStorage, cookieStorage, http, injected } from "wagmi";
import { base } from "wagmi/chains";
import { baseAccount } from "@wagmi/connectors";
import { APP_ICON_URL, APP_NAME } from "@/lib/site";

const baseRpcUrl =
  process.env.NEXT_PUBLIC_BASE_RPC_URL ?? "https://mainnet.base.org";

export const BUILDER_CODE = "bc_32bz869o";
export const BUILDER_CODE_DATA_SUFFIX =
  "0x62635f3332627a3836396f0b0080218021802180218021802180218021";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    baseAccount({
      appName: APP_NAME,
      appLogoUrl: APP_ICON_URL,
      preference: {
        attribution: {
          dataSuffix: BUILDER_CODE_DATA_SUFFIX,
        },
      },
    }),
    injected({
      shimDisconnect: true,
    }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [base.id]: http(baseRpcUrl),
  },
  dataSuffix: BUILDER_CODE_DATA_SUFFIX,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
