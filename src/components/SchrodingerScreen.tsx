import React, { useState } from 'react';

interface SchrodingerScreenProps {
  onOpenBlochSphere: () => void;
}

export const SchrodingerScreen: React.FC<SchrodingerScreenProps> = ({
  onOpenBlochSphere
}) => {
  const [quantumN, setQuantumN] = useState<number>(1);
  const [wellWidth, setWellWidth] = useState<number>(5);

  // Generate 1D Infinite Well Wave Function points
  const points = [];
  const numSteps = 100;
  for (let i = 0; i <= numSteps; i++) {
    const x = (i / numSteps) * wellWidth;
    const psi = Math.sqrt(2 / wellWidth) * Math.sin((quantumN * Math.PI * x) / wellWidth);
    const prob = psi * psi;
    points.push({ x, psi, prob });
  }

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <header className="bento-card p-6 md:p-8 bg-gradient-to-br from-[#0F0826] via-[#130B33] to-[#0A051B] border border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <span className="material-symbols-outlined text-sm">functions</span>
              FUNDAMENTAL QUANTUM EQUATION
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Schrödinger Equation & Wave Functions
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
              The fundamental governing equation of non-relativistic quantum mechanics, predicting how quantum state wave functions evolve deterministically in space and time.
            </p>
          </div>

          <button
            onClick={onOpenBlochSphere}
            className="quantum-glow font-bold py-3 px-6 rounded-xl flex items-center gap-2 active:scale-95 transition-all text-xs shrink-0 self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-lg">3d_rotation</span>
            Interactive 3D Bloch Simulator
          </button>
        </div>
      </header>

      {/* Two Formulations: Time-Dependent vs Time-Independent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Time-Dependent */}
        <div className="bento-card p-6 bg-[#0B051D] border border-cyan-500/40 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              DYNAMIC EVOLUTION
            </span>
            <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] font-bold">
              TIME-DEPENDENT
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            Time-Dependent Schrödinger Equation
          </h3>

          <div className="bg-[#070314] p-5 rounded-2xl border border-cyan-500/30 text-center font-mono text-cyan-300 text-lg md:text-xl font-extrabold shadow-inner overflow-x-auto">
            iℏ (∂/∂t) Ψ(x,t) = Ĥ Ψ(x,t)
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Describes how the quantum wave function Ψ evolves continuously through time under Hamiltonian energy operator Ĥ.
          </p>
        </div>

        {/* Time-Independent */}
        <div className="bento-card p-6 bg-[#0B051D] border border-blue-500/40 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              STATIONARY STATES
            </span>
            <span className="px-2.5 py-1 rounded bg-blue-950 text-blue-300 font-mono text-[10px] font-bold">
              TIME-INDEPENDENT
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-white">
            Time-Independent Schrödinger Equation
          </h3>

          <div className="bg-[#070314] p-5 rounded-2xl border border-blue-500/30 text-center font-mono text-blue-300 text-lg md:text-xl font-extrabold shadow-inner overflow-x-auto">
            Ĥ ψ(x) = E ψ(x)
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Used when potential V(x) is constant in time to solve for stationary energy eigenvalues E and spatial eigenfunctions ψ(x).
          </p>
        </div>
      </div>

      {/* Explanation of Term Symbols */}
      <div className="bento-card p-6 md:p-8 bg-[#0E0724] border border-[#231242] space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-[#231242] pb-3">
          <span className="material-symbols-outlined text-2xl">style</span>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Anatomical Symbol Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242] space-y-2">
            <div className="text-xl font-mono font-extrabold text-cyan-400">Ψ(x,t)</div>
            <h4 className="font-bold text-sm text-white">Wave Function</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complex amplitude field encoding all physical information about the quantum system.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242] space-y-2">
            <div className="text-xl font-mono font-extrabold text-purple-400">|Ψ|²</div>
            <h4 className="font-bold text-sm text-white">Probability Density</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ψ* Ψ gives spatial probability density normalized so ∫ |Ψ|² dx = 1.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242] space-y-2">
            <div className="text-xl font-mono font-extrabold text-blue-400">E</div>
            <h4 className="font-bold text-sm text-white">Energy Eigenvalue</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Total energy level (kinetic + potential) associated with stationary eigenstate ψ.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242] space-y-2">
            <div className="text-xl font-mono font-extrabold text-emerald-400">V(x)</div>
            <h4 className="font-bold text-sm text-white">Potential Energy</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              External potential field (e.g. harmonic oscillator, Coulomb attraction, infinite well).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Visual Simulator: Particle in a 1D Box */}
      <div className="bento-card p-6 md:p-8 bg-[#0B051D] border border-cyan-500/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#231242] pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              INTERACTIVE SIMULATION
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-0.5">
              Particle in a 1D Infinite Potential Well
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Exact solution: ψ_n(x) = √(2/L) sin(nπx / L) and E_n = (n² π² ℏ²) / (2m L²)
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 bg-[#070314] p-3 rounded-xl border border-[#231242]">
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                Quantum State (n = {quantumN})
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    onClick={() => setQuantumN(num)}
                    className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                      quantumN === num
                        ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
                        : 'bg-[#150B33] text-slate-300 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-1">
                Well Width (L = {wellWidth} nm)
              </label>
              <input
                type="range"
                min="2"
                max="10"
                value={wellWidth}
                onChange={(e) => setWellWidth(Number(e.target.value))}
                className="w-28 accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* SVG Graph rendering Wave Function and Probability Density */}
        <div className="bg-[#070314] p-6 rounded-2xl border border-[#231242] space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-cyan-300 font-bold">─── Wave Function ψ_n(x)</span>
            <span className="text-purple-400 font-bold">─── Probability Density |ψ_n(x)|²</span>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 160">
              {/* Well Boundaries */}
              <line x1="20" y1="10" x2="20" y2="150" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
              <line x1="380" y1="10" x2="380" y2="150" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 4" />
              <text x="20" y="158" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="middle">x = 0</text>
              <text x="380" y="158" fill="#ef4444" fontSize="10" fontFamily="monospace" textAnchor="middle">x = L</text>

              {/* Zero Energy Baseline */}
              <line x1="20" y1="80" x2="380" y2="80" stroke="#334155" strokeWidth="1" />

              {/* Draw Wave Function Curve */}
              <path
                d={points.reduce((acc, p, i) => {
                  const svgX = 20 + (p.x / wellWidth) * 360;
                  const svgY = 80 - p.psi * 60;
                  return i === 0 ? `M ${svgX} ${svgY}` : `${acc} L ${svgX} ${svgY}`;
                }, '')}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2.5"
              />

              {/* Draw Probability Density Area */}
              <path
                d={points.reduce((acc, p, i) => {
                  const svgX = 20 + (p.x / wellWidth) * 360;
                  const svgY = 140 - p.prob * 100;
                  return i === 0 ? `M ${svgX} 140 L ${svgX} ${svgY}` : `${acc} L ${svgX} ${svgY}`;
                }, '') + ` L 380 140 Z`}
                fill="url(#probGradient)"
                opacity="0.4"
              />

              <defs>
                <linearGradient id="probGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#070314" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#231242] text-xs font-mono">
            <div className="p-3 bg-[#0E0724] rounded-lg">
              <span className="text-slate-400 block text-[10px]">QUANTUM LEVEL</span>
              <span className="text-white font-bold text-sm">n = {quantumN}</span>
            </div>
            <div className="p-3 bg-[#0E0724] rounded-lg">
              <span className="text-slate-400 block text-[10px]">ENERGY E_n</span>
              <span className="text-cyan-300 font-bold text-sm">{(quantumN * quantumN).toFixed(0)} E₁</span>
            </div>
            <div className="p-3 bg-[#0E0724] rounded-lg">
              <span className="text-slate-400 block text-[10px]">NODES AT BOUNDARY</span>
              <span className="text-purple-300 font-bold text-sm">{quantumN - 1} internal nodes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Worked Example */}
      <div className="bento-card p-6 md:p-8 bg-[#0E0724] border border-[#231242] space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="material-symbols-outlined text-2xl">calculate</span>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Step-by-Step Worked Example: 1D Box Energy Quantization
          </h2>
        </div>

        <div className="space-y-3 text-xs md:text-sm text-slate-200 leading-relaxed font-mono">
          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242]">
            <span className="text-cyan-400 font-bold block mb-1">Step 1: Boundary Conditions</span>
            Inside the well (0 &lt; x &lt; L), potential V(x) = 0. Outside, V = ∞. Therefore, wave function must vanish at walls: ψ(0) = 0 and ψ(L) = 0.
          </div>

          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242]">
            <span className="text-cyan-400 font-bold block mb-1">Step 2: Differential Solution</span>
            Substituting V = 0 into -(ℏ²/2m)(d²ψ/dx²) = Eψ gives (d²ψ/dx²) + k²ψ = 0 where k = √(2mE)/ℏ.
          </div>

          <div className="p-4 rounded-xl bg-[#070314] border border-[#231242]">
            <span className="text-cyan-400 font-bold block mb-1">Step 3: Quantization & Normalization</span>
            Condition sin(kL) = 0 implies kL = nπ. Normalizing ∫₀ᴸ A² sin²(nπx / L) dx = 1 yields normalization factor A = √(2/L).
          </div>
        </div>
      </div>
    </div>
  );
};
