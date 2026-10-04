/**
 * Little bird perched on the "Say Hello" button holding an envelope.
 * Idle: bobs and blinks. When the button (a `.group` ancestor) is hovered or
 * focused, it flaps off to "deliver" the letter and lands back. CSS: `.bd-*`.
 */
export function ContactBird() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute -top-[34px] right-3 z-10 block h-11 w-11"
    >
      <svg viewBox="0 0 64 64" className="bd-bird block h-full w-full overflow-visible">
        <g className="bd-body">
          <path d="M44 36 L58 30 L56 40 Z" className="bd-tail" />
          <ellipse cx="34" cy="38" rx="16" ry="13" className="bd-main" />
          <ellipse cx="31" cy="42" rx="9" ry="7" className="bd-belly" />
          <path d="M34 34 C42 30 48 34 46 42 C40 44 36 40 34 34 Z" className="bd-wing" />
          <circle cx="24" cy="26" r="10" className="bd-main" />
          <g className="bd-eye">
            <circle cx="21" cy="24" r="2.2" className="bd-pupil" />
            <circle cx="20.3" cy="23.3" r="0.7" fill="#fff" />
          </g>
          <circle cx="25" cy="29" r="2" className="bd-cheek" />
          <path d="M15 26 L9 28 L15 30 Z" className="bd-beak" />
          <g className="bd-letter">
            <rect x="0" y="27" width="13" height="9" rx="1.5" className="bd-env" />
            <path d="M0.8 28 L6.5 32.5 L12.2 28" className="bd-env-line" />
          </g>
        </g>
        <path d="M30 50 V55 M37 50 V55" className="bd-legs" />
      </svg>
    </span>
  );
}
