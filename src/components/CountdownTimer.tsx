"use client";

import { useEffect, useRef, useState } from "react";

const LAUNCH = new Date("January 1, 2026 00:00:00").getTime();

function getRemaining() {
  const delta = Math.max(0, LAUNCH - Date.now());
  return {
    days:    Math.floor(delta / 86_400_000),
    hours:   Math.floor((delta % 86_400_000) / 3_600_000),
    minutes: Math.floor((delta % 3_600_000) / 60_000),
    seconds: Math.floor((delta % 60_000) / 1_000),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

const UNITS: { key: keyof ReturnType<typeof getRemaining>; label: string }[] = [
  { key: "days",    label: "Days" },
  { key: "hours",   label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function FlipDigit({ value }: { value: string }) {
  const [display, setDisplay]   = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value === prev.current) return;
    prev.current = value;
    setFlipping(true);
    const t = setTimeout(() => {
      setDisplay(value);
      setFlipping(false);
    }, 250);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="relative w-[3.5rem] h-[4.5rem] select-none" aria-label={display}>
      {/* Card face */}
      <div
        className={`
          absolute inset-0 flex items-center justify-center
          bg-primary/90 rounded-lg shadow-lg
          text-on-primary font-bold tabular-nums
          transition-transform duration-[250ms] ease-in-out
          ${flipping ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}
        `}
        style={{ fontSize: "2.25rem", lineHeight: 1 }}
      >
        {display}
      </div>

      {/* Flip ghost — old value fading out */}
      {flipping && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-primary/70 rounded-lg text-on-primary font-bold tabular-nums opacity-40"
          style={{ fontSize: "2.25rem", lineHeight: 1 }}
        >
          {display}
        </div>
      )}

      {/* Center split line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-black/20 z-10" />
    </div>
  );
}

function TimerUnit({ label, value }: { label: string; value: number }) {
  const str = pad(value);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Two digit cards side by side */}
      <div className="flex gap-1">
        <FlipDigit value={str[0]} />
        <FlipDigit value={str[1]} />
      </div>
      <span className="text-label-caps text-on-surface-variant tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-center items-start gap-4 md:gap-8">
      {UNITS.map(({ key, label }, i) => (
        <div key={key} className="flex items-start gap-4 md:gap-8">
          <TimerUnit label={label} value={time[key]} />
          {/* Colon separator — hidden after last unit */}
          {i < UNITS.length - 1 && (
            <div className="flex flex-col gap-3 pt-1">
              <div className="flex flex-col gap-[0.9rem] mt-2">
                <span className="w-2 h-2 rounded-full bg-primary/60 block" />
                <span className="w-2 h-2 rounded-full bg-primary/60 block" />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
