import React, { useState } from 'react';
import { ConceptItem } from '../types';

interface ConceptsScreenProps {
  concepts: ConceptItem[];
  onSelectConcept: (concept: ConceptItem) => void;
  onOpenBlochSphere: () => void;
}

export const ConceptsScreen: React.FC<ConceptsScreenProps> = ({
  concepts,
  onSelectConcept,
  onOpenBlochSphere
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const categories = ['All', 'QUBITS', 'SUPERPOSITION', 'ENTANGLEMENT', 'GATES', 'CIRCUITS', 'VQE', 'QAOA'];

  const filteredConcepts = concepts.filter(c => {
    const matchesCategory = filterCategory === 'All' || c.category.toUpperCase() === filterCategory;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                          c.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-28">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
            Interactive Curriculum
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mt-1">
            Quantum Computing Modules
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Master Qubits, Superposition, Entanglement, Gates, Circuits, VQE, and QAOA algorithms.
          </p>
        </div>

        <button
          onClick={onOpenBlochSphere}
          className="quantum-glow font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 active:scale-95 transition-all text-xs shrink-0 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-lg">3d_rotation</span>
          Launch 3D Bloch Simulator
        </button>
      </header>

      {/* Search & Category Tabs */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full max-w-xl">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search quantum concepts, formulas, or algorithms..."
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

      {/* Concept Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredConcepts.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectConcept(item)}
            className="bento-card-interactive p-6 space-y-4 cursor-pointer flex flex-col justify-between group bg-[#0C0621] border border-[#231242]"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#170E38] flex items-center justify-center border border-[#231242] group-hover:border-cyan-400/50 text-cyan-400 shrink-0">
                    <span className="material-symbols-outlined text-2xl">
                      {item.icon}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/30">
                    {item.category}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400">
                  {item.duration}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  {item.summary}
                </p>
              </div>

              {item.formula && (
                <div className="bg-[#070314] p-2.5 rounded-lg border border-[#231242] font-mono text-xs text-cyan-300 overflow-x-auto">
                  {item.formula}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#231242] text-xs text-slate-400">
              <span className="flex items-center gap-1 text-cyan-400 font-mono font-semibold">
                <span className="material-symbols-outlined text-base">auto_stories</span>
                Study Lesson
              </span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-cyan-400">
                chevron_right
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
