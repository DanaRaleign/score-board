import Link from "next/link";
import { formatScore, getScoreDeltaText, type ScoreEntry } from "@/lib/scoreboard";
import { RankStatusChip } from "./RankStatusChip";

type RankSummaryPanelProps = {
  title: string;
  entry: ScoreEntry;
  actionLabel?: string;
};

export function RankSummaryPanel({ title, entry, actionLabel = "Open Record" }: RankSummaryPanelProps) {
  return (
    <section className="rank-summary-panel">
      <div className="rank-summary-head">
        <p className="eyebrow">{title}</p>
        <RankStatusChip trend={entry.trend} />
      </div>
      <div className="rank-summary-grid">
        <div>
          <span className="panel-label">Rank</span>
          <strong className="mega-number">#{entry.rank}</strong>
        </div>
        <div>
          <span className="panel-label">Score</span>
          <strong className="mega-number">{formatScore(entry.score)}</strong>
        </div>
      </div>
      <div className="rank-summary-footer">
        <div>
          <span className="panel-label">Lane</span>
          <p>{entry.lane}</p>
        </div>
        <div>
          <span className="panel-label">Delta</span>
          <p>{getScoreDeltaText(entry.score)}</p>
        </div>
        <Link href={`/scores/${entry.id}`} className="ghost-action">
          {actionLabel}
        </Link>
      </div>
    </section>
  );
}
