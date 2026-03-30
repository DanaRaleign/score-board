import { createConfig, http, injected } from "wagmi";
import { base } from "wagmi/chains";

const baseRpcUrl =
  process.env.NEXT_PUBLIC_BASE_RPC_URL ?? "https://mainnet.base.org";

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [base.id]: http(baseRpcUrl, {
      // TODO: append the final Builder Code data suffix here when provided.
      // Replace this transport setup with the suffix-aware Base RPC configuration.
    }),
  },
});
