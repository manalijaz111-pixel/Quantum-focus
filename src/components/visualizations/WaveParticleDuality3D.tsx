import React, { useEffect, useRef, useState } from 'react';

export const WaveParticleDuality3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [detectorActive, setDetectorActive] = useState<boolean>(false);
  const [slitAOpen, setSlitAOpen] = useState<boolean>(true);
  const [slitBOpen, setSlitBOpen] = useState<boolean>(true);
  const [firingMode, setFiringMode] = useState<'single' | 'continuous'>('continuous');
  const [hits, setHits] = useState<number[]>(new Array(200).fill(0));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let waveTime = 0;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string }> = [];

    const render = () => {
      ctx.fillStyle = '#060312';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveTime += 0.05;

      // 1. Electron/Photon Gun (Left side)
      ctx.fillStyle = '#06b6d4';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 10;
      ctx.fillRect(20, canvas.height / 2 - 25, 30, 50);
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText('EMITTER', 12, canvas.height / 2 - 32);

      // 2. Double Slit Barrier (Middle x = 200)
      const barrierX = 220;
      ctx.fillStyle = '#1e103d';
      ctx.fillRect(barrierX, 0, 12, canvas.height);

      // Slit Dimensions
      const slitHeight = 35;
      const slitAY = canvas.height / 2 - 50;
      const slitBY = canvas.height / 2 + 15;

      // Draw Slits
      if (slitAOpen) {
        ctx.clearRect(barrierX, slitAY, 12, slitHeight);
        ctx.strokeStyle = '#22d3ee';
        ctx.strokeRect(barrierX, slitAY, 12, slitHeight);
      }
      if (slitBOpen) {
        ctx.clearRect(barrierX, slitBY, 12, slitHeight);
        ctx.strokeStyle = '#22d3ee';
        ctx.strokeRect(barrierX, slitBY, 12, slitHeight);
      }

      // Detector Icon at barrier if active
      if (detectorActive) {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(barrierX + 6, slitAY - 10, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.font = '8px monospace';
        ctx.fillText('DETECTOR ON', barrierX - 20, slitAY - 22);
      }

      // 3. Wave Propagation (Left of barrier -> spherical wavefronts right of barrier)
      if (!detectorActive && (slitAOpen || slitBOpen)) {
        ctx.lineWidth = 1.5;

        // Plane wave moving right towards barrier
        for (let x = 60; x < barrierX; x += 15) {
          const opacity = Math.max(0, 1 - (barrierX - x) / 200);
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.4})`;
          ctx.beginPath();
          ctx.moveTo(x, 40);
          ctx.lineTo(x, canvas.height - 40);
          ctx.stroke();
        }

        // Circular interfering wave arcs from open slits
        const maxRadius = canvas.width - barrierX;

        for (let r = (waveTime * 15) % 20; r < maxRadius; r += 20) {
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';

          if (slitAOpen) {
            ctx.beginPath();
            ctx.arc(barrierX, slitAY + slitHeight / 2, r, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();
          }
          if (slitBOpen) {
            ctx.beginPath();
            ctx.arc(barrierX, slitBY + slitHeight / 2, r, -Math.PI / 2, Math.PI / 2);
            ctx.stroke();
          }
        }
      }

      // 4. Particle Generation & Movement
      if (Math.random() < (firingMode === 'continuous' ? 0.4 : 0.1)) {
        let vy = (Math.random() - 0.5) * 1.5;
        let chosenSlit = 'A';

        if (slitAOpen && slitBOpen) {
          chosenSlit = Math.random() < 0.5 ? 'A' : 'B';
        } else if (slitAOpen) chosenSlit = 'A';
        else if (slitBOpen) chosenSlit = 'B';

        const startY = chosenSlit === 'A' ? slitAY + slitHeight / 2 : slitBY + slitHeight / 2;

        if (!detectorActive && slitAOpen && slitBOpen) {
          // Interference probability distribution angle
          const lambda = 12;
          const d = slitBY - slitAY;
          const angle = Math.asin(((Math.floor(Math.random() * 7) - 3) * lambda) / d) || (Math.random() - 0.5) * 0.8;
          vy = Math.tan(angle) * 3;
        }

        particles.push({
          x: barrierX + 12,
          y: startY,
          vx: 3 + Math.random() * 0.5,
          vy,
          color: detectorActive ? '#ef4444' : '#22d3ee'
        });
      }

      // Move Particles
      const screenX = canvas.width - 60;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Hit detector screen
        if (p.x >= screenX) {
          const binIndex = Math.floor((p.y / canvas.height) * 200);
          if (binIndex >= 0 && binIndex < 200) {
            setHits(prev => {
              const next = [...prev];
              next[binIndex] = (next[binIndex] || 0) + 1;
              return next;
            });
          }
          particles.splice(i, 1);
        }
      }

      // 5. Detector Screen (Right side)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(screenX, 20, 10, canvas.height - 40);
      ctx.fillStyle = '#ffffff';
      ctx.fillText('SCREEN', screenX - 10, 15);

      // Draw accumulated intensity histogram
      const maxHit = Math.max(...hits, 1);
      ctx.fillStyle = detectorActive ? '#f87171' : '#38bdf8';

      hits.forEach((count, idx) => {
        if (count > 0) {
          const y = (idx / 200) * canvas.height;
          const barW = Math.min((count / maxHit) * 45, 45);
          ctx.fillRect(screenX + 12, y, barW, 2);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [detectorActive, slitAOpen, slitBOpen, firingMode, hits]);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312]">
        <canvas ref={canvasRef} width={700} height={380} className="w-full h-full block" />

        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            DOUBLE-SLIT INTERFERENCE EXPERIMENT
          </div>
          <div>Which-Way Detector: <span className={detectorActive ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>{detectorActive ? 'ACTIVE (COLLAPSED)' : 'OFF (QUANTUM INTERFERENCE)'}</span></div>
          <div>Slit States: Slit A ({slitAOpen ? 'OPEN' : 'CLOSED'}), Slit B ({slitBOpen ? 'OPEN' : 'CLOSED'})</div>
        </div>
      </div>

      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSlitAOpen(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              slitAOpen ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-900 text-slate-500 border-slate-700'
            }`}
          >
            Slit A {slitAOpen ? '✓' : '✗'}
          </button>
          <button
            onClick={() => setSlitBOpen(prev => !prev)}
            className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
              slitBOpen ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-slate-900 text-slate-500 border-slate-700'
            }`}
          >
            Slit B {slitBOpen ? '✓' : '✗'}
          </button>
        </div>

        <button
          onClick={() => setDetectorActive(prev => !prev)}
          className={`px-4 py-2 rounded-xl font-bold border transition-all flex items-center gap-1.5 ${
            detectorActive
              ? 'bg-red-950 text-red-300 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
              : 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
          }`}
        >
          <span className="material-symbols-outlined text-sm">{detectorActive ? 'visibility' : 'visibility_off'}</span>
          Detector: {detectorActive ? 'ON (Collapses Wave)' : 'OFF (Wave Interference)'}
        </button>

        <button
          onClick={() => setHits(new Array(200).fill(0))}
          className="px-3 py-1.5 rounded-lg bg-[#180E3C] text-slate-300 border border-[#231242] hover:text-white"
        >
          Clear Screen Hits
        </button>
      </div>
    </div>
  );
};
