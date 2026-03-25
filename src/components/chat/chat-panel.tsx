"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  defaultRagScenario,
  sampleChatPrompts,
  staticRagResponses,
  type StaticRagScenario,
} from "@/data/mock-financials";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  scenario?: StaticRagScenario;
};

export function ChatPanel() {
  const [input, setInput] = useState("");
  const [knowledgeMemory, setKnowledgeMemory] = useState<string[]>([
    "Track quarterly variance drivers before summary narratives.",
    "Prefer direct comparisons across Apple, Tesla, and Microsoft.",
    "Always call out operating cash flow direction by company.",
  ]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro",
      role: "assistant",
      text: "Ask about trends, statement drivers, or company comparisons. This panel returns static RAG-style output with fixed retrieved context and memory updates.",
    },
  ]);

  const disabled = input.trim().length === 0;

  const submitPrompt = (prompt: string) => {
    const normalized = prompt.trim().toLowerCase();
    const scenario = staticRagResponses[normalized] ?? defaultRagScenario;

    setMessages((current) => [
      ...current,
      { id: `u-${Date.now()}`, role: "user", text: prompt.trim() },
      {
        id: `a-${Date.now() + 1}`,
        role: "assistant",
        text: scenario.answer,
        scenario,
      },
    ]);

    setKnowledgeMemory((current) => {
      const next = [
        scenario.memoryWrite,
        ...current.filter((item) => item !== scenario.memoryWrite),
      ];
      return next.slice(0, 6);
    });

    setInput("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) {
      return;
    }
    submitPrompt(input);
  };

  const promptButtons = useMemo(
    () =>
      sampleChatPrompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => submitPrompt(prompt)}
          className="rounded-md border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-1.5 text-left text-xs text-[color:var(--text-secondary)] transition-colors hover:bg-[color:var(--surface-hover)]"
        >
          {prompt}
        </button>
      )),
    [],
  );

  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_320px]">
      <div className="flex h-[calc(100dvh-12rem)] min-h-[520px] flex-col rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] md:h-[calc(100vh-13rem)]">
        <header className="border-b border-[color:var(--border-subtle)] px-4 py-3">
          <h3 className="text-sm font-semibold">AI Chat + Static RAG</h3>
          <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
            Retrieved chunks, answer synthesis, and memory writes are all
            deterministic static data.
          </p>
        </header>

        <div className="grid gap-2 border-b border-[color:var(--border-subtle)] px-4 py-3 sm:grid-cols-3">
          {promptButtons}
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[92%] rounded-xl px-3 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "ml-auto bg-[color:var(--metric-highlight)] text-[color:var(--metric-highlight-text)]"
                  : "bg-[color:var(--surface-muted)] text-[color:var(--text-primary)]"
              }`}
            >
              <p>{message.text}</p>

              {message.role === "assistant" && message.scenario ? (
                <div className="mt-3 space-y-2 rounded-lg border border-[color:var(--border-subtle)] bg-white/70 p-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--text-tertiary)]">
                    Retrieved Context
                  </p>
                  {message.scenario.retrieved.map((chunk) => (
                    <div
                      key={`${message.id}-${chunk.source}`}
                      className="rounded border border-[color:var(--border-subtle)] bg-white p-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-[color:var(--text-primary)]">
                          {chunk.source}
                        </p>
                        <p className="text-xs text-[color:var(--text-tertiary)]">
                          score {chunk.score.toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
                        {chunk.excerpt}
                      </p>
                    </div>
                  ))}
                  <p className="rounded border border-[color:var(--border-subtle)] bg-[color:var(--surface)] px-2 py-1 text-xs text-[color:var(--text-secondary)]">
                    Memory write: {message.scenario.memoryWrite}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="border-t border-[color:var(--border-subtle)] p-3"
        >
          <div className="grid gap-2 sm:flex">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question about financial trends"
              className="w-full rounded-lg border border-[color:var(--border-subtle)] bg-white px-3 py-2 text-sm outline-none ring-[color:var(--focus)] transition-shadow focus:ring-2"
            />
            <button
              type="submit"
              disabled={disabled}
              className="rounded-lg bg-[color:var(--button-primary)] px-4 py-2 text-sm font-medium text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <aside className="space-y-3 rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface)] p-4">
        <div>
          <h3 className="text-sm font-semibold">Knowledge Memory (Static)</h3>
          <p className="mt-1 text-xs text-[color:var(--text-secondary)]">
            This memory panel updates from fixed response mappings only.
          </p>
        </div>

        <div className="space-y-2">
          {knowledgeMemory.map((memory, index) => (
            <div
              key={`${memory}-${index}`}
              className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-2 text-xs text-[color:var(--text-secondary)]"
            >
              {memory}
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[color:var(--text-tertiary)]">
            RAG Pipeline (Static)
          </p>
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-[color:var(--text-secondary)]">
            <li>Match prompt to predefined key</li>
            <li>Return fixed retrieved chunks</li>
            <li>Render canned synthesis answer</li>
            <li>Append deterministic memory write</li>
          </ol>
        </div>
      </aside>
    </section>
  );
}
