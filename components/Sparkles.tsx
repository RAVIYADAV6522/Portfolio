/**
 * Twinkling stars scattered around a heading. Parent must be `relative`;
 * they animate only when an ancestor has `.is-active` (see `.sparkle` CSS).
 */
const STARS = [
  { left: "-3%", top: "-30%", size: 14, color: "#f59e0b", delay: "0s" },
  { left: "26%", top: "-55%", size: 10, color: "#a5b4fc", delay: "0.6s" },
  { left: "55%", top: "-38%", size: 16, color: "#2dd4bf", delay: "1.2s" },
  { left: "88%", top: "-48%", size: 12, color: "#f472b6", delay: "0.3s" },
  { left: "101%", top: "15%", size: 14, color: "#f59e0b", delay: "1.6s" },
  { left: "72%", top: "95%", size: 9, color: "#a5b4fc", delay: "0.9s" },
];

export function Sparkles() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      {STARS.map((s, i) => (
        <svg
          key={i}
          className="sparkle"
          viewBox="0 0 24 24"
          width={s.size}
          height={s.size}
          style={{ left: s.left, top: s.top, animationDelay: s.delay }}
        >
          <path
            d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z"
            fill={s.color}
          />
        </svg>
      ))}
    </span>
  );
}
