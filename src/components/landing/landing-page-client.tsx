"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quickStats = [
  { label: "Tracked Companies", value: "3", detail: "Apple, Tesla, Microsoft" },
  {
    label: "Static RAG Chunks",
    value: "10+",
    detail: "retrieval snippets in chat",
  },
  {
    label: "Interactive Views",
    value: "6",
    detail: "charts, compare, story, graph",
  },
];

const productPillars = [
  {
    title: "Interactive Dashboards",
    detail:
      "Switch templates, compare companies, and explore trends with interactive charts.",
    href: "/dashboard",
  },
  {
    title: "AI Chat + RAG",
    detail:
      "Ask questions and inspect static retrieved context with deterministic memory updates.",
    href: "/chat",
  },
  {
    title: "Statement Explorer",
    detail:
      "Navigate income statement, balance sheet, and cash flow with mock financial data.",
    href: "/company/apple",
  },
];

export function LandingPageClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const handlers: Array<() => void> = [];

    const ctx = gsap.context(() => {
      gsap.from("[data-hero]", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
        gsap.from(section, {
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 86%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-press]").forEach((node) => {
        const onPress = () => {
          gsap.to(node, { scale: 0.98, duration: 0.1, overwrite: true });
        };
        const onRelease = () => {
          gsap.to(node, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            overwrite: true,
          });
        };

        node.addEventListener("pointerdown", onPress);
        node.addEventListener("pointerup", onRelease);
        node.addEventListener("pointerleave", onRelease);
        node.addEventListener("pointercancel", onRelease);

        handlers.push(() => {
          node.removeEventListener("pointerdown", onPress);
          node.removeEventListener("pointerup", onRelease);
          node.removeEventListener("pointerleave", onRelease);
          node.removeEventListener("pointercancel", onRelease);
        });
      });
    }, root);

    return () => {
      handlers.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(63,116,169,0.14),transparent_38%),radial-gradient(circle_at_100%_0%,rgba(34,94,148,0.09),transparent_42%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1120px] flex-col px-4 pb-16 pt-6 sm:px-6 md:px-8">
        <section className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p
              data-hero
              className="inline-flex rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-3 py-1 text-xs uppercase tracking-[0.14em] text-[color:var(--text-secondary)]"
            >
              Financial intelligence workspace
            </p>
            <h1
              data-hero
              className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[color:var(--text-primary)] sm:text-4xl md:text-5xl"
            >
              Clean analytics, interactive comparisons, and static AI workflows.
            </h1>
            <p
              data-hero
              className="mt-5 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base"
            >
              LedgerIQ brings dashboard analysis, story narratives, and
              RAG-style chat into one mock-data prototype designed for realistic
              product demos.
            </p>
            <div data-hero className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href="/dashboard"
                data-press
                className="pressable rounded-xl bg-[color:var(--button-primary)] px-5 py-3 text-center text-sm font-medium text-white"
              >
                Explore Interactive Dashboard
              </Link>
              <Link
                href="/chat"
                data-press
                className="pressable rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-5 py-3 text-center text-sm font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--surface-hover)]"
              >
                Open AI Chat
              </Link>
            </div>
          </div>

          <div
            data-hero
            className="grid gap-3 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4 sm:grid-cols-3 lg:grid-cols-1"
          >
            {quickStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] p-4"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--text-tertiary)]">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold text-[color:var(--text-primary)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                  {stat.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="mt-14 grid gap-4 md:grid-cols-3">
          {productPillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              data-press
              className="pressable rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-5 transition-colors hover:bg-[color:var(--surface-hover)]"
            >
              <h2 className="text-lg font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">
                {pillar.detail}
              </p>
            </Link>
          ))}
        </section>

        <section
          data-reveal
          className="mt-14 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-6"
        >
          <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[color:var(--text-tertiary)]">
                Product Snapshot
              </p>
              <h3 className="mt-2 text-2xl font-semibold leading-tight">
                Designed for interactive demos, not static screenshots.
              </h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
                Use Analysis and Story tabs, switch compare metrics across
                companies, inspect an interactive knowledge graph, and review
                deterministic RAG outputs with mock retrieval traces.
              </p>
            </div>
            <div className="space-y-2 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] p-4 text-sm text-[color:var(--text-secondary)]">
              <p>1. Pick a dashboard sheet</p>
              <p>2. Compare two companies on a chosen metric</p>
              <p>3. Open Story tab for narrative summary</p>
              <p>4. Explore AI Chat with static RAG context</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
