"use client";

import { useEffect, useRef } from "react";

const cubeSlotClass =
  "absolute flex h-[min(42vw,280px)] w-[min(42vw,280px)] items-center justify-center sm:h-[320px] sm:w-[320px] md:h-[360px] md:w-[360px]";

/**
 * Two subtle 3D cubes (left + right) in the page background, rAF-driven.
 */
export function BackgroundCube() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const tick = (t: number) => {
      const left = leftRef.current;
      const right = rightRef.current;

      if (left) {
        const rotate = Math.sin((t + 4200) / 10000) * 200;
        const y = (1 + Math.sin((t + 900) / 1000)) * -50;
        left.style.transform = `translateY(${y}px) rotateX(${rotate}deg) rotateY(${-rotate}deg)`;
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
        opacity: 0.22;
      }
      .dark .portfolio-bg-cube__inner {
        opacity: 0.18;
      }
      @media (max-width: 640px) {
        .portfolio-bg-cube__inner {
          opacity: 0.14;
        }
        .dark .portfolio-bg-cube__inner {
          opacity: 0.12;
        }
      }

      .portfolio-bg-cube__cube {
        width: 200px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
        will-change: transform;
      }

      .portfolio-bg-cube__side {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0.65;
        border: 1px solid rgba(148, 163, 184, 0.15);
        box-sizing: border-box;
      }

      .portfolio-bg-cube__front {
        transform: rotateY(0deg) translateZ(100px);
        background-color: rgba(45, 212, 191, 0.35);
      }
      .portfolio-bg-cube__right {
        transform: rotateY(90deg) translateZ(100px);
        background-color: rgba(99, 102, 241, 0.3);
      }
      .portfolio-bg-cube__back {
        transform: rotateY(180deg) translateZ(100px);
        background-color: rgba(244, 114, 182, 0.28);
      }
      .portfolio-bg-cube__left {
        transform: rotateY(-90deg) translateZ(100px);
        background-color: rgba(56, 189, 248, 0.3);
      }
      .portfolio-bg-cube__top {
        transform: rotateX(90deg) translateZ(100px);
        background-color: rgba(167, 139, 250, 0.28);
      }
      .portfolio-bg-cube__bottom {
        transform: rotateX(-90deg) translateZ(100px);
        background-color: rgba(52, 211, 153, 0.3);
      }
    `}</style>
  );
}
