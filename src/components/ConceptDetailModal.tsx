import React from 'react';
import { ConceptItem } from '../types';

interface ConceptDetailModalProps {
  concept: ConceptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBlochSphere: () => void;
}

export const ConceptDetailModal: React.FC<ConceptDetailModalProps> = ({
  concept,
  isOpen,
  onClose,
  onOpenBlochSphere
}) => {
  if (!isOpen || !concept) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-[#222222] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-[#222222]">
              <span className="material-symbols-outlined text-violet-400 text-2xl">
                {concept.icon}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold text-[#888888] tracking-wider">
                {concept.category}
              </span>
              <h2 className="font-mono text-lg font-bold text-[#F5F5F5]">
                {concept.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-4 text-sm text-[#F5F5F5] leading-relaxed">
          <p className="text-[#888888]">{concept.summary}</p>

          {concept.formula && (
            <div className="bg-[#050505] p-4 rounded-2xl border border-[#222222] font-mono text-center text-violet-400 text-base shadow-[0_0_15px_rgba(139,92,246,0.15)]">
              {concept.formula}
            </div>
          )}

          {concept.keyPoints && concept.keyPoints.length > 0 && (
            <div className="space-y-2 pt-2">
              <h4 className="font-mono font-bold text-xs uppercase text-violet-400 tracking-wider">
                Key Principles & Applications
              </h4>
              <ul className="space-y-2">
                {concept.keyPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#888888]">
                    <span className="material-symbols-outlined text-violet-400 text-base shrink-0">
                      check_circle
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-[#222222] flex gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenBlochSphere();
              }}
              className="quantum-glow text-white font-mono font-bold py-3 px-4 rounded-2xl text-xs flex-1 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">3d_rotation</span>
              Interactive 3D Simulation
            </button>
            <button
              onClick={onClose}
              className="border border-[#222222] bg-[#1A1A1A] text-[#888888] hover:text-white py-3 px-4 rounded-2xl text-xs font-mono font-semibold"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

