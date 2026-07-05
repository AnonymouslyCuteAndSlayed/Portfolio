/* eslint-disable no-unused-vars */
import { useMemo, useState, useEffect, useRef, useCallback } from "react";

const mulberry32 = (seed) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const buildBlobPath = (rand, pointCount = 9) => {
  const points = [];
  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * Math.PI * 2;
    const radius = 30 + rand() * 22;
    points.push({
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius * (0.85 + rand() * 0.3),
    });
  }

  let d = `M ${points[0].x} ${points[0].y} `;
  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    const midX = (curr.x + next.x) / 2;
    const midY = (curr.y + next.y) / 2;
    d += `Q ${curr.x} ${curr.y} ${midX} ${midY} `;
  }
  d += "Z";
  return d;
};

const buildSplatterCluster = (rand) => {
  const main = buildBlobPath(rand, 8 + Math.floor(rand() * 4));
  const dropletCount = Math.floor(rand() * 4);
  const droplets = [];
  for (let i = 0; i < dropletCount; i++) {
    const angle = rand() * Math.PI * 2;
    const dist = 55 + rand() * 35;
    droplets.push({
      cx: 50 + Math.cos(angle) * dist,
      cy: 50 + Math.sin(angle) * dist,
      r: 4 + rand() * 8,
    });
  }
  return { main, droplets };
};

const generateSplatterTile = (tileSeed, targetCount = 9) => {
  const rand = mulberry32(tileSeed);
  const placed = [];
  const maxAttempts = 600;
  let attempts = 0;

  while (placed.length < targetCount && attempts < maxAttempts) {
    attempts++;

    const sizeRoll = rand();
    let scale;
    if (sizeRoll < 0.4) scale = 0.35 + rand() * 0.2;
    else if (sizeRoll < 0.75) scale = 0.55 + rand() * 0.25;
    else if (sizeRoll < 0.92) scale = 0.8 + rand() * 0.3;
    else scale = 1.1 + rand() * 0.35;

    const top = rand() * 100;
    const left = rand() * 100;

    const tooClose = placed.some((p) => {
      const dx = p.left - left;
      const dy = p.top - top;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const minDist = (p.scale + scale) * 9;
      return dist < minDist;
    });

    if (tooClose) continue;

    const cluster = buildSplatterCluster(rand);

    placed.push({
      id: `${tileSeed}-s${placed.length}`,
      top,
      left,
      scale,
      rotate: rand() * 360,
      opacity: 0.3 + rand() * 0.35,
      hue: rand() > 0.55 ? "rose" : "blush",
      seedOffset: Math.floor(rand() * 1000),
      cluster,
    });
  }

  return placed;
};

// Stars use the SAME rand stream (continuing from where splatters left off)
// so the whole tile's layout stays deterministic per seed, but placed with
// their own spacing rules since stars are much smaller than splatters.
const generateStarsForTile = (rand, targetCount = 14) => {
  const placed = [];
  const maxAttempts = 800; // raised from 400 to give more room for a denser field
  let attempts = 0;

  while (placed.length < targetCount && attempts < maxAttempts) {
    attempts++;

    const top = rand() * 100;
    const left = rand() * 100;
    const size = 0.25 + rand() * 0.45;

    const tooClose = placed.some((p) => {
      const dx = p.left - left;
      const dy = p.top - top;
      return Math.sqrt(dx * dx + dy * dy) < 2.5; // tighter, was 4
    });
    if (tooClose) continue;

    placed.push({
      top,
      left,
      size,
      duration: 1.8 + rand() * 2.4,
      delay: rand() * 3,
      baseOpacity: 0.35 + rand() * 0.3,
      peakOpacity: 0.8 + rand() * 0.2,
    });
  }

  return placed;
};

const WatercolorSplatter = ({ splatter }) => {
  const filterId = `wc-${splatter.id}`;
  const gradId = `grad-${splatter.id}`;

  const colorStops =
    splatter.hue === "rose"
      ? { c1: "#FBDCE7", c2: "#F2AFC7", c3: "#E48CAC" }
      : { c1: "#FDF0F4", c2: "#F8D2E1", c3: "#EEB9CE" };

  return (
    <g
      transform={`translate(${splatter.left} ${splatter.top}) scale(${
        splatter.scale * 0.16
      }) rotate(${splatter.rotate})`}
      opacity={splatter.opacity}
    >
      <defs>
        <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.035"
            numOctaves="3"
            seed={splatter.seedOffset}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="14"
            xChannelSelector="R"
            yChannelSelector="G"
          />
          <feGaussianBlur stdDeviation="2.2" />
        </filter>

        <radialGradient id={gradId} cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="30%" stopColor={colorStops.c1} stopOpacity="0.85" />
          <stop offset="65%" stopColor={colorStops.c2} stopOpacity="0.7" />
          <stop offset="100%" stopColor={colorStops.c3} stopOpacity="0.35" />
        </radialGradient>
      </defs>

      <g filter={`url(#${filterId})`}>
        <path d={splatter.cluster.main} fill={`url(#${gradId})`} />
        {splatter.cluster.droplets.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={`url(#${gradId})`} />
        ))}
      </g>
    </g>
  );
};

