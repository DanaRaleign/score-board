import { type ScoreEntry } from "@/lib/scoreboard";
import { ScoreCard } from "./ScoreCard";

export function LeaderboardList({ entries, highlightId }: { entries: ScoreEntry[]; highlightId?: string }) {
  return (
    <section className="leaderboard-list">
      {entries.map((entry) => (
        <ScoreCard key={entry.id} entry={entry} highlight={highlightId === entry.id} />
      ))}
    </section>
  );
}
