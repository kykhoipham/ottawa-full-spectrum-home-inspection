import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border/60 bg-gradient-to-b from-accent/30 to-background">
      <div className="container-prose py-16 md:py-24">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-balance text-foreground max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
