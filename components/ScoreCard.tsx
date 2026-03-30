import Link from "next/link";
import {
  formatScore,
  getRankTone,
  getScoreDeltaText,
  getScoreMeter,
  shortenAddress,
  type ScoreEntry,
} from "@/lib/scoreboard";
import { RankStatusChip } from "./RankStatusChip";

type ScoreCardProps = {
  entry: ScoreEntry;
  highlight?: boolean;
};

export function ScoreCard({ entry, highlight = false }: ScoreCardProps) {
  return (
    <Link href={`/scores/${entry.id}`} className={`score-card ${highlight ? "highlight" : ""} ${getRankTone(entry.rank)}`}>
      <div className="score-card-top">
        <div>
          <span className="score-card-rank">#{entry.rank}</span>
          <h3>{entry.alias}</h3>
        </div>
        <RankStatusChip trend={entry.trend} />
      </div>
      <div className="score-card-core">
        <strong>{formatScore(entry.score)}</strong>
        <span>{getScoreDeltaText(entry.score)}</span>
      </div>
      <div className="score-card-meter">
        <span style={{ width: `${getScoreMeter(entry.score)}%` }} />
      </div>
      <div className="score-card-bottom">
        <p>{entry.lane}</p>
        <p>{entry.checkpoint}</p>
        <p>{shortenAddress(entry.address)}</p>
      </div>
    </Link>
  );
}
