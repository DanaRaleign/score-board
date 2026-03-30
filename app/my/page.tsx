"use client";

import { useAccount, useReadContract } from "wagmi";
import { BottomNav } from "@/components/BottomNav";
import { EmptyState } from "@/components/EmptyState";
import { RaceHeader } from "@/components/RaceHeader";
import { RankSummaryPanel } from "@/components/RankSummaryPanel";
import { ScoreCard } from "@/components/ScoreCard";
import { buildUserEntry, getLeaderboardWithUser, scoreBoardAbi, SCORE_BOARD_ADDRESS } from "@/lib/scoreboard";

export default function MyRankPage() {
  const { address, isConnected } = useAccount();
  const { data } = useReadContract({
    address: SCORE_BOARD_ADDRESS,
    abi: scoreBoardAbi,
    functionName: "score",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const userEntry = buildUserEntry(address, data);
  const aroundBoard = getLeaderboardWithUser(address, data).slice(0, 5);

  return (
    <main className="app-shell my-shell">
      <RaceHeader
        eyebrow="Player panel"
        title="Track your lane"
        detail="Keep your personal record in view."
        address={address}
      />

      {!isConnected ? (
        <EmptyState
          title="No active player"
          detail="Connect a wallet to unlock your score, rank, and latest record."
          actionHref="/submit"
          actionLabel="Open Submit"
        />
      ) : (
        <>
          <section className="player-focus-panel">
            <RankSummaryPanel title="My rank" entry={userEntry} actionLabel="Open Score Detail" />
            <div className="player-meta-grid">
              <article className="player-meta-card accent">
                <span className="panel-label">Record state</span>
                <strong>{userEntry.score > 0 ? "Ranked" : "Ready"}</strong>
                <p>{userEntry.checkpoint}</p>
              </article>
              <article className="player-meta-card">
                <span className="panel-label">Next action</span>
                <strong>{userEntry.score > 0 ? "Raise score" : "Post first score"}</strong>
                <p>Higher numbers move your lane upward.</p>
              </article>
            </div>
          </section>

          <section className="section-stack">
            <div className="section-head">
              <p className="eyebrow">Board context</p>
              <h2>Field around you</h2>
            </div>
            <div className="stacked-cards">
              {aroundBoard.map((entry) => (
                <ScoreCard key={entry.id} entry={entry} highlight={entry.id === userEntry.id} />
              ))}
            </div>
          </section>
        </>
      )}

      <BottomNav />
    </main>
  );
}
