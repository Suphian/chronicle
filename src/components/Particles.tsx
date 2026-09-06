"use client";

import { useEffect, useRef } from "react";

type Variant = "embers" | "stars" | "motes" | "rain" | "none";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  t: number;
}

/**
 * Lightweight canvas particle overlay. Purely decorative; pointer-events are off.
 */
export function Particles({ variant, color }: { variant: Variant; color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (variant === "none") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const count = reduce ? 0 : variant === "stars" ? 140 : variant === "rain" ? 220 : 70;
    const ps: P[] = [];

    const spawn = (p: P, fresh: boolean) => {
      p.x = Math.random() * w;
      p.t = Math.random() * Math.PI * 2;
      switch (variant) {
        case "embers":
          p.y = fresh ? Math.random() * h : h + 10;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = -(0.3 + Math.random() * 0.9);
          p.r = 0.8 + Math.random() * 2;
          p.a = 0.3 + Math.random() * 0.6;
          break;
        case "stars":
          p.y = Math.random() * h;
          p.vx = 0;
          p.vy = 0;
          p.r = 0.4 + Math.random() * 1.2;
          p.a = 0.2 + Math.random() * 0.7;
          break;
        case "motes":
          p.y = fresh ? Math.random() * h : h + 10;
          p.vx = (Math.random() - 0.5) * 0.4;
          p.vy = -(0.1 + Math.random() * 0.3);
          p.r = 1 + Math.random() * 2.2;
          p.a = 0.15 + Math.random() * 0.4;
          break;
        case "rain":
          p.y = fresh ? Math.random() * h : -10;
          p.vx = -1.2;
          p.vy = 9 + Math.random() * 6;
          p.r = 0.6;
          p.a = 0.12 + Math.random() * 0.25;
          break;
      }
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < count; i++) {
      const p: P = { x: 0, y: 0, vx: 0, vy: 0, r: 0, a: 0, t: 0 };
      spawn(p, true);
      ps.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      for (const p of ps) {
        p.t += 0.02;
        if (variant === "stars") {
          ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.t * 1.5));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          continue;
        }
        p.x += p.vx + (variant === "rain" ? 0 : Math.sin(p.t) * 0.25);
        p.y += p.vy;
        if (variant === "rain") {
          ctx.globalAlpha = p.a;
          ctx.lineWidth = p.r;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 2, p.y + p.vy * 2);
          ctx.stroke();
          if (p.y > h + 10) spawn(p, false);
          continue;
        }
        ctx.globalAlpha = p.a * (0.7 + 0.3 * Math.sin(p.t * 2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.y < -10 || p.x < -10 || p.x > w + 10) spawn(p, false);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    if (count > 0) raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant, color]);

  if (variant === "none") return null;
  return <canvas ref={ref} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
