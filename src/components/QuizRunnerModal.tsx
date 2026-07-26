import React, { useState } from 'react';
import { SAMPLE_QUIZ_QUESTIONS } from '../data/quantumData';
import { PastScore } from '../types';

interface QuizRunnerModalProps {
  isOpen: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  selectedConcepts: string[];
  onClose: () => void;
  onFinishQuiz: (score: PastScore) => void;
}

export const QuizRunnerModal: React.FC<QuizRunnerModalProps> = ({
  isOpen,
  difficulty,
  selectedConcepts,
  onClose,
  onFinishQuiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = SAMPLE_QUIZ_QUESTIONS[currentIndex] || SAMPLE_QUIZ_QUESTIONS[0];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedIndex === null) return;
    setIsAnswerSubmitted(true);
    if (selectedIndex === currentQ.correctIndex) {
      setScoreCount(scoreCount + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedIndex(null);
    setIsAnswerSubmitted(false);

    if (currentIndex < SAMPLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
      const finalPercentage = Math.round(((scoreCount + (selectedIndex === currentQ.correctIndex ? 1 : 0)) / SAMPLE_QUIZ_QUESTIONS.length) * 100);
      const newScore: PastScore = {
        id: `s-${Date.now()}`,
        title: selectedConcepts[0] || 'Quantum Mechanics Assessment',
        score: finalPercentage,
        date: 'TODAY',
        difficulty: difficulty.toUpperCase() as any,
        totalQuestions: SAMPLE_QUIZ_QUESTIONS.length
      };
      onFinishQuiz(newScore);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setIsAnswerSubmitted(false);
    setScoreCount(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#222222] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-violet-400 text-2xl">
                quiz
              </span>
              <h2 className="font-mono text-lg font-bold text-[#F5F5F5]">
                Adaptive Assessment
              </h2>
            </div>
            <span className="text-xs font-mono text-[#888888]">
              {difficulty} Level • Question {currentIndex + 1} of {SAMPLE_QUIZ_QUESTIONS.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            {/* Question Text */}
            <div className="bg-[#050505] p-5 rounded-2xl border border-[#222222] space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold text-violet-400 tracking-wider block">
                {currentQ.topic}
              </span>
              <h3 className="font-mono text-base font-bold text-[#F5F5F5] leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 font-mono">
              {currentQ.options.map((option, idx) => {
                let borderClass = 'border-[#222222] bg-[#1A1A1A] text-[#F5F5F5]';
                if (selectedIndex === idx) {
                  borderClass = 'border-2 border-violet-500 bg-violet-500/10 text-violet-400';
                }

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    borderClass = 'border-2 border-violet-400 bg-violet-500/20 text-violet-400';
                  } else if (selectedIndex === idx) {
                    borderClass = 'border-2 border-fuchsia-500 bg-fuchsia-500/20 text-fuchsia-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-3.5 rounded-2xl text-left text-xs font-semibold transition-all flex items-center justify-between ${borderClass} hover:border-violet-500/40`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && idx === currentQ.correctIndex && (
                      <span className="material-symbols-outlined text-xl text-violet-400">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {isAnswerSubmitted && (
              <div className="bg-violet-500/10 border border-violet-500/30 p-4 rounded-2xl text-xs font-mono space-y-1 animate-fadeIn">
                <span className="font-bold text-violet-400 uppercase tracking-wider block">
                  Explanation:
                </span>
                <p className="text-[#888888] leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex justify-end gap-3 font-mono">
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedIndex === null}
                  className="quantum-glow text-white font-bold px-6 py-3 rounded-2xl text-xs disabled:opacity-40"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="quantum-glow text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center gap-1"
                >
                  {currentIndex < SAMPLE_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 font-mono">
            <div className="w-20 h-20 rounded-2xl bg-[#050505] border-2 border-violet-500 text-violet-400 flex items-center justify-center mx-auto text-2xl font-bold font-mono shadow-[0_0_25px_rgba(139,92,246,0.3)]">
              {Math.round((scoreCount / SAMPLE_QUIZ_QUESTIONS.length) * 100)}%
            </div>

            <h3 className="text-xl font-bold text-[#F5F5F5]">
              Assessment Complete!
            </h3>
            <p className="text-xs text-[#888888]">
              You answered <strong className="text-violet-400">{scoreCount}</strong> out of{' '}
              {SAMPLE_QUIZ_QUESTIONS.length} questions correctly.
            </p>

            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="quantum-glow text-white font-bold px-6 py-2.5 rounded-2xl text-xs"
              >
                Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="border border-[#222222] bg-[#1A1A1A] px-6 py-2.5 rounded-2xl text-xs font-semibold hover:bg-[#222222] text-[#888888]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

