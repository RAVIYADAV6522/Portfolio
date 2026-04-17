"use client";

import { useEffect, useRef } from "react";

const cubeSlotClass =
  "absolute flex h-[min(42vw,280px)] w-[min(42vw,280px)] items-center justify-center sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px]";

/**
 * Three subtle 3D cubes (left, center, right) in the page background, rAF-driven.
 */
export function BackgroundCube() {
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const tick = (t: number) => {
      const left = leftRef.current;
      const center = centerRef.current;
      const right = rightRef.current;

      if (left) {
        const rotate = Math.sin((t + 4200) / 10000) * 200;
        const y = (1 + Math.sin((t + 900) / 1000)) * -50;
        left.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${-rotate}deg)`;
      }
      if (center) {
        const rotate = Math.sin((t + 2100) / 10000) * 200;
        const y = (1 + Math.sin((t + 450) / 1000)) * -42;
        center.style.transform = `translateY(${y}px) rotateX(${rotate * 0.92}deg) rotateY(${rotate * 0.88}deg)`;
      }
      if (right) {
        const rotate = Math.sin(t / 10000) * 200;
        const y = (1 + Math.sin(t / 1000)) * -50;
        right.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${rotate}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={`${cubeSlotClass} -left-16 top-[min(18vh,140px)] sm:left-4`}
      >
        <div className="portfolio-bg-cube__inner">
          <div className="portfolio-bg-cube__cube" ref={leftRef}>
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
        <div className="portfolio-bg-cube__inner">
          <div className="portfolio-bg-cube__cube" ref={centerRef}>
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
        <div className="portfolio-bg-cube__inner">
          <div className="portfolio-bg-cube__cube" ref={rightRef}>
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
