import Link from "next/link";

type EmptyStateProps = {
  title: string;
  detail: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({ title, detail, actionHref, actionLabel }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <span className="empty-state-badge">Ready</span>
      <h2>{title}</h2>
      <p>{detail}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className="primary-link-button">
          {actionLabel}
        </Link>
      ) : null}
    </section>
  );
}
