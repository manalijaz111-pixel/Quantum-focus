import React, { useState } from 'react';

export const Superposition3D: React.FC = () => {
  const [alphaProb, setAlphaProb] = useState<number>(0.5); // P(0)
  const [shots, setShots] = useState<{ zero: number; one: number }>({ zero: 0, one: 0 });
  const [lastMeasured, setLastMeasured] = useState<'|0⟩' | '|1⟩' | null>(null);

  const betaProb = 1 - alphaProb;
  const alphaMag = Math.sqrt(alphaProb);
  const betaMag = Math.sqrt(betaProb);

  const handleMeasureSingle = () => {
    const outcome = Math.random() < alphaProb ? '|0⟩' : '|1⟩';
    setLastMeasured(outcome);
    setShots(prev => ({
      zero: outcome === '|0⟩' ? prev.zero + 1 : prev.zero,
      one: outcome === '|1⟩' ? prev.one + 1 : prev.one
    }));
  };

  const handleRunShots = (count: number) => {
    let zeros = 0;
    let ones = 0;
    for (let i = 0; i < count; i++) {
      if (Math.random() < alphaProb) zeros++;
      else ones++;
    }
    setShots(prev => ({ zero: prev.zero + zeros, one: prev.one + ones }));
    setLastMeasured(zeros > ones ? '|0⟩' : '|1⟩');
  };

  const totalShots = shots.zero + shots.one;

  return (
    <div className="space-y-4">
      {/* Visual State Canvas Box */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312] p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
          <div className="font-bold flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            QUANTUM SUPERPOSITION & MEASUREMENT
          </div>
          <div>State: |ψ⟩ = {alphaMag.toFixed(2)}|0⟩ + {betaMag.toFixed(2)}|1⟩</div>
        </div>

        {/* Dynamic Superposition Sphere/Orb Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-auto">
          {/* |0> State Orb */}
          <div className="flex flex-col items-center space-y-2">
            <div
              className="rounded-full border-2 border-cyan-400 bg-cyan-950 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              style={{
                width: `${Math.max(40, alphaProb * 120)}px`,
                height: `${Math.max(40, alphaProb * 120)}px`,
                opacity: 0.3 + alphaProb * 0.7
              }}
            >
              <span className="font-mono font-bold text-white text-lg">|0⟩</span>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-bold">
              P(0) = {(alphaProb * 100).toFixed(1)}%
            </span>
          </div>

          <div className="text-xl font-extrabold text-cyan-400 font-mono">
            +
          </div>

          {/* |1> State Orb */}
          <div className="flex flex-col items-center space-y-2">
            <div
              className="rounded-full border-2 border-purple-400 bg-purple-950 flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.5)]"
              style={{
                width: `${Math.max(40, betaProb * 120)}px`,
                height: `${Math.max(40, betaProb * 120)}px`,
                opacity: 0.3 + betaProb * 0.7
              }}
            >
              <span className="font-mono font-bold text-white text-lg">|1⟩</span>
            </div>
            <span className="text-xs font-mono text-purple-300 font-bold">
              P(1) = {(betaProb * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Measurement Result Indicator */}
        <div className="bg-[#0D0727] p-3 rounded-xl border border-[#231242] flex items-center justify-between text-xs font-mono">
          <div>
            Last Collapse Outcome:{' '}
            <span className="font-bold text-yellow-300 text-sm">{lastMeasured || 'Not measured yet'}</span>
          </div>
          <div>Total Experimental Shots: {totalShots.toLocaleString()}</div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] space-y-3 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="text-slate-300 font-bold">Adjust Amplitude α (Probability of |0⟩):</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={alphaProb}
            onChange={(e) => setAlphaProb(parseFloat(e.target.value))}
            className="accent-cyan-400 flex-1"
          />
          <span className="text-cyan-300 font-bold w-12">{(alphaProb * 100).toFixed(0)}%</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#231242]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleMeasureSingle}
              className="quantum-glow font-bold px-4 py-2 rounded-xl text-white flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">adjust</span>
              Measure 1 Shot (Collapse)
            </button>

            <button
              onClick={() => handleRunShots(100)}
              className="px-3.5 py-2 rounded-xl bg-[#180E3C] border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-950 transition-all"
            >
              Run 100 Shots
            </button>

            <button
              onClick={() => handleRunShots(1000)}
              className="px-3.5 py-2 rounded-xl bg-[#180E3C] border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-950 transition-all"
            >
              Run 1,000 Shots
            </button>
          </div>

          <button
            onClick={() => { setShots({ zero: 0, one: 0 }); setLastMeasured(null); }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-700 hover:text-white"
          >
            Reset Shots
          </button>
        </div>
      </div>
    </div>
  );
};
