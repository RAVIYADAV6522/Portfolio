"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type DrummingMonkeyProps = {
  /** When true (section in view), he marches and drums; otherwise he pauses. */
  drumActive: boolean;
  /**
   * The heading he walks along. He marches from its first letter to its last
   * (e.g. the "I" → "s" of "Internships"), turns around, and marches back.
   */
  trackRef?: RefObject<HTMLElement | null>;
};

/** Walking speed in px/s — distance-based so it looks the same at every width. */
const SPEED = 55;

/**
 * Marching-drummer monkey. All motion is CSS (see the .mk-* rules in globals.css):
 * walk + turn, alternating legs, body bob, drumsticks, tail sway, blinking
 * and little music notes. This component only measures the walk distance.
 */
export function DrummingMonkey({ drumActive, trackRef }: DrummingMonkeyProps) {
  const walkerRef = useRef<HTMLDivElement>(null);
  // Easter egg: click him for a drum solo 🥁
  const [solo, setSolo] = useState(false);
  const soloTimer = useRef<ReturnType<typeof setTimeout>>();
  const startSolo = () => {
    setSolo(true);
    clearTimeout(soloTimer.current);
    soloTimer.current = setTimeout(() => setSolo(false), 2400);
  };
  useEffect(() => () => clearTimeout(soloTimer.current), []);

  useEffect(() => {
    const walker = walkerRef.current;
    const track = trackRef?.current;
    if (!walker || !track) return;

    const update = () => {
      const w = walker.offsetWidth;
      const distance = Math.max(0, track.offsetWidth - 0.4 * w);
      // walking takes 84% of the loop (42% each way); the rest is drumming on the spot
      const duration = Math.max(4, distance / SPEED / 0.42);
      walker.style.setProperty("--walk", `${distance}px`);
      walker.style.setProperty("--walk-dur", `${duration.toFixed(2)}s`);
      walker.style.marginLeft = `${-0.3 * w}px`;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);
    ro.observe(walker);
    return () => ro.disconnect();
  }, [trackRef]);

  return (
    <div
      className={`mk-track pointer-events-none select-none ${drumActive || solo ? "is-active" : ""} ${solo ? "is-solo" : ""}`}
      aria-hidden
    >
      <div
        ref={walkerRef}
        className="mk-walker pointer-events-auto cursor-pointer"
        onClick={startSolo}
        title="Psst… click me"
      >
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mascot-svg mk-svg block h-[5.5rem] w-[5.5rem] sm:h-28 sm:w-28">
        <ellipse className="mk-shadow" cx="100" cy="190" rx="44" ry="6"/>
        <g className="mk-bob">
          <g className="mk-tail">
            <path d="M64 128 C38 122 26 98 34 80 C40 66 56 64 60 76" className="mk-fur-dk-s" strokeWidth="12" strokeLinecap="round"/>
          </g>
          <g className="mk-leg mk-leg-back">
            <path d="M88 148 L86 178" className="mk-fur-dk-s" strokeWidth="14" strokeLinecap="round"/>
            <ellipse cx="91" cy="182" rx="11" ry="6" className="mk-fur-dk"/>
          </g>
          <ellipse cx="100" cy="124" rx="40" ry="36" className="mk-fur"/>
          <ellipse cx="100" cy="128" rx="24" ry="22" className="mk-belly"/>
          <g className="mk-leg mk-leg-front">
            <path d="M112 148 L114 178" className="mk-fur-dk-s" strokeWidth="14" strokeLinecap="round"/>
            <ellipse cx="119" cy="182" rx="11" ry="6" className="mk-fur-dk"/>
          </g>
          <path d="M68 140 L68 152 Q100 166 132 152 L132 140" className="mk-drum-shell"/>
          <path d="M72 144 L80 157 M92 146 L100 160 M112 146 L120 158" className="mk-drum-lace" strokeWidth="1.5" strokeLinecap="round"/>
          <ellipse cx="100" cy="140" rx="32" ry="8" className="mk-drum-top" strokeWidth="2"/>
          <g className="mk-arm mk-arm-l">
            <g transform="translate(70 104)">
              <path d="M0 0 Q12 12 28 26" className="mk-fur-dk-s" strokeWidth="11" strokeLinecap="round"/>
              <circle cx="30" cy="28" r="7" className="mk-fur"/>
              <line x1="33" y1="27" x2="46" y2="36" className="mk-stick" strokeWidth="4" strokeLinecap="round"/>
            </g>
          </g>
          <g className="mk-arm mk-arm-r">
            <g transform="translate(130 104)">
              <path d="M0 0 Q-12 12 -28 26" className="mk-fur-dk-s" strokeWidth="11" strokeLinecap="round"/>
              <circle cx="-30" cy="28" r="7" className="mk-fur"/>
              <line x1="-33" y1="27" x2="-46" y2="36" className="mk-stick" strokeWidth="4" strokeLinecap="round"/>
            </g>
          </g>
          <g className="mk-head">
            <circle cx="66" cy="54" r="13" className="mk-fur-dk"/>
            <circle cx="134" cy="54" r="13" className="mk-fur-dk"/>
            <circle cx="66" cy="54" r="6" className="mk-ear-in"/>
            <circle cx="134" cy="54" r="6" className="mk-ear-in"/>
            <circle cx="100" cy="60" r="35" className="mk-fur"/>
            <ellipse cx="100" cy="66" rx="25" ry="21" className="mk-face"/>
            <g className="mk-eyes">
              <circle cx="89" cy="62" r="4" className="mk-eye"/>
              <circle cx="113" cy="62" r="4" className="mk-eye"/>
              <circle cx="90.3" cy="60.6" r="1.3" className="mk-glint"/>
              <circle cx="114.3" cy="60.6" r="1.3" className="mk-glint"/>
            </g>
            <path d="M89 76 Q100 85 111 76" className="mk-mouth" strokeWidth="2.5" strokeLinecap="round"/>
            <ellipse cx="82" cy="71" rx="5" ry="3" className="mk-blush"/>
            <ellipse cx="118" cy="71" rx="5" ry="3" className="mk-blush"/>
          </g>
        </g>
        <g className="mk-crash">
          <path d="M156 122 l5 -12 l3 11 l11 -5 l-6 10 l12 3 l-12 3 l6 10 l-11 -5 l-3 11 l-5 -12 l-10 6 l4 -11 l-11 -2 l11 -3 l-4 -11 z" />
        </g>
        <g className="mk-notes">
          <text x="146" y="112" className="mk-note mk-note-1">♪</text>
          <text x="150" y="112" className="mk-note mk-note-2">♫</text>
        </g>
      </svg>
      </div>
    </div>
  );
}
