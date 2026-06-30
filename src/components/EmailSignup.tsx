"use client";

import { useState } from "react";

type State = "idle" | "loading" | "success";

export default function EmailSignup() {
  const [email, setEmail]   = useState("");
  const [state, setState]   = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || state !== "idle") return;

    setState("loading");

    // TODO: replace with real API call / email service integration
    await new Promise((r) => setTimeout(r, 800));

    setState("success");
  }

  if (state === "success") {
    return (
      <div className="glass-panel p-8 rounded-xl max-w-lg mx-auto text-center">
        <span className="material-symbols-outlined text-primary text-4xl mb-3 block">check_circle</span>
        <p className="text-body-md text-on-surface-variant">
          You&apos;re on the list — we&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-8 rounded-xl shadow-sm max-w-lg mx-auto">
      <h3 className="text-label-caps text-primary mb-6">Join the Inner Circle</h3>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          disabled={state === "loading"}
          className="flex-grow bg-surface-container-lowest/50 border border-outline-variant focus:border-primary rounded-lg px-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="bg-primary text-on-primary px-8 py-3 rounded-lg text-label-caps hover:bg-primary-container transition-all hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {state === "loading" ? "Sending…" : "Notify Me"}
        </button>
      </form>
    </div>
  );
}
