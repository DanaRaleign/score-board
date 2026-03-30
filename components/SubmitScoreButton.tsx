"use client";

type SubmitScoreButtonProps = {
  disabled?: boolean;
  busy?: boolean;
  onClick: () => void;
};

export function SubmitScoreButton({ disabled = false, busy = false, onClick }: SubmitScoreButtonProps) {
  return (
    <button className="submit-score-button" disabled={disabled || busy} onClick={onClick}>
      {busy ? "Submitting..." : "Submit Score"}
    </button>
  );
}
