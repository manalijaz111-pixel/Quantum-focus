import React from 'react';
import { ConceptItem, NavigationTab } from '../types';
import manalAvatar from '../assets/images/manal_ijaz_avatar_1785042917412.jpg';

interface HomeScreenProps {
  concepts: ConceptItem[];
  onTabChange: (tab: NavigationTab) => void;
  onSelectConcept: (concept: ConceptItem) => void;
  onOpenAnalysis: () => void;
  onOpenFlashcards: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  concepts,
  onTabChange,
  onSelectConcept,
  onOpenAnalysis,
  onOpenFlashcards
}) => {
  const quantumTopics = [
    { title: 'Qubits', icon: 'deployed_code', desc: 'Two-level state vectors |ψ⟩ = α|0⟩ + β|1⟩' },
    { title: 'Superposition', icon: 'blur_on', desc: 'Linear state combinations before measurement' },
    { title: 'Entanglement', icon: 'link', desc: 'Spooky quantum correlation across Bell states' },
    { title: 'Quantum Gates', icon: 'tune', desc: 'Unitary matrix transformations (H, X, CNOT)' },
    { title: 'Quantum Circuits', icon: 'schema', desc: 'Wire execution of gate sequences & measurements' },
    { title: 'VQE', icon: 'calculate', desc: 'Variational Quantum Eigensolver for molecular energy' },
    { title: 'QAOA', icon: 'hub', desc: 'Quantum Approximate Optimization for Max-Cut' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Background glow effects */}
      <div className="bg-glow top-[-100px] left-[-100px] pointer-events-none"></div>
      <div className="bg-glow-cyan top-[200px] right-[-100px] pointer-events-none"></div>

      {/* Hero Welcome & Creator Card Banner */}
      <section className="bento-card p-6 md:p-8 relative overflow-hidden border border-[#231242] bg-gradient-to-br from-[#0F0826] via-[#130B33] to-[#0A051B]">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
          {/* Welcome Intro (Cols 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
              <span className="material-symbols-outlined text-sm text-cyan-400">verified</span>
              ACADEMIC PRESENTATION PROJECT
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Welcome to <br className="hidden sm:inline" />
              <span className="quantum-glow-text">Quantum Learning Assistant</span>
            </h1>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-normal">
              An AI-powered platform designed to help students understand quantum computing concepts through interactive learning, quizzes, and AI tutoring.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onTabChange('tutor')}
                className="quantum-glow font-bold py-3 px-6 rounded-xl flex items-center gap-2 active:scale-95 transition-all text-sm shadow-lg shadow-purple-900/30"
              >
                <span className="material-symbols-outlined text-lg">smart_toy</span>
                Ask AI Quantum Tutor
              </button>
              <button
                onClick={() => onTabChange('concepts')}
                className="py-3 px-6 rounded-xl bg-[#1A103C] hover:bg-[#231550] border border-[#3B1B6C] text-cyan-300 font-semibold text-sm transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">menu_book</span>
                Explore Concepts
              </button>
            </div>
          </div>

          {/* Creator Profile Card (Col 3) */}
          <div className="bento-card p-6 bg-[#0B051D]/90 border border-cyan-500/30 shadow-xl shadow-cyan-950/30 flex flex-col items-center text-center space-y-4 relative group">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold border-b border-[#231242] w-full pb-2 flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Created By
            </div>

            {/* Circular Academic Profile Portrait Image */}
            <div className="relative">
              <div className="w-22 h-22 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 p-1 shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                <img
                  src={manalAvatar}
                  alt="Manal Ijaz"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover border-2 border-[#070314]"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-cyan-400 rounded-full border-2 border-[#070314] flex items-center justify-center text-xs text-black font-extrabold shadow-md" title="Verified Creator">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Manal Ijaz
              </h3>
              <p className="text-xs font-mono font-bold text-cyan-300">
                BS Physics Graduate
              </p>
              <p className="text-xs font-mono text-cyan-400">
                Quantum Computing Researcher
              </p>
            </div>

            {/* Academic Bio */}
            <p className="text-xs text-slate-300 leading-relaxed font-sans px-1">
              Manal Ijaz is a Physics graduate with research interests in Quantum Computing, Quantum Algorithms, and Scientific Applications of Emerging Technologies.
            </p>

            <div className="w-full pt-3 border-t border-[#231242] flex flex-wrap justify-center gap-1.5">
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 border border-purple-500/30 text-[10px] font-mono font-bold text-purple-300">
                Quantum Algorithms
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-mono font-bold text-cyan-300">
                Quantum Mechanics
              </span>
              <span className="px-2.5 py-1 rounded-md bg-blue-950/80 border border-blue-500/30 text-[10px] font-mono font-bold text-blue-300">
                VQE & QAOA
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* "About This App" Section */}
      <section className="bento-card p-6 md:p-8 bg-[#0C0621] border border-purple-900/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#231242] pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                About This App
              </h2>
            </div>
            <p className="text-sm text-slate-300">
              This application helps students learn the core pillars of quantum information science:
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-cyan-950/50 text-cyan-300 border border-cyan-500/30 self-start sm:self-auto">
            7 Essential Topics
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quantumTopics.map((topic, idx) => (
            <div
              key={topic.title}
              onClick={() => onTabChange('concepts')}
              className="bento-card-interactive p-4 bg-[#0A041A] border border-[#231242] hover:border-cyan-400/50 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-900/60 to-blue-900/60 border border-purple-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl">{topic.icon}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  • {topic.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {topic.desc}
                </p>
              </div>
              <div className="mt-4 pt-2 flex items-center text-[11px] font-mono text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform">
                <span>Learn concept</span>
                <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Learning Progress & AI Diagnostics */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bento-card p-6 md:p-8 relative overflow-hidden bg-gradient-to-br from-[#0F0826] to-[#0A051C]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                ACTIVE LEARNING TRACK
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                Quantum Computing Foundations
              </h3>
            </div>
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold rounded-full">
              70% MASTERED
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="transparent" stroke="#231242" strokeWidth="8" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="transparent"
                  stroke="url(#purple-blue-cyan-gradient)"
                  strokeDasharray="351.8"
                  strokeDashoffset="105.5"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
                <defs>
                  <linearGradient id="purple-blue-cyan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6D28D9" />
                    <stop offset="50%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-mono font-extrabold text-white">70%</span>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">PROGRESS</span>
              </div>
            </div>

            <div className="space-y-4 flex-1 text-center sm:text-left">
              <p className="text-slate-300 text-sm">
                Up Next: <span className="text-cyan-300 font-semibold">VQE & QAOA Hybrid Algorithms</span>
              </p>
              <button
                onClick={() => {
                  const c = concepts.find(item => item.category === 'VQE') || concepts[0];
                  if (c) onSelectConcept(c);
                }}
                className="quantum-glow font-bold py-3 px-6 rounded-xl flex items-center justify-center sm:justify-start gap-2 active:scale-95 transition-all text-sm"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
                Resume Module
              </button>
            </div>
          </div>
        </div>

        {/* AI Diagnostics Card */}
        <div className="bento-card p-6 bg-[#0E0724] border border-[#231242] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-cyan-400">
              <span className="material-symbols-outlined">analytics</span>
              <span className="text-xs font-mono uppercase tracking-wider font-bold">
                AI Diagnostics
              </span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              High accuracy in <span className="text-cyan-300 font-semibold">Superposition & Gate Operations</span>. Review recommended for <span className="text-purple-300 font-semibold">QAOA Mixer Hamiltonians</span>.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#231242]">
            <button
              onClick={onOpenAnalysis}
              className="w-full py-2.5 bg-[#170D38] hover:bg-[#20134C] border border-[#3B1B6C] rounded-xl text-cyan-300 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">assessment</span>
              View Knowledge Diagnostics
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-cyan-400">
          <span className="material-symbols-outlined text-xl">bolt</span>
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
            Interactive Tools & 3D Visualizations
          </h3>
        </div>

        {/* Highlighted Quantum Visualizations Studio Banner */}
        <div
          onClick={() => onTabChange('visualizations')}
          className="bento-card-interactive p-6 bg-gradient-to-r from-cyan-950/90 via-blue-950/90 to-purple-950/90 border border-cyan-400/60 cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-cyan-950/40"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 p-0.5 shrink-0 shadow-[0_0_25px_rgba(6,182,212,0.6)]">
              <div className="w-full h-full rounded-[14px] bg-[#070314] flex items-center justify-center text-cyan-300">
                <span className="material-symbols-outlined text-3xl">3d_rotation</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/40">
                <span>NEW MENU • 10 INTERACTIVE 3D QUANTUM SIMULATIONS</span>
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                Quantum Visualizations Studio
              </h3>
              <p className="text-xs text-slate-200 max-w-xl leading-relaxed">
                Explore 3D Rutherford Atoms, Orbital clouds, Wave-particle duality double-slit, Schrödinger equations, Quantum Tunneling, Bloch Sphere, Superposition, Entanglement, Quantum Gates, and Circuit Builders!
              </p>
            </div>
          </div>

          <button className="quantum-glow font-bold py-3 px-6 rounded-xl text-xs text-white shrink-0 flex items-center gap-2 group-hover:scale-105 transition-transform">
            <span>Explore 3D Visuals</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Highlighted 20-Step Learning Path Banner */}
        <div
          onClick={() => onTabChange('roadmap')}
          className="bento-card-interactive p-6 bg-gradient-to-r from-purple-950/80 via-indigo-950/90 to-cyan-950/80 border border-cyan-500/40 cursor-pointer group flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-cyan-950/30"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
              <div className="w-full h-full rounded-[14px] bg-[#070314] flex items-center justify-center text-cyan-300">
                <span className="material-symbols-outlined text-3xl">alt_route</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-[10px] font-mono font-bold border border-cyan-500/40">
                <span>20 MODULES • BASIC PHYSICS TO QUANTUM COMPUTING</span>
              </div>
              <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                Explore the Complete Learning Path
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                From Structure of Atom, Wave-Particle Duality, and Schrödinger Equation to Qubits, Bloch Sphere, VQE, QAOA, and Qiskit.
              </p>
            </div>
          </div>

          <button className="quantum-glow font-bold py-3 px-6 rounded-xl text-xs text-white shrink-0 flex items-center gap-2 group-hover:scale-105 transition-transform">
            <span>Open Learning Path</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => onTabChange('tutor')}
            className="bento-card-interactive p-6 flex flex-col items-center text-center gap-3 active:scale-95 group bg-[#0C0621] border border-[#231242]"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div>
              <span className="font-bold text-base text-white block">AI Quantum Tutor</span>
              <span className="text-xs text-slate-400">Instant answers with simple analogies</span>
            </div>
          </button>

          <button
            onClick={() => onTabChange('quiz')}
            className="bento-card-interactive p-6 flex flex-col items-center text-center gap-3 active:scale-95 group bg-[#0C0621] border border-[#231242]"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">quiz</span>
            </div>
            <div>
              <span className="font-bold text-base text-white block">Adaptive Quiz</span>
              <span className="text-xs text-slate-400">Test quantum computing knowledge</span>
            </div>
          </button>

          <button
            onClick={onOpenFlashcards}
            className="bento-card-interactive p-6 flex flex-col items-center text-center gap-3 active:scale-95 group bg-[#0C0621] border border-[#231242]"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <div>
              <span className="font-bold text-base text-white block">Recall Flashcards</span>
              <span className="text-xs text-slate-400">Active recall memory practice</span>
            </div>
          </button>
        </div>
      </section>

      {/* Recent Concepts List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="material-symbols-outlined text-xl">menu_book</span>
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Core Quantum Modules
            </h3>
          </div>
          <button
            onClick={() => onTabChange('concepts')}
            className="text-cyan-400 text-xs font-mono hover:underline font-semibold"
          >
            VIEW ALL MODULES
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {concepts.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectConcept(item)}
              className="bento-card-interactive p-4 bg-[#0A041A] border border-[#231242] flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#150B33] flex items-center justify-center border border-[#231242] group-hover:border-cyan-400/50 transition-colors shrink-0">
                <span className="material-symbols-outlined text-cyan-400 text-2xl">
                  {item.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-white truncate group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 truncate mt-0.5">{item.summary}</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase bg-purple-950/80 text-purple-300 border border-purple-500/30 shrink-0">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="pt-8 border-t border-[#231242] text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-semibold">
          <span className="material-symbols-outlined text-base">workspace_premium</span>
          <span>Developed by Manal Ijaz</span>
        </div>
        <p className="text-xs font-mono text-slate-500">
          2026 • Quantum Learning Assistant • Academic Thesis Project
        </p>
      </footer>
    </div>
  );
};
