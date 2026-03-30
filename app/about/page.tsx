import { BottomNav } from "@/components/BottomNav";
import { RaceHeader } from "@/components/RaceHeader";

const points = [
  "Connect a wallet.",
  "Submit a score that is equal or higher than your current value.",
  "Open your record and copy details when needed.",
  "Track your lane against the full leaderboard.",
];

export default function AboutPage() {
  return (
    <main className="app-shell about-shell">
      <RaceHeader
        eyebrow="Mini app brief"
        title="Built for score pressure"
        detail="A focused Base mini app for self-submitted scores and live rank visibility."
      />

      <section className="about-grid">
        <article className="about-plate large">
          <span className="panel-label">Flow</span>
          <h2>Post. Rank. Repeat.</h2>
          <p>Users can submit their own score and instantly track where they stand.</p>
        </article>
        <article className="about-plate accent">
          <span className="panel-label">Contract</span>
          <h2>BaseScoreBoard</h2>
          <p>Only higher or equal scores are accepted onchain.</p>
        </article>
      </section>

      <section className="info-list">
        {points.map((point) => (
          <article key={point} className="info-row">
            <span className="info-row-index">+</span>
            <p>{point}</p>
          </article>
        ))}
      </section>

      <BottomNav />
    </main>
  );
}
