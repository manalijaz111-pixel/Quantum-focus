import React from 'react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 bg-[#070314]/90 backdrop-blur-xl border-t border-[#231242]">
      <div className="flex justify-around items-center h-20 px-3 w-full max-w-7xl mx-auto relative">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            currentTab === 'home'
              ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 rounded-xl px-4 py-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0" }}
          >
            grid_view
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase mt-1">Dashboard</span>
        </button>

        {/* Concepts */}
        <button
          onClick={() => onTabChange('concepts')}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            currentTab === 'concepts'
              ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 rounded-xl px-3 py-1 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-xl sm:text-2xl"
            style={{ fontVariationSettings: currentTab === 'concepts' ? "'FILL' 1" : "'FILL' 0" }}
          >
            menu_book
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase mt-0.5">Concepts</span>
        </button>

        {/* Quantum Visualizations */}
        <button
          onClick={() => onTabChange('visualizations')}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            currentTab === 'visualizations'
              ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 rounded-xl px-3 py-1 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-xl sm:text-2xl"
            style={{ fontVariationSettings: currentTab === 'visualizations' ? "'FILL' 1" : "'FILL' 0" }}
          >
            3d_rotation
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase mt-0.5">Visuals</span>
        </button>

        {/* Learning Path */}
        <button
          onClick={() => onTabChange('roadmap')}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            currentTab === 'roadmap'
              ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 rounded-xl px-3 py-1 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-xl sm:text-2xl"
            style={{ fontVariationSettings: currentTab === 'roadmap' ? "'FILL' 1" : "'FILL' 0" }}
          >
            alt_route
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase mt-0.5">Path</span>
        </button>

        {/* AI Tutor Floating Orb */}
        <div className="relative -mt-8">
          <button
            onClick={() => onTabChange('tutor')}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-tr from-purple-700 via-blue-600 to-cyan-400 text-white shadow-[0_4px_25px_rgba(6,182,212,0.5)] active:scale-90 transition-transform duration-200 border-4 border-[#070314] ${
              currentTab === 'tutor' ? 'ring-2 ring-cyan-400 scale-110' : 'hover:scale-105'
            }`}
            title="Ask AI Tutor"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              smart_toy
            </span>
          </button>
        </div>

        {/* Quiz */}
        <button
          onClick={() => onTabChange('quiz')}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            currentTab === 'quiz'
              ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 rounded-xl px-4 py-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: currentTab === 'quiz' ? "'FILL' 1" : "'FILL' 0" }}
          >
            quiz
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase mt-1">Assessment</span>
        </button>

        {/* Notes */}
        <button
          onClick={() => onTabChange('notes')}
          className={`flex flex-col items-center justify-center transition-all duration-200 active:scale-90 ${
            currentTab === 'notes'
              ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 rounded-xl px-4 py-1.5 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span
            className="material-symbols-outlined text-2xl"
            style={{ fontVariationSettings: currentTab === 'notes' ? "'FILL' 1" : "'FILL' 0" }}
          >
            description
          </span>
          <span className="text-[10px] font-mono tracking-wider uppercase mt-1">Archive</span>
        </button>
      </div>
    </nav>
  );
};
