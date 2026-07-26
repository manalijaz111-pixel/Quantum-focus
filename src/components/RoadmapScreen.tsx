import React, { useState } from 'react';
import { RoadmapModule } from '../types';

interface RoadmapScreenProps {
  modules: RoadmapModule[];
  onToggleModuleStatus: (id: number) => void;
  onAskTutor: (prompt: string) => void;
  onOpenBlochSphere: () => void;
}

export const RoadmapScreen: React.FC<RoadmapScreenProps> = ({
  modules,
  onToggleModuleStatus,
  onAskTutor,
  onOpenBlochSphere
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [selectedModule, setSelectedModule] = useState<RoadmapModule | null>(null);

  // Categories
  const categories = [
    'All',
    'Classical & Atomic Physics',
    'Early Quantum Theory',
    'Core Quantum Mechanics',
    'Quantum Information',
    'Quantum Algorithms & Hardware'
  ];

  const filteredModules = modules.filter(m => {
    const matchesCat = filterCategory === 'All' || m.category === filterCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.summary.toLowerCase().includes(search.toLowerCase()) ||
      `module ${m.id}`.includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate Progress Stats
  const completedCount = modules.filter(m => m.status === 'Completed').length;
  const inProgressCount = modules.filter(m => m.status === 'In Progress').length;
  const percent = Math.round((completedCount / modules.length) * 100);

  return (
    <div className="space-y-8 pb-32">
      {/* Header Banner */}
      <header className="bento-card p-6 md:p-8 bg-gradient-to-br from-[#0F0826] via-[#130B33] to-[#0A051B] border border-cyan-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <span className="material-symbols-outlined text-sm">alt_route</span>
              20-STEP CURRICULUM ROADMAP
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Learning Path: Physics to Quantum Computing
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
              Step-by-step structured masterclass tracing the evolution from atomic physics and wave functions to Qubits, Bloch Sphere, VQE, QAOA, and Qiskit.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
            <button
              onClick={onOpenBlochSphere}
              className="py-2.5 px-4 rounded-xl bg-[#170E38] hover:bg-[#20134C] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-base">3d_rotation</span>
              Bloch Sphere
            </button>

            <button
              onClick={() => onAskTutor("Guide me through the Learning Path roadmap steps.")}
              className="quantum-glow font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 active:scale-95 transition-all text-xs text-white"
            >
              <span className="material-symbols-outlined text-base">smart_toy</span>
              Ask AI Tutor
            </button>
          </div>
        </div>

        {/* Progress Tracker Bar */}
        <div className="mt-6 pt-6 border-t border-[#231242] space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-cyan-300 font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-cyan-400">task_alt</span>
              PROGRESS: {completedCount} OF {modules.length} MODULES COMPLETED ({percent}%)
            </span>
            <span className="text-slate-400">
              {inProgressCount} In Progress • {modules.length - completedCount - inProgressCount} Upcoming
            </span>
          </div>

          <div className="w-full h-3 bg-[#070314] rounded-full overflow-hidden p-0.5 border border-[#231242]">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Search & Category Filter Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search modules (e.g., Module 8, Qubits, Schrodinger, VQE)..."
            className="w-full bg-[#0E0724] border border-[#231242] rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-cyan-400 transition-all placeholder:text-slate-500 text-sm font-sans"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 font-bold'
                  : 'bg-[#0E0724] border border-[#231242] text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap Modules Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 relative">
        {filteredModules.map((m) => {
          const isCompleted = m.status === 'Completed';
          const isInProgress = m.status === 'In Progress';

          return (
            <div
              key={m.id}
              className={`bento-card-interactive p-6 flex flex-col justify-between space-y-4 relative overflow-hidden transition-all duration-300 ${
                isCompleted
                  ? 'border-cyan-500/40 bg-[#0B0621]'
                  : isInProgress
                  ? 'border-purple-500/50 bg-[#0D0727]'
                  : 'border-[#231242] bg-[#0A051C] opacity-80 hover:opacity-100'
              }`}
            >
              {/* Header inside card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 border ${
                        isCompleted
                          ? 'bg-cyan-950 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
                          : isInProgress
                          ? 'bg-purple-950 border-purple-500/50 text-purple-300'
                          : 'bg-[#150E33] border-[#231242] text-slate-400'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl">{m.icon}</span>
                    </div>

                    <div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-widest bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        MODULE {m.id}
                      </span>
                      <span className="block text-[11px] font-mono text-slate-400 mt-0.5">
                        {m.category}
                      </span>
                    </div>
                  </div>

                  {/* Status Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleModuleStatus(m.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all ${
                      isCompleted
                        ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-900'
                        : isInProgress
                        ? 'bg-purple-950/90 text-purple-300 border border-purple-500/50 hover:bg-purple-900'
                        : 'bg-[#150B33] text-slate-400 border border-[#231242] hover:text-white'
                    }`}
                    title="Click to toggle module completion state"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isCompleted ? 'check_circle' : isInProgress ? 'pending' : 'lock'}
                    </span>
                    {m.status}
                  </button>
                </div>

                {/* Module Title & Summary */}
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {m.summary}
                  </p>
                </div>

                {/* Formula or Code Snippet box */}
                {m.formula && (
                  <div className="bg-[#060312] p-2.5 rounded-lg border border-[#231242] font-mono text-xs text-cyan-300 overflow-x-auto">
                    {m.formula}
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-[#231242] flex items-center justify-between gap-2 text-xs">
                <button
                  onClick={() => setSelectedModule(m)}
                  className="text-cyan-400 font-mono font-bold flex items-center gap-1 hover:underline"
                >
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  View Details & Formula
                </button>

                <button
                  onClick={() => onAskTutor(`Teach me Module ${m.id}: ${m.title} step-by-step with simple explanation and scientific formulas.`)}
                  className="px-3 py-1.5 rounded-lg bg-[#180E3C] hover:bg-purple-900/60 border border-purple-500/30 text-purple-200 font-mono text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  <span className="material-symbols-outlined text-xs">smart_toy</span>
                  Ask AI Tutor
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Module Detail Inspection Modal */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bento-card max-w-2xl w-full p-6 md:p-8 bg-[#0E0724] border border-cyan-500/40 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedModule(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-[#170E38]"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-2xl font-bold">
                <span className="material-symbols-outlined text-2xl">{selectedModule.icon}</span>
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-extrabold uppercase tracking-widest bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  MODULE {selectedModule.id} • {selectedModule.category}
                </span>
                <h2 className="text-2xl font-extrabold text-white mt-1">
                  {selectedModule.title}
                </h2>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {selectedModule.description}
            </p>

            {selectedModule.formula && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Mathematical Representation
                </h4>
                <div className="bg-[#060312] p-4 rounded-xl border border-cyan-500/30 font-mono text-sm text-cyan-300">
                  {selectedModule.formula}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Key Learning Outcomes
              </h4>
              <ul className="space-y-2">
                {selectedModule.keyPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <span className="material-symbols-outlined text-cyan-400 text-base shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#231242] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => {
                  onToggleModuleStatus(selectedModule.id);
                  setSelectedModule(prev => prev ? {
                    ...prev,
                    status: prev.status === 'Completed' ? 'In Progress' : 'Completed'
                  } : null);
                }}
                className="px-4 py-2.5 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">published_with_changes</span>
                Toggle Status ({selectedModule.status})
              </button>

              <button
                onClick={() => {
                  const query = `Explain Module ${selectedModule.id}: ${selectedModule.title} in detail. Breakdown equation ${selectedModule.formula || ''} step-by-step and provide real-world examples.`;
                  setSelectedModule(null);
                  onAskTutor(query);
                }}
                className="quantum-glow font-bold py-2.5 px-5 rounded-xl text-xs text-white flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-base">smart_toy</span>
                Ask AI Tutor About This Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
