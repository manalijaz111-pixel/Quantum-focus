import React from 'react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToQuiz: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, onGoToQuiz }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-[#222222] pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-2xl">
              analytics
            </span>
            <h2 className="font-mono text-lg font-bold text-[#F5F5F5]">
              AI Mastery Analysis
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Performance breakdown bars */}
          <div className="space-y-3 font-mono">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#F5F5F5]">Mathematical Foundations</span>
                <span className="text-violet-400">92% Mastery</span>
              </div>
              <div className="w-full bg-[#050505] h-2 rounded-full overflow-hidden border border-[#222222]">
                <div className="bg-violet-500 h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#F5F5F5]">Quantum Entanglement</span>
                <span className="text-violet-400">78% Mastery</span>
              </div>
              <div className="w-full bg-[#050505] h-2 rounded-full overflow-hidden border border-[#222222]">
                <div className="bg-violet-500/80 h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-[#F5F5F5]">Schrödinger's Equation</span>
                <span className="text-fuchsia-400">54% Needs Review</span>
              </div>
              <div className="w-full bg-[#050505] h-2 rounded-full overflow-hidden border border-[#222222]">
                <div className="bg-fuchsia-500/80 h-full rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-[#050505] p-4 rounded-2xl border border-[#222222] space-y-2 text-xs text-[#888888]">
            <h4 className="font-mono font-bold text-violet-400 uppercase">Recommended Action Plan</h4>
            <p className="leading-relaxed">
              Complete a 5-minute targeted quiz on Schrödinger's Equation to increase overall course completion to 75%.
            </p>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onGoToQuiz();
              }}
              className="quantum-glow font-mono font-bold px-5 py-2.5 rounded-2xl text-xs text-white"
            >
              Start Practice Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

