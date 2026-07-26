import React, { useEffect, useRef, useState } from 'react';

export const QuantumTunneling3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [barrierHeight, setBarrierHeight] = useState<number>(1.8); // V0
  const [barrierWidth, setBarrierWidth] = useState<number>(40); // width in px
  const [particleEnergy, setParticleEnergy] = useState<number>(1.2); // E

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

      t += 0.04;

      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2 + 30;

      // Barrier geometry
      const barrierX1 = w / 2 - barrierWidth / 2;
      const barrierX2 = w / 2 + barrierWidth / 2;
      const barrierPxH = barrierHeight * 50;

      // Draw Potential Barrier
      ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.fillRect(barrierX1, centerY - barrierPxH, barrierWidth, barrierPxH);
      ctx.strokeRect(barrierX1, centerY - barrierPxH, barrierWidth, barrierPxH);

      // Label Potential V0 and Energy E
      ctx.fillStyle = '#f87171';
      ctx.font = '11px monospace';
      ctx.fillText(`V₀ = ${barrierHeight.toFixed(1)} eV`, barrierX1 - 10, centerY - barrierPxH - 10);

      // Energy line E
      const energyY = centerY - particleEnergy * 50;
      ctx.strokeStyle = '#22d3ee';
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(30, energyY);
      ctx.lineTo(w - 30, energyY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`E = ${particleEnergy.toFixed(1)} eV`, 35, energyY - 8);

      // Calculate Tunneling Transmission Coefficient T
      // T ~ exp(-2 * kappa * a) where kappa = sqrt(2m(V0 - E))/hbar
      const vDiff = Math.max(0.01, barrierHeight - particleEnergy);
      const kappa = Math.sqrt(vDiff) * 0.08;
      const T = barrierHeight <= particleEnergy
        ? 0.95
        : Math.exp(-2 * kappa * barrierWidth);
      const R = 1 - T;

      // Incident Wave Function Re[Ψ]
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();

      const numPts = 300;
      for (let i = 0; i < numPts; i++) {
        const x = (i / numPts) * w;
        let y = centerY;

        if (x < barrierX1) {
          // Region I: Incident + Reflected Wave
          const k1 = Math.sqrt(particleEnergy) * 0.15;
          const incident = Math.sin(k1 * x - t * 4);
          const reflected = Math.sqrt(R) * Math.sin(-k1 * x - t * 4);
          y = centerY - (incident + reflected) * 35;
        } else if (x >= barrierX1 && x <= barrierX2) {
          // Region II: Evanescent Exponential Decay Inside Barrier
          const distInside = x - barrierX1;
          const decay = Math.exp(-kappa * distInside * 2);
          const k1 = Math.sqrt(particleEnergy) * 0.15;
          y = centerY - decay * Math.sin(k1 * barrierX1 - t * 4) * 35;
        } else {
          // Region III: Transmitted Wave
          const k1 = Math.sqrt(particleEnergy) * 0.15;
          const distAfter = x - barrierX2;
          const transmitted = Math.sqrt(T) * Math.sin(k1 * distAfter + (k1 * barrierX1 - t * 4));
          y = centerY - transmitted * 35;
        }

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Display Transmission T and Reflection R metrics
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px monospace';
      ctx.fillStyle = '#4ade80';
      ctx.fillText(`Transmission Probability (T): ${(T * 100).toFixed(2)}%`, 35, 30);
      ctx.fillStyle = '#f87171';
      ctx.fillText(`Reflection Probability (R): ${(R * 100).toFixed(2)}%`, 35, 50);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [barrierHeight, barrierWidth, particleEnergy]);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312]">
        <canvas ref={canvasRef} width={700} height={380} className="w-full h-full block" />

        <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1 text-right">
          <div className="font-bold text-white">QUANTUM TUNNELING SIMULATOR</div>
          <div>Condition: {particleEnergy < barrierHeight ? 'Tunneling (E < V₀)' : 'Classical Overbarrier (E ≥ V₀)'}</div>
          <div>Evanescent Wave Decay ~ e^(-2κa)</div>
        </div>
      </div>

      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-bold">Barrier Height V₀:</span>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={barrierHeight}
            onChange={(e) => setBarrierHeight(parseFloat(e.target.value))}
            className="accent-red-400 w-24"
          />
          <span className="text-red-300 font-bold w-12">{barrierHeight.toFixed(1)} eV</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-bold">Barrier Width a:</span>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={barrierWidth}
            onChange={(e) => setBarrierWidth(parseFloat(e.target.value))}
            className="accent-purple-400 w-24"
          />
          <span className="text-purple-300 font-bold w-8">{barrierWidth} px</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-bold">Particle Energy E:</span>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={particleEnergy}
            onChange={(e) => setParticleEnergy(parseFloat(e.target.value))}
            className="accent-cyan-400 w-24"
          />
          <span className="text-cyan-300 font-bold w-12">{particleEnergy.toFixed(1)} eV</span>
        </div>
      </div>
    </div>
  );
};
