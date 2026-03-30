import { getTrendLabel, type ScoreTrend } from "@/lib/scoreboard";

export function RankStatusChip({ trend }: { trend: ScoreTrend }) {
  return <span className={`status-chip ${trend}`}>{getTrendLabel(trend)}</span>;
}
