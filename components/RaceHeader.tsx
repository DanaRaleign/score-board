import Link from "next/link";
import { shortenAddress } from "@/lib/scoreboard";
import { WalletButton } from "./WalletButton";

type RaceHeaderProps = {
  title: string;
  eyebrow: string;
  detail: string;
  address?: string;
  compact?: boolean;
};

export function RaceHeader({ title, eyebrow, detail, address, compact = false }: RaceHeaderProps) {
  return (
    <header className={`race-header ${compact ? "race-header-compact" : ""}`}>
      <div className="race-header-copy">
        <Link href="/" className="brand-mark">
          <span className="brand-mark-kicker">Base race board</span>
          <span className="brand-mark-title">score-board</span>
        </Link>
        <div className="race-header-text">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="detail">{detail}</p>
        </div>
      </div>
      <div className="race-header-tools">
        <div className="signal-card">
          <span className="signal-label">Connected lane</span>
          <strong>{shortenAddress(address)}</strong>
        </div>
        <WalletButton />
      </div>
    </header>
  );
}
