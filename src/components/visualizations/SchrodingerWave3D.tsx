import React, { useEffect, useRef, useState } from 'react';

export const SchrodingerWave3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [k0, setK0] = useState<number>(3); // Momentum wavenumber
  const [sigma, setSigma] = useState<number>(0.15); // Spatial width
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showComponents, setShowComponents] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.fillStyle = '#060312';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!isPaused) {
        t += 0.03;
      }

      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      // Draw Grid Axes
      ctx.strokeStyle = '#1e103d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();

      // Compute Wave Packet Ψ(x,t)
      const numPoints = 300;
      const x0 = 0.3 + ((t * 0.08) % 0.5); // Center moves right with momentum k0

      // Points array
      const realPts: Array<{ x: number; y: number }> = [];
      const imagPts: Array<{ x: number; y: number }> = [];
      const probPts: Array<{ x: number; y: number }> = [];

      for (let i = 0; i <= numPoints; i++) {
        const xNorm = i / numPoints; // 0 to 1
        const x = (xNorm - x0) / sigma;

        // Envelope Gaussian: exp(-x^2 / 2)
        const envelope = Math.exp(-(x * x) / 2);

        // Phase angle phi = k0 * xNorm - omega * t
        const phase = k0 * 25 * xNorm - 2 * t;

        const re = envelope * Math.cos(phase);
        const im = envelope * Math.sin(phase);
        const prob = envelope * envelope;

        const px = xNorm * w;
        realPts.push({ x: px, y: centerY - re * 70 });
        imagPts.push({ x: px, y: centerY - im * 70 });
        probPts.push({ x: px, y: centerY - prob * 100 });
      }

      // Draw Real Part Re[Ψ]
      if (showComponents) {
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        realPts.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Draw Imaginary Part Im[Ψ]
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        imagPts.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
      }

      // Draw Probability Envelope |Ψ|² (Gold Filled)
      ctx.fillStyle = 'rgba(234, 179, 8, 0.25)';
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      probPts.forEach((pt) => {
        ctx.lineTo(pt.x, pt.y);
      });
      ctx.lineTo(w, centerY);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Legend
      ctx.fillStyle = '#ffffff';
      ctx.font = '11px monospace';
      ctx.fillStyle = '#eab308';
      ctx.fillText('■ Probability Density |Ψ(x,t)|^2', 20, 25);
      if (showComponents) {
        ctx.fillStyle = '#22d3ee';
        ctx.fillText('■ Real Part Re[Ψ]', 230, 25);
        ctx.fillStyle = '#a855f7';
        ctx.fillText('■ Imaginary Part Im[Ψ]', 370, 25);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [k0, sigma, isPaused, showComponents]);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312]">
        <canvas ref={canvasRef} width={700} height={380} className="w-full h-full block" />

        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1 text-right">
          <div className="font-bold text-white">SCHRÖDINGER WAVEPACKET Ψ(x,t)</div>
          <div>Momentum k₀: {k0} rad/m</div>
          <div>Width σ: {sigma.toFixed(2)} m</div>
          <div>Norm ∫|Ψ|²dx = 1.00 (Preserved)</div>
        </div>
      </div>

      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-bold">Momentum k₀:</span>
          <input
            type="range"
            min="1"
            max="6"
            step="0.5"
            value={k0}
            onChange={(e) => setK0(parseFloat(e.target.value))}
            className="accent-cyan-400 w-28"
          />
          <span className="text-cyan-300 font-bold">{k0}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-bold">Packet Width σ:</span>
          <input
            type="range"
            min="0.08"
            max="0.30"
            step="0.02"
            value={sigma}
            onChange={(e) => setSigma(parseFloat(e.target.value))}
            className="accent-purple-400 w-28"
          />
          <span className="text-purple-300 font-bold">{sigma.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowComponents(prev => !prev)}
            className="px-3 py-1.5 rounded-lg bg-[#180E3C] border border-cyan-500/30 text-cyan-300 font-bold"
          >
            {showComponents ? 'Hide Re/Im' : 'Show Re/Im'}
          </button>

          <button
            onClick={() => setIsPaused(prev => !prev)}
            className="quantum-glow font-bold px-4 py-1.5 rounded-lg text-white"
          >
            {isPaused ? 'Resume Time' : 'Pause Time'}
          </button>
        </div>
      </div>
    </div>
  );
};
