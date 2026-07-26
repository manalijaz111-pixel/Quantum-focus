import React, { useState } from 'react';

interface GateInfo {
  name: string;
  symbol: string;
  type: 'Single-Qubit' | 'Multi-Qubit';
  matrix: string[];
  explanation: string;
  circuitDiagram: string;
  example: string;
  effectOnBasis: { input: string; output: string }[];
}

export const GatesScreen: React.FC = () => {
  const [selectedGateIndex, setSelectedGateIndex] = useState<number>(0);
  const [inputState, setInputState] = useState<string>('|0⟩');

  const gates: GateInfo[] = [
    {
      name: 'Pauli-X Gate',
      symbol: 'X',
      type: 'Single-Qubit',
      matrix: ['[ 0   1 ]', '[ 1   0 ]'],
      explanation: 'The quantum bit-flip operator (quantum NOT gate). Rotates the qubit state vector by π radians around the X-axis of the Bloch sphere, interchanging |0⟩ and |1⟩.',
      circuitDiagram: '──[ X ]──',
      example: 'X |0⟩ = |1⟩,  X |1⟩ = |0⟩',
      effectOnBasis: [
        { input: '|0⟩', output: '|1⟩' },
        { input: '|1⟩', output: '|0⟩' },
        { input: '|+⟩ = (|0⟩+|1⟩)/√2', output: '|+⟩ (Unchanged)' }
      ]
    },
    {
      name: 'Pauli-Y Gate',
      symbol: 'Y',
      type: 'Single-Qubit',
      matrix: ['[  0   -i ]', '[  i    0 ]'],
      explanation: 'Performs a combined bit-flip and phase-flip by rotating the state vector by π radians around the Y-axis of the Bloch sphere.',
      circuitDiagram: '──[ Y ]──',
      example: 'Y |0⟩ = i|1⟩,  Y |1⟩ = -i|0⟩',
      effectOnBasis: [
        { input: '|0⟩', output: 'i|1⟩' },
        { input: '|1⟩', output: '-i|0⟩' }
      ]
    },
    {
      name: 'Pauli-Z Gate',
      symbol: 'Z',
      type: 'Single-Qubit',
      matrix: ['[ 1    0 ]', '[ 0   -1 ]'],
      explanation: 'The quantum phase-flip operator. Rotates the state vector by π radians around the Z-axis, leaving |0⟩ invariant while flipping the phase sign of |1⟩ to -|1⟩.',
      circuitDiagram: '──[ Z ]──',
      example: 'Z |0⟩ = |0⟩,  Z |1⟩ = -|1⟩',
      effectOnBasis: [
        { input: '|0⟩', output: '|0⟩' },
        { input: '|1⟩', output: '-|1⟩' },
        { input: '|+⟩ = (|0⟩+|1⟩)/√2', output: '|−⟩ = (|0⟩−|1⟩)/√2' }
      ]
    },
    {
      name: 'Hadamard Gate',
      symbol: 'H',
      type: 'Single-Qubit',
      matrix: ['1/√2 * [ 1   1 ]', '       [ 1  -1 ]'],
      explanation: 'Generates equal quantum superposition states by mapping computational basis states |0⟩ and |1⟩ to superposed basis states |+⟩ and |−⟩.',
      circuitDiagram: '──[ H ]──',
      example: 'H |0⟩ = (|0⟩+|1⟩)/√2,  H |1⟩ = (|0⟩-|1⟩)/√2',
      effectOnBasis: [
        { input: '|0⟩', output: '|+⟩ = (|0⟩+|1⟩)/√2' },
        { input: '|1⟩', output: '|−⟩ = (|0⟩−|1⟩)/√2' },
        { input: '|+⟩', output: '|0⟩ (Reversible)' }
      ]
    },
    {
      name: 'Controlled-NOT (CNOT) Gate',
      symbol: 'CX',
      type: 'Multi-Qubit',
      matrix: [
        '[ 1  0  0  0 ]',
        '[ 0  1  0  0 ]',
        '[ 0  0  0  1 ]',
        '[ 0  0  1  0 ]'
      ],
      explanation: 'A 2-qubit entangling gate. Flips the target qubit (applies X gate) if and only if the control qubit is in state |1⟩.',
      circuitDiagram: 'q₀: ──●──\nq₁: ──⊕──',
      example: 'CNOT |10⟩ = |11⟩,  CNOT |00⟩ = |00⟩',
      effectOnBasis: [
        { input: '|00⟩', output: '|00⟩' },
        { input: '|01⟩', output: '|01⟩' },
        { input: '|10⟩', output: '|11⟩ (Target flipped)' },
        { input: '|11⟩', output: '|10⟩ (Target flipped)' }
      ]
    },
    {
      name: 'SWAP Gate',
      symbol: 'SWAP',
      type: 'Multi-Qubit',
      matrix: [
        '[ 1  0  0  0 ]',
        '[ 0  0  1  0 ]',
        '[ 0  1  0  0 ]',
        '[ 0  0  0  1 ]'
      ],
      explanation: 'Exchanges the quantum states of two qubits. Synthesized using three alternating CNOT gates.',
      circuitDiagram: 'q₀: ──x──\nq₁: ──x──',
      example: 'SWAP |01⟩ = |10⟩',
      effectOnBasis: [
        { input: '|01⟩', output: '|10⟩' },
        { input: '|10⟩', output: '|01⟩' },
        { input: '|00⟩', output: '|00⟩' },
        { input: '|11⟩', output: '|11⟩' }
      ]
    }
  ];

  const current = gates[selectedGateIndex];

  return (
    <div className="space-y-8 pb-28">
      {/* Header Banner */}
      <div className="bento-card p-6 md:p-8 bg-gradient-to-br from-[#0F0826] via-[#140A33] to-[#0A051B] border border-purple-900/40">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold mb-3">
          <span className="material-symbols-outlined text-sm">tune</span>
          UNITARY TRANSFORMATIONS
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Quantum Gates Library
        </h1>
        <p className="text-slate-300 text-sm md:text-base mt-2 max-w-3xl leading-relaxed">
          Explore single-qubit and multi-qubit fundamental gates, matrix representations, circuit symbols, and state transformations.
        </p>
      </div>

      {/* Gate Tabs Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {gates.map((g, idx) => {
          const isSelected = selectedGateIndex === idx;
          return (
            <button
              key={g.name}
              onClick={() => setSelectedGateIndex(idx)}
              className={`p-4 rounded-xl border text-center transition-all duration-200 active:scale-95 flex flex-col items-center justify-between gap-2 ${
                isSelected
                  ? 'bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-[#0E0724] border-[#231242] hover:border-purple-500/40 text-slate-300 hover:text-white'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center font-mono font-bold text-cyan-300 text-base">
                {g.symbol}
              </div>
              <div className="text-xs font-bold font-sans">
                {g.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Gate Interactive Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details (2 Cols) */}
        <div className="lg:col-span-2 bento-card p-6 md:p-8 bg-[#0F0826] border border-cyan-500/30 space-y-6">
          <div className="flex justify-between items-start border-b border-[#231242] pb-4">
            <div>
              <span className="px-2.5 py-1 rounded bg-purple-950 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-purple-500/30">
                {current.type} GATE
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-2">
                {current.name} ({current.symbol})
              </h2>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center font-mono font-extrabold text-2xl text-white shadow-lg">
              {current.symbol}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold mb-2">
              Physical & Mathematical Function
            </h4>
            <p className="text-sm md:text-base text-slate-200 leading-relaxed bg-[#070314] p-4 rounded-xl border border-[#231242]">
              {current.explanation}
            </p>
          </div>

          {/* Matrix & Circuit Representation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#070314] border border-cyan-500/30 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                MATRIX REPRESENTATION
              </span>
              <div className="bg-[#0D0620] p-3 rounded-lg font-mono text-cyan-300 text-xs md:text-sm space-y-1 text-center font-bold">
                {current.matrix.map((row, rIdx) => (
                  <div key={rIdx}>{row}</div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070314] border border-blue-500/30 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                CIRCUIT WIRE SYMBOL
              </span>
              <div className="bg-[#0D0620] p-3 rounded-lg font-mono text-cyan-300 text-xs md:text-sm flex items-center justify-center min-h-[64px] whitespace-pre text-center font-bold">
                {current.circuitDiagram}
              </div>
            </div>
          </div>

          {/* Effect on Basis States */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold">
              Computational Basis Transformations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.effectOnBasis.map((e, eIdx) => (
                <div key={eIdx} className="p-3 bg-[#070314] rounded-xl border border-[#231242] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-bold">{e.input}</span>
                  <span className="material-symbols-outlined text-cyan-400 text-sm">east</span>
                  <span className="text-cyan-300 font-bold">{e.output}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Gate Simulator Sidebar (1 Col) */}
        <div className="bento-card p-6 bg-[#0E0724] border border-[#231242] space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <span className="material-symbols-outlined text-xl">play_circle</span>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                Gate State Simulator
              </h3>
            </div>

            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-2">
                Select Input Basis State:
              </label>
              <div className="flex gap-2">
                {['|0⟩', '|1⟩', '|+⟩'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setInputState(st)}
                    className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                      inputState === st
                        ? 'bg-cyan-500 text-black shadow-[0_0_10px_#06b6d4]'
                        : 'bg-[#070314] text-slate-300 hover:text-white border border-[#231242]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070314] border border-purple-500/30 space-y-3 text-center">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                SIMULATED TRANSFORMATION
              </span>

              <div className="flex items-center justify-center gap-3 font-mono text-sm">
                <span className="text-cyan-300 font-bold">{inputState}</span>
                <span className="material-symbols-outlined text-purple-400 text-base">arrow_forward</span>
                <span className="px-2 py-1 bg-purple-900 rounded font-bold text-white text-xs">{current.symbol}</span>
                <span className="material-symbols-outlined text-purple-400 text-base">arrow_forward</span>
                <span className="text-emerald-300 font-bold">
                  {current.effectOnBasis.find(b => b.input === inputState)?.output || current.example.split('=')[1] || '|Out⟩'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-slate-300 space-y-1">
            <span className="font-mono font-bold text-cyan-300 block">KEY TAKEAWAY:</span>
            <p>
              Quantum logic gates preserve vector norm ||v|| = 1 and ensure full computational reversibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
