import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const HeroMotionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Node particle definition for network/circuit grid
    interface Node {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number[];
    }

    interface Pulse {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }

    // Grid creation for structured circuit-like nodes
    const cols = Math.max(6, Math.floor(width / 160));
    const rows = Math.max(4, Math.floor(height / 140));
    const nodes: Node[] = [];

    const colStep = width / (cols + 1);
    const rowStep = height / (rows + 1);

    for (let c = 1; c <= cols; c++) {
      for (let r = 1; r <= rows; r++) {
        // Add subtle organic jitter to regular grid
        const jitterX = (Math.random() - 0.5) * (colStep * 0.45);
        const jitterY = (Math.random() - 0.5) * (rowStep * 0.45);
        const posX = c * colStep + jitterX;
        const posY = r * rowStep + jitterY;

        nodes.push({
          x: posX,
          y: posY,
          baseX: posX,
          baseY: posY,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.5 + 1.2,
          connections: [],
        });
      }
    }

    // Connect close neighbors
    const maxConnectDist = Math.max(colStep, rowStep) * 1.4;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxConnectDist && nodes[i].connections.length < 3) {
          nodes[i].connections.push(j);
        }
      }
    }

    // Active pulses traveling along lines
    const pulses: Pulse[] = [];
    const pulseColors = [
      '#FF5A1F', // Orange
      '#FF8C5A', // Light Orange
      '#F59E0B', // Amber
      '#3B82F6', // Tech Blue
    ];

    const spawnPulse = () => {
      if (nodes.length === 0 || pulses.length >= 7) return;
      const randomNodeIdx = Math.floor(Math.random() * nodes.length);
      const node = nodes[randomNodeIdx];
      if (node && node.connections.length > 0) {
        const targetIdx = node.connections[Math.floor(Math.random() * node.connections.length)];
        pulses.push({
          fromIndex: randomNodeIdx,
          toIndex: targetIdx,
          progress: 0,
          speed: Math.random() * 0.012 + 0.008,
          color: pulseColors[Math.floor(Math.random() * pulseColors.length)],
          size: Math.random() * 1.5 + 1.5,
        });
      }
    };

    let lastSpawn = 0;

    // Mouse coordinates for gentle local repulsion
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Spawn pulses at periodic intervals
      if (time - lastSpawn > 600 && !prefersReducedMotion) {
        spawnPulse();
        lastSpawn = time;
      }

      // Update and draw node connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // Tether back to base position
          if (Math.abs(n.x - n.baseX) > 25) n.vx *= -1;
          if (Math.abs(n.y - n.baseY) > 25) n.vy *= -1;

          // Mouse push
          const mdx = mouseX - n.x;
          const mdy = mouseY - n.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120 && mDist > 0) {
            n.x -= (mdx / mDist) * 0.5;
            n.y -= (mdy / mDist) * 0.5;
          }
        }

        // Draw connections
        for (const connIdx of n.connections) {
          const target = nodes[connIdx];
          if (!target) continue;

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = 'rgba(235, 110, 60, 0.07)';
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Draw node point
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 90, 31, 0.18)';
        ctx.fill();

        // Node center core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 90, 31, 0.4)';
        ctx.fill();
      }

      // Update and draw traveling pulses
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const pulse = pulses[pIdx];
        pulse.progress += pulse.speed;

        const from = nodes[pulse.fromIndex];
        const to = nodes[pulse.toIndex];

        if (from && to && pulse.progress <= 1) {
          const px = from.x + (to.x - from.x) * pulse.progress;
          const py = from.y + (to.y - from.y) * pulse.progress;

          // Pulse glow trail
          const alpha = Math.sin(pulse.progress * Math.PI) * 0.85;

          ctx.beginPath();
          ctx.arc(px, py, pulse.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 90, 31, ${alpha * 0.25})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 90, 31, ${alpha})`;
          ctx.fill();
        } else {
          pulses.splice(pIdx, 1);
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10 select-none"
    >
      {/* 1. Large drifting dual-tone ambient glows (Warm Orange & Deep Slate/Navy blend) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 45, -35, 20, 0],
                y: [0, -30, 25, -20, 0],
                scale: [1, 1.08, 0.95, 1.04, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[850px] h-[350px] sm:h-[480px] rounded-full bg-gradient-to-tr from-[#FF5A1F]/14 via-[#FF8C5A]/10 to-[#1E293B]/6 blur-[120px]"
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -35, 40, -15, 0],
                y: [0, 25, -30, 15, 0],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-12 right-1/4 w-[320px] sm:w-[450px] h-[280px] rounded-full bg-gradient-to-br from-amber-500/10 via-[#FF5A1F]/8 to-transparent blur-[100px]"
      />

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 30, -20, 0],
                y: [0, -20, 20, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-6 left-1/5 w-[300px] sm:w-[420px] h-[260px] rounded-full bg-gradient-to-tr from-[#0F172A]/5 via-[#FF5A1F]/8 to-transparent blur-[100px]"
      />

      {/* 2. Interactive Network / Circuit Canvas Grid */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 sm:opacity-85"
      />

      {/* 3. Subtle Periodic Scanning Light Line */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{
            top: ['-10%', '110%'],
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: 2,
          }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF5A1F]/25 to-transparent pointer-events-none"
        />
      )}

      {/* 4. Vignette / Contrast Overlays for 100% Typography Crispness */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F6]/85 via-transparent to-[#FAF8F6]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#FAF8F6_95%)]" />
    </div>
  );
};
