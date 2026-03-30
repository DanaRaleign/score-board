"use client";

type ScoreInputPanelProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const quickValues = ["120", "320", "640", "960"];

export function ScoreInputPanel({ value, onChange, disabled = false }: ScoreInputPanelProps) {
  return (
    <section className="score-input-panel">
      <div className="score-input-copy">
        <p className="eyebrow">Performance input</p>
        <h2>Post your next number</h2>
      </div>
      <label className="score-input-shell">
        <span className="panel-label">Score</span>
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Enter score"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value.replace(/[^\d]/g, ""))}
        />
      </label>
      <div className="quick-score-row">
        {quickValues.map((preset) => (
          <button key={preset} type="button" className="quick-score-chip" onClick={() => onChange(preset)}>
            {preset}
          </button>
        ))}
      </div>
    </section>
  );
}
