"use client";

import { useAccount, useReadContract } from "wagmi";
import { ActionBar } from "@/components/ActionBar";
import { BottomNav } from "@/components/BottomNav";
import { LeaderboardList } from "@/components/LeaderboardList";
import { RaceHeader } from "@/components/RaceHeader";
import { RankSummaryPanel } from "@/components/RankSummaryPanel";
import { getLeaderboardWithUser, getLatestScoreId, scoreBoardAbi, SCORE_BOARD_ADDRESS } from "@/lib/scoreboard";

export default function HomePage() {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: SCORE_BOARD_ADDRESS,
    abi: scoreBoardAbi,
    functionName: "score",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const leaderboard = getLeaderboardWithUser(address, data);
  const userEntry = leaderboard.find((entry) => entry.address.toLowerCase() === address?.toLowerCase()) ?? leaderboard[0];
  const latestId = getLatestScoreId(address, data);

  return (
    <main className="app-shell hub-shell">
      <RaceHeader
        eyebrow="Competition hub"
        title="Launch the board"
        detail="Fast post. Fast scan. Clear rank pressure."
        address={address}
      />

      <section className="hub-actions-panel">
        <div className="hub-action-copy">
          <p className="eyebrow">Quick routes</p>
          <h2>Choose your next move</h2>
        </div>
        <ActionBar
          actions={[
            { href: "/submit", label: "Submit Score" },
            { href: "/leaderboard", label: "View Leaderboard", tone: "secondary" },
          ]}
        />
      </section>

      <RankSummaryPanel title="Current player lane" entry={userEntry} actionLabel="Open Latest" />

      <section className="hub-strips">
        <article className="strip-card intense">
          <span className="strip-label">Latest record</span>
          <strong>#{userEntry.rank}</strong>
          <p>Record route ready</p>
          <a href={`/scores/${latestId}`}>Open score detail</a>
        </article>
        <article className="strip-card">
          <span className="strip-label">Top pressure</span>
          <strong>{leaderboard[0]?.score ?? 0}</strong>
          <p>Lead pace on the board</p>
          <a href="/leaderboard">Scan full list</a>
        </article>
      </section>

      <section className="section-stack">
        <div className="section-head">
          <p className="eyebrow">Top entries</p>
          <h2>Live board snapshot</h2>
        </div>
        <LeaderboardList entries={leaderboard.slice(0, 3)} highlightId={userEntry.id} />
      </section>

      <BottomNav />
    </main>
  );
}