// Twinkle animation now driven by CSS (via inline <style> in the SVG) instead
// of SMIL <animate>, for more reliable cross-browser behavior and easier
// debugging in DevTools.
const TwinkleStar = ({ star }) => (
  <g
    className="twinkle-star"
    transform={`translate(${star.left} ${star.top})`}
    style={{
      "--duration": `${star.duration}s`,
      "--delay": `${star.delay}s`,
      "--base-opacity": star.baseOpacity,
      "--peak-opacity": star.peakOpacity,
    }}
  >
    <path
      d={`M 0 ${-star.size} 
          C ${star.size * 0.15} ${-star.size * 0.15}, ${star.size * 0.15} ${-star.size * 0.15}, ${star.size} 0
          C ${star.size * 0.15} ${star.size * 0.15}, ${star.size * 0.15} ${star.size * 0.15}, 0 ${star.size}
          C ${-star.size * 0.15} ${star.size * 0.15}, ${-star.size * 0.15} ${star.size * 0.15}, ${-star.size} 0
          C ${-star.size * 0.15} ${-star.size * 0.15}, ${-star.size * 0.15} ${-star.size * 0.15}, 0 ${-star.size} Z`}
      fill="#FFD866"
    />
  </g>
);

const SplatterScreen = ({ tileSeed }) => {
  const { splatters, stars } = useMemo(() => {
    const rand = mulberry32(tileSeed);
    const s = generateSplatterTile(tileSeed, 9);
    const starRand = mulberry32(tileSeed + 500);
    const st = generateStarsForTile(starRand, 40);
    return { splatters: s, stars: st };
  }, [tileSeed]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: "block" }}
    >
      <style>
        {`
          .twinkle-star {
            opacity: 0;
            animation: twinkle var(--duration) ease-in-out var(--delay) infinite;
          }
          @keyframes twinkle {
            0%, 70% { opacity: 0; }
            80% { opacity: var(--peak-opacity); }
            90% { opacity: var(--peak-opacity); }
            100% { opacity: 0; }
          }
        `}
      </style>
      {splatters.map((s) => (
        <WatercolorSplatter key={s.id} splatter={s} />
      ))}
      {stars.map((star, i) => (
        <TwinkleStar key={`${tileSeed}-star-${i}`} star={star} />
      ))}
    </svg>
  );
};

const WatercolorCloudBackground = ({ seed = 7, tileBuffer = 2 }) => {
  const [viewportHeight, setViewportHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 800
  );

  // Compute the correct starting tile count immediately based on current
  // scroll position, so we never need to call checkAndGrow() synchronously
  // inside an effect just to "catch up" on mount.
  const [tileCount, setTileCount] = useState(() => {
    if (typeof window === "undefined") return 3;
    const vh = window.innerHeight;
    const scrollBottom = window.scrollY + vh;
    let count = 3;
    while (scrollBottom > count * vh - vh * tileBuffer) {
      count += 2;
    }
    return count;
  });

  const tileCountRef = useRef(tileCount);

  useEffect(() => {
    tileCountRef.current = tileCount;
  }, [tileCount]);

  useEffect(() => {
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkAndGrow = useCallback(() => {
    const scrollBottom = window.scrollY + window.innerHeight;
    const renderedHeight = tileCountRef.current * viewportHeight;

    if (scrollBottom > renderedHeight - viewportHeight * tileBuffer) {
      setTileCount((prev) => prev + 2);
    }
  }, [viewportHeight, tileBuffer]);

  // Only subscribe here — no synchronous checkAndGrow() call on mount,
  // since initial tileCount already accounts for current scroll position.
  useEffect(() => {
    window.addEventListener("scroll", checkAndGrow, { passive: true });
    window.addEventListener("resize", checkAndGrow);
    return () => {
      window.removeEventListener("scroll", checkAndGrow);
      window.removeEventListener("resize", checkAndGrow);
    };
  }, [checkAndGrow]);

  const tiles = useMemo(
    () => Array.from({ length: tileCount }, (_, i) => seed * 1000 + i),
    [tileCount, seed]
  );

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: `${tileCount * viewportHeight}px`,
        zIndex: -1,
        overflow: "hidden",
        background: "#FFFFFF",
        pointerEvents: "none",
      }}
    >
      {tiles.map((tileSeed, i) => (
        <div
          key={tileSeed}
          style={{
            position: "absolute",
            top: `${i * viewportHeight - 10}px`,  
            left: 0,
            width: "100%",
            height: `${viewportHeight + 150}px`,    
          }}
        >
          <SplatterScreen tileSeed={tileSeed} />
        </div>

      ))}
    </div>
  );
};
export default WatercolorCloudBackground;