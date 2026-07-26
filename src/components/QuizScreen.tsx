import React, { useState } from 'react';
import { PastScore, QuizQuestion } from '../types';

interface QuizScreenProps {
  pastScores: PastScore[];
  onStartQuiz: (difficulty: 'Beginner' | 'Intermediate' | 'Advanced', concepts: string[]) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ pastScores, onStartQuiz }) => {
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([
    'Wave-Particle Duality',
    'Heisenberg Uncertainty'
  ]);

  const allConcepts = [
    'Wave-Particle Duality',
    'Schrodinger Equation',
    'Quantum Entanglement',
    'Heisenberg Uncertainty',
    'Quantum Tunneling',
    "Bell's Inequality",
    'Superposition Theory'
  ];

  const toggleConcept = (concept: string) => {
    if (selectedConcepts.includes(concept)) {
      setSelectedConcepts(selectedConcepts.filter(c => c !== concept));
    } else {
      setSelectedConcepts([...selectedConcepts, concept]);
    }
  };

  const handleSelectAll = () => {
    if (selectedConcepts.length === allConcepts.length) {
      setSelectedConcepts([]);
    } else {
      setSelectedConcepts([...allConcepts]);
    }
  };

  return (
    <div className="space-y-8 pb-28">
      <header className="space-y-1">
        <span className="text-[11px] font-mono text-[#888888] uppercase tracking-widest">
          Adaptive Engine
        </span>
        <h1 className="font-sans text-2xl md:text-3xl font-bold text-[#F5F5F5] tracking-tight">
          Assessment & Quiz
        </h1>
        <p className="text-[#888888] text-sm">
          Configure your quantum mechanics evaluation session.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Quiz Configurator */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bento-card p-6 space-y-6">
            {/* Select Proficiency Level */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono text-[#888888] uppercase tracking-widest block">
                Select Proficiency Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-3 px-3 rounded-2xl transition-all text-xs font-mono font-semibold active:scale-95 ${
                      difficulty === level
                        ? 'border border-violet-500 bg-violet-500/10 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                        : 'border border-[#222222] bg-[#1A1A1A] text-[#888888] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Core Concepts */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-mono text-[#888888] uppercase tracking-widest">
                  Select Core Concepts
                </label>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-xs font-mono text-violet-400 hover:underline"
                >
                  {selectedConcepts.length === allConcepts.length ? 'DESELECT ALL' : 'SELECT ALL'}
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {allConcepts.map((concept) => {
                  const isSelected = selectedConcepts.includes(concept);
                  return (
                    <button
                      key={concept}
                      type="button"
                      onClick={() => toggleConcept(concept)}
                      className={`px-4 py-2 rounded-2xl text-xs font-mono transition-all flex items-center gap-1.5 active:scale-95 ${
                        isSelected
                          ? 'border border-violet-500/40 bg-violet-500/15 text-violet-400'
                          : 'border border-[#222222] bg-[#1A1A1A] text-[#888888] hover:text-[#F5F5F5]'
                      }`}
                    >
                      {isSelected && (
                        <span className="material-symbols-outlined text-base text-violet-400">
                          check_circle
                        </span>
                      )}
                      {concept}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Quiz Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onStartQuiz(difficulty, selectedConcepts)}
                className="w-full py-4 rounded-2xl quantum-glow font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all group"
              >
                <span>GENERATE QUIZ</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  bolt
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Side: Past Scores & Tutor Tip */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#888888]">
              Past Scores
            </h2>
            <span className="material-symbols-outlined text-[#888888]">history</span>
          </div>

          <div className="space-y-3">
            {pastScores.map((score) => (
              <div
                key={score.id}
                onClick={() => onStartQuiz(score.difficulty.toLowerCase() as any, ['Wave-Particle Duality'])}
                className="bento-card-interactive p-4 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#222222] flex items-center justify-center text-violet-400 font-mono font-bold text-base shrink-0">
                    {score.score}%
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#F5F5F5] group-hover:text-violet-400 transition-colors">
                      {score.title}
                    </h3>
                    <p className="text-[10px] font-mono text-[#888888] uppercase">
                      {score.date} • {score.difficulty}
                    </p>
                  </div>
                </div>

                <span className="material-symbols-outlined text-[#888888] group-hover:text-violet-400 transition-colors">
                  chevron_right
                </span>
              </div>
            ))}
          </div>

          {/* Tutor Tip Box */}
          <div className="bento-card p-5 border-violet-500/20 bg-violet-500/5 flex gap-4 items-start">
            <span className="material-symbols-outlined text-violet-400 text-2xl shrink-0 mt-0.5">
              lightbulb
            </span>
            <div className="space-y-1">
              <h4 className="font-bold text-xs font-mono uppercase text-violet-400">Tutor Recommendation</h4>
              <p className="text-xs text-[#888888] leading-relaxed">
                Focusing on Wave-Particle Duality this week could improve your score by an estimated 15% based on your recent error patterns.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

