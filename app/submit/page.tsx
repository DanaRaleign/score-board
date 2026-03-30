"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { BottomNav } from "@/components/BottomNav";
import { EmptyState } from "@/components/EmptyState";
import { RaceHeader } from "@/components/RaceHeader";
import { RankSummaryPanel } from "@/components/RankSummaryPanel";
import { ScoreInputPanel } from "@/components/ScoreInputPanel";
import { SubmitScoreButton } from "@/components/SubmitScoreButton";
import { APP_NAME, APP_TRACKING_ID, buildUserEntry, scoreBoardAbi, SCORE_BOARD_ADDRESS } from "@/lib/scoreboard";
import { trackTransaction } from "@/utils/track";

export default function SubmitPage() {
  const { address, isConnected } = useAccount();
  const [scoreValue, setScoreValue] = useState("");
  const [statusText, setStatusText] = useState("Ready");
  const [latestHash, setLatestHash] = useState<string | null>(null);

  const { data: currentScore, refetch } = useReadContract({
    address: SCORE_BOARD_ADDRESS,
    abi: scoreBoardAbi,
    functionName: "score",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const { data: hash, isPending, writeContract } = useWriteContract({
    mutation: {
      onSuccess: () => setStatusText("Submitted"),
    },
  });

  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: Boolean(hash) },
  });

  const userEntry = useMemo(() => buildUserEntry(address, currentScore), [address, currentScore]);

  function handleSubmit() {
    const numericScore = Number(scoreValue);

    if (!address || !numericScore || Number.isNaN(numericScore)) {
      setStatusText("Enter a valid score");
      return;
    }

    if (currentScore && BigInt(numericScore) < currentScore) {
      setStatusText("Score must be equal or higher");
      return;
    }

    setStatusText("Submitting");

    writeContract(
      {
        address: SCORE_BOARD_ADDRESS,
        abi: scoreBoardAbi,
        functionName: "setScore",
        args: [BigInt(numericScore)],
      },
      {
        onSuccess: async (txHash) => {
          setLatestHash(txHash);
          setStatusText("Ranked");
          await refetch();
          trackTransaction(APP_TRACKING_ID, APP_NAME, address, txHash);
        },
        onError: () => setStatusText("Submit failed"),
      },
    );
  }

  return (
    <main className="app-shell submit-shell">
      <RaceHeader
        eyebrow="Submission board"
        title="Post a new result"
        detail="Use a stronger score to move your lane up."
        address={address}
        compact
      />

      {!isConnected ? (
        <EmptyState
          title="Wallet required"
          detail="Connect a wallet to post your score on Base."
          actionHref="/"
          actionLabel="Return to Hub"
        />
      ) : (
        <>
          <section className="submit-grid-panel">
            <ScoreInputPanel value={scoreValue} onChange={setScoreValue} disabled={isPending || isConfirming} />
            <div className="submit-side-panel">
              <div className="status-board">
                <span className="panel-label">Current status</span>
                <strong>{isConfirming ? "Confirming" : statusText}</strong>
                <p>Contract: setScore(uint256)</p>
              </div>
              <SubmitScoreButton disabled={!scoreValue || isPending || isConfirming} busy={isPending || isConfirming} onClick={handleSubmit} />
              <div className="recent-submit-panel">
                <span className="panel-label">Latest receipt</span>
                <p>{latestHash ? `${latestHash.slice(0, 10)}...${latestHash.slice(-6)}` : "No hash yet"}</p>
                {latestHash ? (
                  <Link href={`/scores/${userEntry.id}`} className="ghost-action">
                    Open result plate
                  </Link>
                ) : null}
              </div>
            </div>
          </section>

          <RankSummaryPanel title="Live player state" entry={userEntry} actionLabel="Open My Record" />
        </>
      )}

      <BottomNav />
    </main>
  );
}
