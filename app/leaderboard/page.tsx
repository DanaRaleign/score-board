"use client";

import { useAccount, useReadContract } from "wagmi";
import { BottomNav } from "@/components/BottomNav";
import { LeaderboardList } from "@/components/LeaderboardList";
import { RaceHeader } from "@/components/RaceHeader";
import { buildUserEntry, formatCompactScore, getLeaderboardWithUser, scoreBoardAbi, SCORE_BOARD_ADDRESS } from "@/lib/scoreboard";

export default function LeaderboardPage() {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: SCORE_BOARD_ADDRESS,
    abi: scoreBoardAbi,
    functionName: "score",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const entries = getLeaderboardWithUser(address, data);
  const userEntry = buildUserEntry(address, data);

  return (
    <main className="app-shell leaderboard-shell">
      <RaceHeader
        eyebrow="Full leaderboard"
        title="Scan the live order"
        detail="Each row acts like a race lane with clear pressure and pace."
        address={address}
        compact
      />

      <section className="board-summary-band">
        <article className="band-cell top">
          <span className="panel-label">Leader</span>
          <strong>{entries[0]?.alias ?? "Open lane"}</strong>
          <p>{formatCompactScore(entries[0]?.score ?? 0)}</p>
        </article>
        <article className="band-cell">
          <span className="panel-label">Active board</span>
          <strong>{entries.length}</strong>
          <p>Tracked records</p>
        </article>
        <article className="band-cell accent">
          <span className="panel-label">My live spot</span>
          <strong>#{userEntry.rank}</strong>
          <p>{formatCompactScore(userEntry.score)}</p>
        </article>
      </section>

      <section className="section-stack">
        <div className="section-head">
          <p className="eyebrow">Race order</p>
          <h2>Leaderboard wall</h2>
        </div>
        <LeaderboardList entries={entries} highlightId={userEntry.id} />
      </section>

      <BottomNav />
    </main>
  );
}
