const cubeSlotClass =
  "absolute flex h-[min(42vw,280px)] w-[min(42vw,280px)] items-center justify-center sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px]";

/**
 * Three subtle 3D cubes (left, center, right) in the page background.
 * Animated with CSS keyframes (transform only) so the browser runs them on the
 * compositor thread: no per-frame JS, and they stay smooth while scrolling.
 */
export function BackgroundCube() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={`${cubeSlotClass} -left-16 top-[min(18vh,140px)] sm:left-4`}
      >
        <div className="portfolio-bg-cube__inner portfolio-bg-cube__inner--left">
          <div className="portfolio-bg-cube__cube portfolio-bg-cube__cube--left">
            <div className="portfolio-bg-cube__side portfolio-bg-cube__front" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__left" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__right" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__top" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__bottom" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__back" />
          </div>
        </div>
      </div>

      <div
        className={`portfolio-bg-cube--center ${cubeSlotClass} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.85] sm:scale-90`}
      >
        <div className="portfolio-bg-cube__inner portfolio-bg-cube__inner--center">
          <div className="portfolio-bg-cube__cube portfolio-bg-cube__cube--center">
            <div className="portfolio-bg-cube__side portfolio-bg-cube__front" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__left" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__right" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__top" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__bottom" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__back" />
          </div>
        </div>
      </div>

      <div
        className={`${cubeSlotClass} -right-16 top-[min(18vh,140px)] sm:right-4`}
      >
        <div className="portfolio-bg-cube__inner portfolio-bg-cube__inner--right">
          <div className="portfolio-bg-cube__cube portfolio-bg-cube__cube--right">
            <div className="portfolio-bg-cube__side portfolio-bg-cube__front" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__left" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__right" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__top" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__bottom" />
            <div className="portfolio-bg-cube__side portfolio-bg-cube__back" />
          </div>
        </div>
      </div>

      <CubeStyles />
    </div>
  );
}

function CubeStyles() {
  return (
    <style>{`
      .portfolio-bg-cube__inner {
        perspective: 800px;
        width: 200px;
        height: 200px;
        opacity: 0.5;
      }
      .dark .portfolio-bg-cube__inner {
        opacity: 0.42;
      }

      .portfolio-bg-cube--center .portfolio-bg-cube__inner {
        opacity: 0.38;
      }
      .dark .portfolio-bg-cube--center .portfolio-bg-cube__inner {
        opacity: 0.32;
      }
      @media (max-width: 640px) {
        .portfolio-bg-cube--center .portfolio-bg-cube__inner {
          opacity: 0.3;
        }
        .dark .portfolio-bg-cube--center .portfolio-bg-cube__inner {
          opacity: 0.26;
        }
      }
      @media (max-width: 640px) {
        .portfolio-bg-cube__inner {
          opacity: 0.4;
        }
        .dark .portfolio-bg-cube__inner {
          opacity: 0.34;
        }
      }

      .portfolio-bg-cube__cube {
        width: 200px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
        will-change: transform;
        animation: portfolio-bg-cube-spin 31.4s ease-in-out infinite alternate;
      }
      .portfolio-bg-cube__inner {
        will-change: transform;
        animation: portfolio-bg-cube-bob 3.14s ease-in-out infinite alternate;
      }

      /* each cube has its own phase / tilt so they don't move in lockstep */
      .portfolio-bg-cube__inner--left { --bob: -100px; animation-delay: -2.4s; }
      .portfolio-bg-cube__inner--center { --bob: -84px; animation-delay: -1.9s; }
      .portfolio-bg-cube__inner--right { --bob: -100px; animation-delay: -1.57s; }
      .portfolio-bg-cube__cube--left { --rx: 200deg; --ry: -200deg; animation-delay: -45s; }
      .portfolio-bg-cube__cube--center { --rx: 184deg; --ry: 176deg; animation-delay: -38s; }
      .portfolio-bg-cube__cube--right { --rx: 200deg; --ry: 200deg; animation-delay: -15.7s; }

      @keyframes portfolio-bg-cube-bob {
        from { transform: translateY(0); }
        to { transform: translateY(var(--bob)); }
      }
      @keyframes portfolio-bg-cube-spin {
        from { transform: rotateX(calc(-1 * var(--rx))) rotateY(calc(-1 * var(--ry))); }
        to { transform: rotateX(var(--rx)) rotateY(var(--ry)); }
      }

      @media (prefers-reduced-motion: reduce) {
        .portfolio-bg-cube__cube,
        .portfolio-bg-cube__inner {
          animation: none;
        }
      }
      /* low-power devices: keep the cubes but don't animate them */
      [data-lite] .portfolio-bg-cube__cube,
      [data-lite] .portfolio-bg-cube__inner {
        animation: none;
      }

      /* Dual gradient palette: #F472B6 → #C084FC → #818CF8 */
      .portfolio-bg-cube__side {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.88;
        border: 1px solid rgba(192, 132, 252, 0.42);
        box-sizing: border-box;
      }

      .portfolio-bg-cube__front {
        transform: rotateY(0deg) translateZ(100px);
        background: linear-gradient(
          145deg,
          rgba(244, 114, 182, 0.58) 0%,
          rgba(192, 132, 252, 0.52) 100%
        );
      }
      .portfolio-bg-cube__right {
        transform: rotateY(90deg) translateZ(100px);
        background: linear-gradient(
          160deg,
          rgba(192, 132, 252, 0.55) 0%,
          rgba(129, 140, 248, 0.5) 100%
        );
      }
      .portfolio-bg-cube__back {
        transform: rotateY(180deg) translateZ(100px);
        background: linear-gradient(
          145deg,
          rgba(129, 140, 248, 0.5) 0%,
          rgba(244, 114, 182, 0.52) 100%
        );
      }
      .portfolio-bg-cube__left {
        transform: rotateY(-90deg) translateZ(100px);
        background: linear-gradient(
          135deg,
          rgba(244, 114, 182, 0.52) 0%,
          rgba(129, 140, 248, 0.48) 100%
        );
      }
      .portfolio-bg-cube__top {
        transform: rotateX(90deg) translateZ(100px);
        background: linear-gradient(
          180deg,
          rgba(244, 114, 182, 0.48) 0%,
          rgba(192, 132, 252, 0.5) 45%,
          rgba(129, 140, 248, 0.48) 100%
        );
      }
      .portfolio-bg-cube__bottom {
        transform: rotateX(-90deg) translateZ(100px);
        background: linear-gradient(
          0deg,
          rgba(129, 140, 248, 0.5) 0%,
          rgba(192, 132, 252, 0.48) 55%,
          rgba(244, 114, 182, 0.5) 100%
        );
      }
    `}</style>
  );
}
