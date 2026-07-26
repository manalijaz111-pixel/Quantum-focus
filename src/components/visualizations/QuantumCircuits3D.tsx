import React, { useState } from 'react';

interface GatePlacement {
  id: string;
  qubit: number;
  gate: string;
}

export const QuantumCircuits3D: React.FC = () => {
  const [gates, setGates] = useState<GatePlacement[]>([
    { id: '1', qubit: 0, gate: 'H' },
    { id: '2', qubit: 1, gate: 'CNOT' }
  ]);

  const handleAddGate = (qubit: number, gate: string) => {
    setGates(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, qubit, gate }]);
  };

  const handleRemoveGate = (id: string) => {
    setGates(prev => prev.filter(g => g.id !== id));
  };

  const handleResetCircuit = () => {
    setGates([]);
  };

  // Calculate simulated probabilities for 3-qubit state (|000⟩ ... |111⟩)
  // Simple heuristic simulation matching common circuits (Bell state = |000> and |011> or |110>, etc)
  const calculateProbs = () => {
    const hasH0 = gates.some(g => g.qubit === 0 && g.gate === 'H');
    const hasCNOT = gates.some(g => g.gate === 'CNOT');
    const hasX0 = gates.some(g => g.qubit === 0 && g.gate === 'X');

    if (hasH0 && hasCNOT) {
      // Bell State (|000> and |011> or |110>)
      return [
        { state: '|000⟩', prob: 50 },
        { state: '|001⟩', prob: 0 },
        { state: '|010⟩', prob: 0 },
        { state: '|011⟩', prob: 50 },
        { state: '|100⟩', prob: 0 },
        { state: '|101⟩', prob: 0 },
        { state: '|110⟩', prob: 0 },
        { state: '|111⟩', prob: 0 }
      ];
    } else if (hasH0) {
      return [
        { state: '|000⟩', prob: 50 },
        { state: '|001⟩', prob: 50 },
        { state: '|010⟩', prob: 0 },
        { state: '|011⟩', prob: 0 },
        { state: '|100⟩', prob: 0 },
        { state: '|101⟩', prob: 0 },
        { state: '|110⟩', prob: 0 },
        { state: '|111⟩', prob: 0 }
      ];
    } else if (hasX0) {
      return [
        { state: '|000⟩', prob: 0 },
        { state: '|001⟩', prob: 100 },
        { state: '|010⟩', prob: 0 },
        { state: '|011⟩', prob: 0 },
        { state: '|100⟩', prob: 0 },
        { state: '|101⟩', prob: 0 },
        { state: '|110⟩', prob: 0 },
        { state: '|111⟩', prob: 0 }
      ];
    }

    return [
      { state: '|000⟩', prob: 100 },
      { state: '|001⟩', prob: 0 },
      { state: '|010⟩', prob: 0 },
      { state: '|011⟩', prob: 0 },
      { state: '|100⟩', prob: 0 },
      { state: '|101⟩', prob: 0 },
      { state: '|110⟩', prob: 0 },
      { state: '|111⟩', prob: 0 }
    ];
  };

  const probDistribution = calculateProbs();

  return (
    <div className="space-y-4">
      {/* Circuit Composer Board */}
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312] p-6 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
          <div className="font-bold flex items-center gap-2 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            3-QUBIT CIRCUIT COMPOSER
          </div>
          <div>Gates Placed: {gates.length} operations</div>
        </div>

        {/* Qubit Wires (q0, q1, q2) */}
        <div className="space-y-6 my-auto">
          {[0, 1, 2].map(qIdx => (
            <div key={qIdx} className="flex items-center gap-4 relative">
              <span className="font-mono font-bold text-xs text-cyan-300 w-12 shrink-0">
                q_{qIdx}: |0⟩
              </span>

              {/* Wire line */}
              <div className="h-0.5 bg-[#231242] flex-1 relative flex items-center gap-3 px-4">
                {gates.filter(g => g.qubit === qIdx).map(g => (
                  <button
                    key={g.id}
                    onClick={() => handleRemoveGate(g.id)}
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-900 to-cyan-900 border border-cyan-400 font-mono font-bold text-xs text-white shadow-md hover:scale-110 transition-transform flex items-center justify-center shrink-0 z-10"
                    title="Click to remove gate"
                  >
                    {g.gate}
                  </button>
                ))}

                {/* Add Gate quick button */}
                <div className="flex items-center gap-1.5 ml-auto">
                  {['H', 'X', 'CNOT', 'M'].map(g => (
                    <button
                      key={g}
                      onClick={() => handleAddGate(qIdx, g)}
                      className="px-2 py-1 rounded bg-[#120933] border border-[#231242] hover:border-cyan-500 text-[10px] font-mono text-slate-300 hover:text-white transition-all"
                    >
                      +{g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Output Histogram Distribution */}
        <div className="pt-3 border-t border-[#231242]">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
            Output State Amplitudes & Probabilities (|000⟩ to |111⟩)
          </span>

          <div className="grid grid-cols-8 gap-1 items-end h-16">
            {probDistribution.map(item => (
              <div key={item.state} className="flex flex-col items-center h-full justify-end space-y-1">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 to-cyan-400 rounded-t transition-all duration-300"
                  style={{ height: `${Math.max(4, item.prob)}%` }}
                ></div>
                <span className="text-[9px] font-mono text-cyan-300">{item.state}</span>
                <span className="text-[8px] font-mono text-slate-400">{item.prob}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] flex items-center justify-between text-xs font-mono">
        <div className="text-slate-300 font-bold">
          Tip: Click <span className="text-cyan-300">+H, +X, +CNOT</span> on any qubit wire to build custom quantum logic circuits.
        </div>

        <button
          onClick={handleResetCircuit}
          className="px-4 py-2 rounded-xl bg-[#180E3C] border border-cyan-500/30 text-cyan-300 font-bold hover:bg-cyan-950 transition-all"
        >
          Reset Circuit Wires
        </button>
      </div>
    </div>
  );
};
