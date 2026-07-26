import React, { useState } from 'react';
import { FLASHCARDS } from '../data/quantumData';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  if (!isOpen) return null;

  const card = FLASHCARDS[currentIndex];

  const handleNext = (known: boolean) => {
    if (known) setKnownCount(knownCount + 1);
    setIsFlipped(false);
    if (currentIndex < FLASHCARDS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed session
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setKnownCount(0);
    setIsFlipped(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-lg w-full p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-[#222222] pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-2xl">
              auto_stories
            </span>
            <div>
              <h2 className="font-mono text-lg font-bold text-[#F5F5F5]">
                Flashcards Active Recall
              </h2>
              <span className="text-xs font-mono text-[#888888]">
                Card {currentIndex + 1} of {FLASHCARDS.length}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {currentIndex < FLASHCARDS.length ? (
          <div className="space-y-6">
            {/* Flashcard 3D Flip Box */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="bg-[#050505] border border-violet-500/30 rounded-2xl p-8 min-h-[220px] flex flex-col justify-between items-center text-center cursor-pointer transition-all hover:border-violet-500 shadow-[0_4px_25px_rgba(139,92,246,0.1)] relative"
            >
              <div className="w-full flex justify-between items-center text-[11px] font-mono font-bold text-[#888888]">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400">
                  {card.topic}
                </span>
                <span className="text-fuchsia-400 uppercase">{card.difficulty}</span>
              </div>

              <div className="my-auto py-4">
                {isFlipped ? (
                  <p className="text-sm font-sans font-semibold text-[#F5F5F5] leading-relaxed animate-fadeIn">
                    {card.answer}
                  </p>
                ) : (
                  <h3 className="font-mono text-lg font-bold text-violet-400 leading-relaxed">
                    {card.question}
                  </h3>
                )}
              </div>

              <div className="text-[11px] font-mono text-[#888888] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">flip</span>
                {isFlipped ? 'Click to show question' : 'Click to flip answer'}
              </div>
            </div>

            {/* Response buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleNext(false)}
                className="py-3 bg-[#1A1A1A] border border-[#333333] text-fuchsia-400 rounded-2xl text-xs font-mono font-bold hover:bg-[#222222] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">replay</span>
                Need Review
              </button>
              <button
                type="button"
                onClick={() => handleNext(true)}
                className="py-3 bg-violet-500/20 border border-violet-500/40 text-violet-400 rounded-2xl text-xs font-mono font-bold hover:bg-violet-500/30 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-base">check_circle</span>
                Got It Right!
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <span className="material-symbols-outlined text-5xl text-violet-400">
              emoji_events
            </span>
            <h3 className="font-mono text-xl font-bold text-[#F5F5F5]">
              Recall Session Completed!
            </h3>
            <p className="text-xs font-mono text-[#888888]">
              You mastered <strong className="text-violet-400">{knownCount}</strong> out of{' '}
              {FLASHCARDS.length} flashcards today.
            </p>
            <div className="pt-2 flex justify-center gap-3 font-mono">
              <button
                onClick={handleReset}
                className="quantum-glow text-white font-bold px-6 py-2.5 rounded-2xl text-xs"
              >
                Restart Session
              </button>
              <button
                onClick={onClose}
                className="border border-[#222222] bg-[#1A1A1A] px-6 py-2.5 rounded-2xl text-xs font-semibold hover:bg-[#222222] text-[#888888]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

