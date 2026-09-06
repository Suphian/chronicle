"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { world, worldById } from "@/content/world";
import { chapters } from "@/content/chapters";
import type { WorldLocation } from "@/content/types";

const W = 1200;
const H = 800;

const glyph: Record<WorldLocation["type"], string> = {
  city: "◆",
  ruin: "✕",
  wild: "❖",
  landmark: "▲",
  sea: "≈",
};

/**
 * Pan-and-zoom SVG world map. The terrain is hand-drawn vector art so the
 * site works before you have a painted map; swap the <Terrain/> for an
 * <image href="/images/world/map.jpg" width={W} height={H}/> when you do.
 */
export function WorldMap({ initialAt }: { initialAt?: string }) {
  const [selected, setSelected] = useState<WorldLocation | undefined>(initialAt ? worldById[initialAt] : undefined);
  const [view, setView] = useState(() => {
    const loc = initialAt ? worldById[initialAt] : undefined;
    if (!loc) return { x: 0, y: 0, k: 1 };
    const k = 1.8;
    return { x: W / 2 - loc.x * k, y: H / 2 - loc.y * k, k };
  });
  const drag = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);
  const moved = useRef(false);
  const [dragging, setDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const clientToSvg = useCallback((cx: number, cy: number) => {
    const svg = svgRef.current!;
    const r = svg.getBoundingClientRect();
    return { x: ((cx - r.left) / r.width) * W, y: ((cy - r.top) / r.height) * H };
  }, []);

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const p = clientToSvg(e.clientX, e.clientY);
    setView((v) => {
      const k = Math.min(4, Math.max(0.6, v.k * (e.deltaY < 0 ? 1.12 : 0.89)));
      // keep the point under the cursor fixed
      const x = p.x - ((p.x - v.x) / v.k) * k;
      const y = p.y - ((p.y - v.y) / v.k) * k;
      return { x, y, k };
    });
  };

  const zoomBy = (f: number) =>
    setView((v) => {
      const k = Math.min(4, Math.max(0.6, v.k * f));
      const cx = W / 2;
      const cy = H / 2;
      return { x: cx - ((cx - v.x) / v.k) * k, y: cy - ((cy - v.y) / v.k) * k, k };
    });

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    moved.current = false;
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const svg = svgRef.current!;
    const r = svg.getBoundingClientRect();
    const dx = ((e.clientX - drag.current.x) / r.width) * W;
    const dy = ((e.clientY - drag.current.y) / r.height) * H;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved.current = true;
    setView((v) => ({ ...v, x: drag.current!.vx + dx, y: drag.current!.vy + dy }));
  };
  const onPointerUp = () => {
    drag.current = null;
    setDragging(false);
  };

  const pick = (loc: WorldLocation) => {
    if (moved.current) return;
    setSelected(loc);
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0d0b09]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-full w-full touch-none"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onClick={() => !moved.current && setSelected(undefined)}
      >
        <defs>
          <filter id="paper" x="0" y="0" width="1" height="1">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="n" />
            <feColorMatrix in="n" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.12" />
            </feComponentTransfer>
            <feBlend in2="SourceGraphic" mode="multiply" />
          </filter>
          <radialGradient id="sea" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#2b3a45" />
            <stop offset="100%" stopColor="#141c22" />
          </radialGradient>
          <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8f7a5a" />
            <stop offset="100%" stopColor="#6f5d43" />
          </linearGradient>
          <pattern id="waves" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q10 4 20 10 T40 10" fill="none" stroke="#5f7684" strokeWidth="0.8" opacity="0.5" />
          </pattern>
        </defs>

        <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
          <Terrain />
          {world.map((loc) => (
            <Pin key={loc.id} loc={loc} k={view.k} active={selected?.id === loc.id} onPick={pick} />
          ))}
        </g>
        <rect width={W} height={H} fill="#000" filter="url(#paper)" opacity="0.5" pointerEvents="none" />
      </svg>

      {/* Zoom controls */}
      <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2 md:right-6 md:bottom-6">
        {[
          ["+", 1.3],
          ["−", 0.77],
        ].map(([label, f]) => (
          <button
            key={label as string}
            onClick={() => zoomBy(f as number)}
            className="h-9 w-9 rounded-full border border-parchment/30 bg-black/50 text-parchment backdrop-blur hover:border-parchment"
            aria-label={label === "+" ? "Zoom in" : "Zoom out"}
          >
            {label as string}
          </button>
        ))}
        <button
          onClick={() => setView({ x: 0, y: 0, k: 1 })}
          className="h-9 w-9 rounded-full border border-parchment/30 bg-black/50 text-xs text-parchment backdrop-blur hover:border-parchment"
          aria-label="Reset view"
        >
          ⟲
        </button>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.aside
            key={selected.id}
            className="absolute inset-x-0 bottom-0 z-20 max-h-[55%] overflow-y-auto border-t border-parchment/15 bg-[#0d0b09]/95 p-6 backdrop-blur md:inset-x-auto md:top-4 md:right-4 md:bottom-4 md:max-h-none md:w-96 md:rounded-xl md:border"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35 }}
          >
            <button
              onClick={() => setSelected(undefined)}
              className="absolute top-4 right-4 text-parchment/50 hover:text-parchment"
              aria-label="Close"
            >
              ✕
            </button>
            <p className="font-display text-[10px] tracking-[0.35em] text-parchment/50 uppercase">{selected.type}</p>
            <h2 className="font-display mt-1 text-2xl text-parchment">{selected.name}</h2>
            <p className="font-serif mt-1 text-parchment/60 italic">{selected.tagline}</p>
            <p className="font-serif mt-4 leading-relaxed text-parchment/85">{selected.description}</p>
            {selected.appearsIn?.length ? (
              <div className="mt-5">
                <p className="font-display text-[10px] tracking-[0.35em] text-parchment/50 uppercase">Appears in</p>
                <ul className="mt-2 space-y-1">
                  {selected.appearsIn.map((ref, i) => {
                    const ch = chapters.find((c) => c.slug === ref.chapter);
                    if (!ch) return null;
                    return (
                      <li key={i}>
                        <Link
                          href={`/chapters/${ch.slug}${ref.scene ? `?scene=${ref.scene}` : ""}`}
                          className="font-serif text-parchment underline-offset-4 hover:underline"
                        >
                          {ch.title}
                          {ref.label ? <span className="text-parchment/50"> · {ref.label}</span> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

function Pin({
  loc,
  k,
  active,
  onPick,
}: {
  loc: WorldLocation;
  k: number;
  active: boolean;
  onPick: (l: WorldLocation) => void;
}) {
  const s = 1 / k; // keep pins the same size on screen while zooming
  return (
    <g
      transform={`translate(${loc.x} ${loc.y}) scale(${s})`}
      className="cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        onPick(loc);
      }}
    >
      <circle r={active ? 18 : 14} fill={active ? "#ffd77f" : "#0d0b09"} opacity={active ? 0.25 : 0.6} />
      <circle r={active ? 9 : 7} fill={active ? "#ffd77f" : "#e8dcc4"} stroke="#0d0b09" strokeWidth="1.5" />
      <text y="4" textAnchor="middle" fontSize="9" fill="#0d0b09" style={{ pointerEvents: "none" }}>
        {glyph[loc.type]}
      </text>
      <text
        y="28"
        textAnchor="middle"
        fontSize="13"
        fill="#e8dcc4"
        style={{ pointerEvents: "none", fontFamily: "var(--font-cinzel)", letterSpacing: "0.12em" }}
        stroke="#0d0b09"
        strokeWidth="3"
        paintOrder="stroke"
      >
        {loc.name.toUpperCase()}
      </text>
    </g>
  );
}

/** Placeholder vector terrain. Replace with a painted map image when you have one. */
function Terrain() {
  return (
    <g>
      <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="url(#sea)" />
      <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="url(#waves)" />
      {/* main continent */}
      <path
        d="M200 110 C300 50 460 70 560 120 C680 90 800 120 900 180 C1040 240 1100 400 1040 520 C990 640 860 700 700 690 C580 720 480 660 420 600 C330 590 230 540 190 440 C150 340 130 200 200 110 Z"
        fill="url(#land)"
        stroke="#3d3222"
        strokeWidth="3"
      />
      <path
        d="M200 110 C300 50 460 70 560 120 C680 90 800 120 900 180 C1040 240 1100 400 1040 520 C990 640 860 700 700 690 C580 720 480 660 420 600 C330 590 230 540 190 440 C150 340 130 200 200 110 Z"
        fill="none"
        stroke="#c9b48c"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* the Moonlit Isle */}
      <path d="M80 320 C95 300 130 305 140 330 C150 355 125 375 100 370 C80 365 70 340 80 320 Z" fill="url(#land)" stroke="#3d3222" strokeWidth="2" />
      {/* Lysandria: mountains */}
      {[
        [250, 200], [290, 180], [330, 210], [370, 190], [270, 240], [320, 250], [360, 235], [400, 220], [240, 280], [300, 290],
      ].map(([x, y], i) => (
        <path key={i} d={`M${x - 20} ${y + 16} L${x} ${y - 16} L${x + 20} ${y + 16} Z`} fill="#5b4f3d" stroke="#2e2619" strokeWidth="1.5" />
      ))}
      {/* Bakhtar: highlands and cave mouths */}
      {[
        [590, 250], [630, 230], [670, 255], [710, 240], [610, 290], [650, 300], [690, 285], [730, 275],
      ].map(([x, y], i) => (
        <path key={`b${i}`} d={`M${x - 22} ${y + 18} L${x} ${y - 20} L${x + 22} ${y + 18} Z`} fill="#4a4034" stroke="#241d14" strokeWidth="1.5" />
      ))}
      {[
        [612, 262], [655, 268], [700, 258],
      ].map(([x, y], i) => (
        <ellipse key={`c${i}`} cx={x} cy={y} rx="4" ry="6" fill="#120e0a" />
      ))}
      {/* Sidrat Al Muntaha: Lake Siraj */}
      <ellipse cx="820" cy="180" rx="70" ry="40" fill="#3f6b7a" stroke="#1f3740" strokeWidth="2" />
      <ellipse cx="820" cy="180" rx="45" ry="22" fill="#6fb3c2" opacity="0.5" />
      {/* Tengeri Wastes: canyons */}
      {[
        [920, 270, 1000, 290], [930, 310, 1005, 330], [915, 350, 990, 360], [950, 240, 1010, 250],
      ].map(([x1, y1, x2, y2], i) => (
        <path key={i} d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${y1 - 12} ${x2} ${y2}`} fill="none" stroke="#8a6a3f" strokeWidth="4" strokeLinecap="round" />
      ))}
      {/* river from the mountains to Carthara */}
      <path
        d="M330 260 C400 340 470 380 520 440 C560 490 580 520 600 540"
        fill="none"
        stroke="#3d5665"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Carthara: walls and market */}
      <rect x="575" y="520" width="50" height="36" fill="#7a6247" stroke="#2e2619" strokeWidth="1.5" />
      <rect x="590" y="505" width="20" height="18" fill="#8f7454" stroke="#2e2619" strokeWidth="1.5" />
      {/* Numarius's fields */}
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={690} y1={590 + i * 10} x2={760} y2={585 + i * 10} stroke="#4f5a2c" strokeWidth="3" />
      ))}
      {/* compass rose */}
      <g transform="translate(1080 680)" opacity="0.7">
        <circle r="34" fill="none" stroke="#c9b48c" strokeWidth="1" />
        <path d="M0 -40 L8 0 L0 40 L-8 0 Z" fill="#c9b48c" />
        <path d="M-40 0 L0 8 L40 0 L0 -8 Z" fill="#c9b48c" opacity="0.6" />
        <text y="-46" textAnchor="middle" fontSize="12" fill="#e8dcc4" style={{ fontFamily: "var(--font-cinzel)" }}>N</text>
      </g>
    </g>
  );
}
