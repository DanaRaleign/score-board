import Link from "next/link";

type ActionItem = {
  href: string;
  label: string;
  tone?: "primary" | "secondary";
};

export function ActionBar({ actions }: { actions: ActionItem[] }) {
  return (
    <div className="action-bar">
      {actions.map((action) => (
        <Link key={action.href} href={action.href} className={`action-pill ${action.tone === "secondary" ? "secondary" : ""}`}>
          {action.label}
        </Link>
      ))}
    </div>
  );
}
