import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';

interface TutorScreenProps {
  chatHistory: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  onOpenBlochSphere: () => void;
  isGenerating?: boolean;
}

export const TutorScreen: React.FC<TutorScreenProps> = ({
  chatHistory,
  onSendMessage,
  onOpenBlochSphere,
  isGenerating = false
}) => {
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    'Explain Superposition in simple terms',
    'How does VQE work in quantum chemistry?',
    'What is QAOA and Max-Cut?',
    'Explain Schrödinger Equation & Wave Function',
    'How is Quantum Computing used in Protein Folding?',
    'Explain Qiskit & IBM Quantum hardware',
    'What is Heisenberg Uncertainty Principle?',
    'Show a Quantum Gate Circuit ASCII diagram'
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isGenerating]);

  const handleSend = async () => {
    if (!inputText.trim() || isGenerating) return;
    const text = inputText;
    setInputText('');
    await onSendMessage(text);
  };

  const handleSuggestionClick = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] relative pb-24">
      {/* Background glow atmospheric effects */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header Banner for AI Tutor */}
      <div className="bg-[#0C0621] border border-[#231242] p-4 rounded-2xl mb-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-400/30">
            <span className="material-symbols-outlined text-xl">smart_toy</span>
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white leading-tight flex items-center gap-2">
              Quantum AI Assistant
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[10px]">
                GEMINI 3.6
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Interactive tutor for Qubits, Superposition, Entanglement, Gates, Circuits, VQE, QAOA & Qiskit.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenBlochSphere}
          className="hidden sm:flex py-2 px-3.5 rounded-xl bg-[#170E38] hover:bg-[#20134C] border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all items-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-base">3d_rotation</span>
          Bloch Sphere
        </button>
      </div>

      {/* Chat Messages History */}
      <div
        ref={chatContainerRef}
        className="flex-1 flex flex-col gap-5 py-2 overflow-y-auto px-1 md:px-2 space-y-2 scrollbar-thin"
      >
        {chatHistory.map((msg) => {
          const isAI = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 items-start ${
                isAI ? 'justify-start' : 'justify-end'
              } transition-all duration-300 animate-fadeIn`}
            >
              {isAI && (
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1 shadow-[0_0_12px_rgba(6,182,212,0.4)] border border-cyan-400/30">
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                </div>
              )}

              <div
                className={`bento-card p-4 sm:p-5 max-w-[92%] sm:max-w-[85%] ${
                  isAI
                    ? 'rounded-tl-none border-[#231242] bg-[#0E0724]'
                    : 'rounded-tr-none bg-purple-900/40 border-purple-500/50 text-white'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-100 font-sans tracking-wide">
                  {msg.text}
                </div>

                {/* AI Tag badges */}
                {isAI && msg.tags && msg.tags.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-[#231242] flex flex-wrap gap-2">
                    {msg.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Interactive Bloch Sphere Visualization Card */}
                {isAI && msg.hasVisualization && (
                  <div
                    onClick={onOpenBlochSphere}
                    className="mt-4 bento-card-interactive bg-[#070314] p-3.5 border-dashed border-cyan-500/40 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform text-cyan-400">
                        <span className="material-symbols-outlined text-xl">
                          3d_rotation
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-mono font-bold text-cyan-300 group-hover:underline uppercase">
                          3D Bloch Sphere Simulator
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          Interactive 3D qubit state rotation controller & vector simulator
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-cyan-400 text-base group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {!isAI && (
                <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/30 flex items-center justify-center font-bold text-xs text-purple-300 shrink-0 mt-1 font-mono">
                  YOU
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isGenerating && (
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-xs shrink-0 mt-1">
              <span className="material-symbols-outlined text-base">smart_toy</span>
            </div>
            <div className="bento-card p-4 rounded-tl-none bg-[#0E0724] border-[#231242]">
              <div className="flex items-center gap-3 text-cyan-300 text-xs font-mono">
                <div className="flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                  <span
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.15s' }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.3s' }}
                  ></span>
                </div>
                <span>Quantum AI Assistant is solving wave functions...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestion Chips */}
      <div className="py-2 flex flex-wrap justify-center gap-2 overflow-x-auto max-h-20">
        {suggestions.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleSuggestionClick(chip)}
            className="px-3 py-1.5 rounded-xl bg-[#0E0724] border border-[#231242] hover:border-cyan-400/50 hover:text-cyan-300 transition-all text-xs font-mono text-slate-300 active:scale-95 shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="pt-2">
        <div className="bento-card p-2 flex items-center gap-2 bg-[#0E0724] border-[#231242]">
          <button
            type="button"
            onClick={onOpenBlochSphere}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-[#1A0E3C] transition-colors shrink-0"
            title="Open Bloch Sphere Visualizer"
          >
            <span className="material-symbols-outlined">3d_rotation</span>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder="Ask AI Quantum Tutor about Qubits, Gates, VQE, QAOA, Qiskit..."
            className="flex-1 bg-transparent border-none focus:outline-none text-white placeholder:text-slate-500 text-sm py-2.5 font-sans"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={!inputText.trim() || isGenerating}
            className="w-10 h-10 rounded-xl quantum-glow flex items-center justify-center text-white transition-transform active:scale-90 disabled:opacity-40 shrink-0"
          >
            <span
              className="material-symbols-outlined text-lg"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              send
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
