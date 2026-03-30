"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAccount, useReadContract } from "wagmi";
import { BottomNav } from "@/components/BottomNav";
import { CopyScoreButton } from "@/components/CopyScoreButton";
import { EmptyState } from "@/components/EmptyState";
import { RaceHeader } from "@/components/RaceHeader";
import { RankStatusChip } from "@/components/RankStatusChip";
import { formatScore, getScoreEntryById, scoreBoardAbi, SCORE_BOARD_ADDRESS, shortenAddress } from "@/lib/scoreboard";

export default function ScoreDetailPage() {
  const params = useParams<{ id: string }>();
  const { address } = useAccount();
  const { data } = useReadContract({
    address: SCORE_BOARD_ADDRESS,
    abi: scoreBoardAbi,
    functionName: "score",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const entry = getScoreEntryById(params.id, address, data);

  if (!entry) {
    return (
      <main className="app-shell detail-shell">
        <RaceHeader
          eyebrow="Result plate"
          title="Record not found"
          detail="This score route does not match a live or mock record."
          address={address}
          compact
        />
        <EmptyState
          title="No score record"
          detail="Return to the board and open another entry."
          actionHref="/leaderboard"
          actionLabel="Open Leaderboard"
        />
        <BottomNav />
      </main>
    );
  }

  const copyPayload = `${entry.alias} | Rank #${entry.rank} | Score ${entry.score} | ${entry.address}`;

  return (
    <main className="app-shell detail-shell">
      <RaceHeader
        eyebrow="Result plate"
        title="Open score record"
        detail="Single-entry detail with direct copy and fast return routes."
        address={address}
        compact
      />

      <section className="detail-hero-card">
        <div className="detail-hero-head">
          <div>
            <span className="panel-label">Record ID</span>
            <h2>{entry.id}</h2>
          </div>
          <RankStatusChip trend={entry.trend} />
        </div>

        <div className="detail-score-grid">
          <article>
            <span className="panel-label">Score</span>
            <strong>{formatScore(entry.score)}</strong>
          </article>
          <article>
            <span className="panel-label">Rank</span>
            <strong>#{entry.rank}</strong>
          </article>
        </div>

        <div className="detail-meta-grid">
          <article className="detail-meta-card">
            <span className="panel-label">Owner</span>
            <p>{shortenAddress(entry.address)}</p>
          </article>
          <article className="detail-meta-card">
            <span className="panel-label">Lane</span>
            <p>{entry.lane}</p>
          </article>
          <article className="detail-meta-card">
            <span className="panel-label">Checkpoint</span>
            <p>{entry.checkpoint}</p>
          </article>
          <article className="detail-meta-card">
            <span className="panel-label">Updated</span>
            <p>{entry.submittedAt}</p>
          </article>
        </div>

        <div className="detail-actions">
          <CopyScoreButton value={copyPayload} />
          <Link href="/leaderboard" className="ghost-action">
            Back to Board
          </Link>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
