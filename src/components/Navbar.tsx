import React from 'react';
import { NavigationTab } from '../types';

interface NavbarProps {
  currentTab: NavigationTab;
  onTabChange?: (tab: NavigationTab) => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenNotifications,
  onOpenSettings,
  unreadCount = 2
}) => {
  const isTutorTab = currentTab === 'tutor';

  return (
    <header className="fixed top-0 w-full z-50 bg-[#070314]/90 backdrop-blur-xl border-b border-[#231242] transition-all">
      <div className="flex items-center justify-between px-4 md:px-6 h-16 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/30">
            <span className="material-symbols-outlined text-xl">school</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider uppercase leading-none">
              University Final Project • 2026
            </span>
            <h1 className="font-sans text-base md:text-lg text-white font-bold tracking-tight leading-tight mt-0.5">
              Quantum Learning Assistant
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onTabChange && (
            <>
              <button
                onClick={() => onTabChange('visualizations')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                  currentTab === 'visualizations'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-[#0F0826] border-[#231242] text-slate-300 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                <span className="material-symbols-outlined text-base text-cyan-400">3d_rotation</span>
                Quantum Visualizations
              </button>

              <button
                onClick={() => onTabChange('roadmap')}
                className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                  currentTab === 'roadmap'
                    ? 'bg-cyan-950 text-cyan-300 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-[#0F0826] border-[#231242] text-slate-300 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                <span className="material-symbols-outlined text-base text-cyan-400">alt_route</span>
                Learning Path
              </button>
            </>
          )}

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F0826] border border-[#231242] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-300 font-semibold">AI ACTIVE</span>
          </div>

          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 text-slate-400 hover:text-white transition-colors active:scale-95 rounded-xl bg-[#0F0826] border border-[#231242] hover:border-cyan-500/40"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.9)]"></span>
            )}
          </button>

          {isTutorTab && (
            <button
              onClick={onOpenSettings}
              className="p-2.5 text-slate-400 hover:text-white transition-colors active:scale-95 rounded-xl bg-[#0F0826] border border-[#231242] hover:border-cyan-500/40"
              title="3D Visualizer"
            >
              <span className="material-symbols-outlined text-xl">3d_rotation</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
