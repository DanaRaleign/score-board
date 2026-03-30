"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { shortenAddress } from "@/lib/scoreboard";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const connector = connectors[0];

  if (isConnected) {
    return (
      <button className="wallet-button connected" onClick={() => disconnect()}>
        <span>Wallet Live</span>
        <strong>{shortenAddress(address)}</strong>
      </button>
    );
  }

  return (
    <button className="wallet-button" disabled={!connector || isPending} onClick={() => connector && connect({ connector })}>
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
