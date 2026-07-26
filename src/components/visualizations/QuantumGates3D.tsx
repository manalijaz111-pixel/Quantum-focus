import React, { useState } from 'react';

export const QuantumGates3D: React.FC = () => {
  const [initialState, setInitialState] = useState<'0' | '1'>('0');
  const [activeGate, setActiveGate] = useState<string>('H');
  const [appliedGateSequence, setAppliedGateSequence] = useState<string[]>([]);

  const gateInfo: Record<string, { name: string; matrix: string; desc: string }> = {
    H: {
      name: 'Hadamard Gate (H)',
      matrix: '1/√2 [[1, 1], [1, -1]]',
      desc: 'Creates equal superposition |+⟩ = (|0⟩ + |1⟩)/√2 from basis state |0⟩.'
    },
    X: {
      name: 'Pauli-X Gate (NOT)',
      matrix: '[[0, 1], [1, 0]]',
      desc: 'Bit-flip gate: Swaps |0⟩ to |1⟩ and |1⟩ to |0⟩ (180° rotation around X-axis).'
    },
    Y: {
      name: 'Pauli-Y Gate',
      matrix: '[[0, -i], [i, 0]]',
      desc: 'Bit & Phase flip gate: Rotates state 180° around Y-axis.'
    },
    Z: {
      name: 'Pauli-Z Gate (Phase Flip)',
      matrix: '[[1, 0], [0, -1]]',
      desc: 'Phase-flip gate: Negates phase of |1⟩ state (|1⟩ ↦ -|1⟩).'
    },
    S: {
      name: 'S Gate (Phase √Z)',
      matrix: '[[1, 0], [0, i]]',
      desc: 'Rotates relative phase by 90° (π/2 radians) around Z-axis.'
    },
    T: {
      name: 'T Gate (π/8 Gate)',
      matrix: '[[1, 0], [0, e^(iπ/4)]]',
      desc: 'Rotates relative phase by 45° (π/4 radians) around Z-axis.'
    }
  };

  const handleApplyGate = (gate: string) => {
    setActiveGate(gate);
    setAppliedGateSequence(prev => [...prev, gate]);
  };

  const handleReset = () => {
    setAppliedGateSequence([]);
    setActiveGate('H');
  };

  return (
    <div className="space-y-4">
      {/* Quantum Gate Stage */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312] p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
          <div className="font-bold flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            UNITARY GATE MATRIX TRANSFORMATIONS
          </div>
          <div>Input State: <span className="text-yellow-300 font-bold">|{initialState}⟩</span></div>
        </div>

        {/* Gate Matrix Visualizer */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-6 my-auto">
          {/* Input State */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Input Qubit</span>
            <div className="w-20 h-20 rounded-2xl bg-cyan-950 border-2 border-cyan-500 flex items-center justify-center font-mono font-bold text-2xl text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
              |{initialState}⟩
            </div>
          </div>

          <span className="material-symbols-outlined text-2xl text-cyan-400">arrow_forward</span>

          {/* Active Gate Block */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[10px] font-mono text-yellow-400 uppercase">Unitary Gate U</span>
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-900 to-cyan-900 border-2 border-yellow-400 flex flex-col items-center justify-center font-mono font-bold text-white shadow-[0_0_20px_rgba(250,204,21,0.5)]">
              <span className="text-2xl">{activeGate}</span>
              <span className="text-[9px] text-yellow-200 mt-1 font-mono">U U^† = I</span>
            </div>
          </div>

          <span className="material-symbols-outlined text-2xl text-cyan-400">arrow_forward</span>

          {/* Output State Sequence */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-[10px] font-mono text-purple-400 uppercase">Gate Sequence</span>
            <div className="min-w-28 p-3 rounded-2xl bg-[#120933] border-2 border-purple-500 flex items-center gap-1.5 font-mono font-bold text-sm text-purple-300">
              <span>{appliedGateSequence.length > 0 ? appliedGateSequence.join(' ↦ ') : `${activeGate} |${initialState}⟩`}</span>
            </div>
          </div>
        </div>

        {/* Gate Matrix Formula Box */}
        <div className="bg-[#0D0727] p-3 rounded-xl border border-[#231242] flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono">
          <div>
            <span className="font-bold text-cyan-300">{gateInfo[activeGate].name}: </span>
            <span className="text-slate-200">{gateInfo[activeGate].desc}</span>
          </div>
          <div className="bg-[#060312] px-3 py-1 rounded border border-cyan-500/40 text-yellow-300 font-bold shrink-0">
            {gateInfo[activeGate].matrix}
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] space-y-3 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-bold">Initial State:</span>
          <button
            onClick={() => { setInitialState('0'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              initialState === '0' ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-[#150B33] text-slate-400 border-[#231242]'
            }`}
          >
            |0⟩
          </button>
          <button
            onClick={() => { setInitialState('1'); handleReset(); }}
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              initialState === '1' ? 'bg-cyan-950 text-cyan-300 border-cyan-500' : 'bg-[#150B33] text-slate-400 border-[#231242]'
            }`}
          >
            |1⟩
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#231242]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-300 font-bold">Apply Gate:</span>
            {Object.keys(gateInfo).map(g => (
              <button
                key={g}
                onClick={() => handleApplyGate(g)}
                className={`px-3.5 py-2 rounded-xl border font-bold transition-all ${
                  activeGate === g
                    ? 'bg-yellow-950 text-yellow-300 border-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.4)]'
                    : 'bg-[#150B33] text-cyan-300 border-[#231242] hover:border-cyan-500/50'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 border border-slate-700 hover:text-white"
          >
            Clear Sequence
          </button>
        </div>
      </div>
    </div>
  );
};
