import React, { useState } from 'react';
import { VISUALIZATION_ITEMS } from '../data/visualizationData';
import { AtomicStructure3D } from './visualizations/AtomicStructure3D';
import { ElectronOrbitals3D } from './visualizations/ElectronOrbitals3D';
import { WaveParticleDuality3D } from './visualizations/WaveParticleDuality3D';
import { SchrodingerWave3D } from './visualizations/SchrodingerWave3D';
import { QuantumTunneling3D } from './visualizations/QuantumTunneling3D';
import { BlochSphere3D } from './visualizations/BlochSphere3D';
import { Superposition3D } from './visualizations/Superposition3D';
import { Entanglement3D } from './visualizations/Entanglement3D';
import { QuantumGates3D } from './visualizations/QuantumGates3D';
import { QuantumCircuits3D } from './visualizations/QuantumCircuits3D';

interface QuantumVisualizationsScreenProps {
  onAskTutor: (prompt: string) => void;
}

export const QuantumVisualizationsScreen: React.FC<QuantumVisualizationsScreenProps> = ({
  onAskTutor
}) => {
  const [activeVisId, setActiveVisId] = useState<string>('atomic-structure');

  const activeItem = VISUALIZATION_ITEMS.find(item => item.id === activeVisId) || VISUALIZATION_ITEMS[0];

  const renderActiveVisualizer = () => {
    switch (activeVisId) {
      case 'atomic-structure':
        return <AtomicStructure3D />;
      case 'electron-orbitals':
        return <ElectronOrbitals3D />;
      case 'wave-particle-duality':
        return <WaveParticleDuality3D />;
      case 'schrodinger-wave':
        return <SchrodingerWave3D />;
      case 'quantum-tunneling':
        return <QuantumTunneling3D />;
      case 'bloch-sphere':
        return <BlochSphere3D />;
      case 'superposition':
        return <Superposition3D />;
      case 'entanglement':
        return <Entanglement3D />;
      case 'quantum-gates':
        return <QuantumGates3D />;
      case 'quantum-circuits':
        return <QuantumCircuits3D />;
      default:
        return <AtomicStructure3D />;
    }
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Header Banner */}
      <header className="bento-card p-6 md:p-8 bg-gradient-to-br from-[#0F0826] via-[#130B33] to-[#0A051B] border border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <span className="material-symbols-outlined text-sm">3d_rotation</span>
              INTERACTIVE 3D QUANTUM VISUALIZATIONS
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Quantum Visualizations Studio
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
              Explore 10 interactive 3D simulations bridging classical atomic physics, wave mechanics, superposition, Bloch sphere rotations, entanglement, and quantum circuits.
            </p>
          </div>

          <button
            onClick={() => onAskTutor(`Explain the active quantum visualization (${activeItem.title}) and how it works.`)}
            className="quantum-glow font-bold py-2.5 px-5 rounded-xl text-white text-xs shrink-0 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
            Ask AI Tutor About This Model
          </button>
        </div>
      </header>

      {/* 10 Visualization Selection Menu Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#231242]">
        {VISUALIZATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveVisId(item.id)}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeVisId === item.id
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'bg-[#0E0724] border border-[#231242] text-slate-400 hover:text-white hover:border-cyan-500/30'
            }`}
          >
            <span className="material-symbols-outlined text-base">{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive 3D Visualization Canvas Container */}
      <div className="bento-card p-6 bg-[#0B0621] border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#231242]">
          <div>
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {activeItem.category}
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {activeItem.title}
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md">
            {activeItem.shortDesc}
          </p>
        </div>

        {/* Render 3D Canvas / Simulation Component */}
        <div className="w-full">
          {renderActiveVisualizer()}
        </div>
      </div>

      {/* Educational Explanation Section Below Visualization */}
      <div className="bento-card p-6 md:p-8 bg-[#0D0727] border border-cyan-500/30 space-y-6">
        <div className="flex items-center gap-2 text-cyan-400 border-b border-[#231242] pb-3">
          <span className="material-symbols-outlined text-xl">school</span>
          <h3 className="text-lg font-extrabold text-white">
            Educational Explanation & Physics Breakdown
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overview & Physics Principles */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Concept Overview
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeItem.explanation.overview}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Core Physics Principles
              </h4>
              <ul className="space-y-2">
                {activeItem.explanation.physicsPrinciples.map((principle, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <span className="material-symbols-outlined text-cyan-400 text-base shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Formulas, Significance & Interactive Controls Guide */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                Mathematical Formulas
              </h4>
              <div className="space-y-1.5">
                {activeItem.explanation.mathematicalFormulas.map((f, idx) => (
                  <div key={idx} className="bg-[#060312] p-2.5 rounded-lg border border-cyan-500/30 font-mono text-xs text-cyan-300">
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Quantum Significance
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeItem.explanation.quantumSignificance}
              </p>
            </div>

            <div className="bg-[#060312] p-3 rounded-xl border border-[#231242]">
              <h4 className="text-xs font-mono font-bold text-yellow-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">touch_app</span>
                Interactive Controls Guide
              </h4>
              <p className="text-xs text-slate-300 font-mono">
                {activeItem.explanation.interactiveControlsGuide}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="pt-4 border-t border-[#231242] flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">
            Suitable for physics students and quantum computing researchers.
          </span>

          <button
            onClick={() => onAskTutor(`Provide a deep dive breakdown on ${activeItem.title}. Explain formulas ${activeItem.explanation.mathematicalFormulas.join(', ')}.`)}
            className="quantum-glow font-bold py-2.5 px-5 rounded-xl text-xs text-white flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
            Ask AI Tutor For Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
};
