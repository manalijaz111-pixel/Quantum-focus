import React, { useState } from 'react';

export const Entanglement3D: React.FC = () => {
  const [bellState, setBellState] = useState<string>('PhiPlus'); // PhiPlus, PhiMinus, PsiPlus, PsiMinus
  const [qubitAMeasured, setQubitAMeasured] = useState<boolean>(false);
  const [outcomeA, setOutcomeA] = useState<'0' | '1' | null>(null);
  const [outcomeB, setOutcomeB] = useState<'0' | '1' | null>(null);

  const bellStateFormulas: Record<string, { name: string; formula: string; desc: string }> = {
    PhiPlus: {
      name: '|Φ⁺⟩ Bell State',
      formula: '(|00⟩ + |11⟩) / √2',
      desc: 'Correlated states: Measuring Qubit A = 0 implies Qubit B = 0. Measuring Qubit A = 1 implies Qubit B = 1.'
    },
    PhiMinus: {
      name: '|Φ⁻⟩ Bell State',
      formula: '(|00⟩ - |11⟩) / √2',
      desc: 'Correlated states with relative phase shift: Outcome correlation identical to |Φ⁺⟩.'
    },
    PsiPlus: {
      name: '|Ψ⁺⟩ Bell State',
      formula: '(|01⟩ + |10⟩) / √2',
      desc: 'Anti-correlated states: Measuring Qubit A = 0 implies Qubit B = 1. Measuring Qubit A = 1 implies Qubit B = 0.'
    },
    PsiMinus: {
      name: '|Ψ⁻⟩ Bell State',
      formula: '(|01⟩ - |10⟩) / √2',
      desc: 'Singlet anti-correlated state: Rotational invariant singlet state.'
    }
  };

  const handleMeasureA = () => {
    const bitA = Math.random() < 0.5 ? '0' : '1';
    let bitB: '0' | '1' = bitA;

    if (bellState === 'PsiPlus' || bellState === 'PsiMinus') {
      bitB = bitA === '0' ? '1' : '0';
    }

    setOutcomeA(bitA);
    setOutcomeB(bitB);
    setQubitAMeasured(true);
  };

  const handleReset = () => {
    setQubitAMeasured(false);
    setOutcomeA(null);
    setOutcomeB(null);
  };

  return (
    <div className="space-y-4">
      {/* Entanglement Dual Qubit Stage */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312] p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
          <div className="font-bold flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            EPR ENTANGLED PAIR SIMULATOR
          </div>
          <div>State: <span className="text-yellow-300 font-bold">{bellStateFormulas[bellState].formula}</span></div>
        </div>

        {/* Dual Qubits Connected by Glowing Quantum Channel */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 my-auto relative">
          {/* Qubit A (Alice) */}
          <div className="flex flex-col items-center space-y-3 z-10">
            <div className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 font-bold">
              QUBIT A (ALICE)
            </div>
            <div
              className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                qubitAMeasured
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.8)]'
                  : 'bg-[#120933] border-cyan-500/50 text-slate-300 animate-pulse'
              }`}
            >
              <span className="font-mono font-extrabold text-2xl">
                {qubitAMeasured ? `|${outcomeA}⟩` : '|ψ_A⟩'}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-300 font-bold">
              {qubitAMeasured ? `Collapsed to |${outcomeA}⟩` : 'Superposition State'}
            </span>
          </div>

          {/* Glowing Quantum Entanglement Line */}
          <div className="hidden md:flex flex-col items-center space-y-1">
            <span className="material-symbols-outlined text-3xl text-cyan-400 animate-bounce">
              sync_alt
            </span>
            <span className="text-[10px] font-mono text-purple-300 font-bold uppercase tracking-widest">
              INSTANT QUANTUM CORRELATION
            </span>
          </div>

          {/* Qubit B (Bob) */}
          <div className="flex flex-col items-center space-y-3 z-10">
            <div className="px-3 py-1 rounded-full bg-purple-950 border border-purple-500/40 text-[10px] font-mono text-purple-300 font-bold">
              QUBIT B (BOB)
            </div>
            <div
              className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                qubitAMeasured
                  ? 'bg-purple-950 border-purple-400 text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.8)]'
                  : 'bg-[#120933] border-purple-500/50 text-slate-300 animate-pulse'
              }`}
            >
              <span className="font-mono font-extrabold text-2xl">
                {qubitAMeasured ? `|${outcomeB}⟩` : '|ψ_B⟩'}
              </span>
            </div>
            <span className="text-xs font-mono text-slate-300 font-bold">
              {qubitAMeasured ? `INSTANTLY collapsed to |${outcomeB}⟩` : 'Superposition State'}
            </span>
          </div>
        </div>

        {/* State description */}
        <div className="bg-[#0D0727] p-3 rounded-xl border border-[#231242] text-xs font-mono text-slate-300">
          {bellStateFormulas[bellState].desc}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] space-y-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-300 font-bold">Select Bell State:</span>
          {Object.keys(bellStateFormulas).map(key => (
            <button
              key={key}
              onClick={() => { setBellState(key); handleReset(); }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                bellState === key
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-[#150B33] text-slate-400 border-[#231242] hover:text-white'
              }`}
            >
              {bellStateFormulas[key].name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#231242]">
          <button
            onClick={handleMeasureA}
            disabled={qubitAMeasured}
            className="quantum-glow font-bold px-5 py-2 rounded-xl text-white flex items-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">adjust</span>
            {qubitAMeasured ? 'Qubits Collapsed!' : 'Measure Qubit A (Triggers Instant Collapse on B)'}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-[#180E3C] border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-950 transition-all"
          >
            Reset Pair to Superposition
          </button>
        </div>
      </div>
    </div>
  );
};
