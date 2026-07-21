import type { ReactNode } from "react";
import { Icon } from "./icons";

export function Rating({ value, count, mini }: { value: number; count?: number; mini?: boolean }) {
  return (
    <span className={`rating ${mini ? "rating--mini" : ""}`}>
      <Icon.star className="rating-star" />
      <b>{value.toFixed(1)}</b>
      {count != null && <span className="rating-count">({count})</span>}
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="eyebrow">
      <i className="eyebrow-dot" />
      {children}
    </span>
  );
}
