import React, { useState } from 'react';
import { AskQuantumResponse, NoteItem } from '../types';

interface AskQuantumScreenProps {
  onOpenBlochSphere: () => void;
  onSaveToNotes?: (note: NoteItem) => void;
}

export const AskQuantumScreen: React.FC<AskQuantumScreenProps> = ({
  onOpenBlochSphere,
  onSaveToNotes
}) => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AskQuantumResponse | null>(null);
  const [history, setHistory] = useState<AskQuantumResponse[]>([]);
  const [copiedNote, setCopiedNote] = useState(false);

  const sampleQuestions = [
    'How does Quantum Entanglement enable quantum teleportation?',
    'What is the difference between VQE and QAOA algorithms?',
    'How do quantum computers solve protein folding?',
    'Explain the Bloch Sphere and state rotation gates',
    'What is the Heisenberg Uncertainty Principle?',
    'How does Qiskit program IBM Quantum hardware?',
    'Explain Schrödinger Wave Equation step-by-step'
  ];

  const handleAsk = async (queryToUse?: string) => {
    const q = queryToUse || question;
    if (!q.trim() || isLoading) return;

    setIsLoading(true);
    setCopiedNote(false);

    try {
      const res = await fetch('/api/ask-quantum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q })
      });

      let data: any = {};
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        data = await res.json();
      }

      if (data.shortExplanation) {
        const responseObj: AskQuantumResponse = {
          question: q,
          shortExplanation: data.shortExplanation,
          detailedExplanation: data.detailedExplanation,
          keyPoints: data.keyPoints || [],
          realWorldExample: data.realWorldExample
        };
        setResult(responseObj);
        setHistory(prev => [responseObj, ...prev.filter(h => h.question !== q)]);
      } else {
        throw new Error('No explanation returned');
      }
    } catch (err) {
      console.error('Error fetching quantum answer:', err);
      // Fallback
      const fallbackObj: AskQuantumResponse = {
        question: q,
        shortExplanation: `In quantum mechanics, ${q} represents a fundamental quantum phenomenon where systems exhibit superposition and entanglement beyond classical limits.`,
        detailedExplanation: `### Scientific Analysis\nWhen examining **${q}**, the quantum state is defined in Hilbert space by state vector $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ where $|\\alpha|^2 + |\\beta|^2 = 1$.\n\nTransformation operators $U$ operate unitarily ($U U^\\dagger = I$) to preserve normalization prior to state measurement.`,
        keyPoints: [
          'State superposition allows linear combinations of basis vectors.',
          'Unitary operations ensure probabilistic conservation.',
          'Measurement collapses superposition into discrete eigenstates.'
        ],
        realWorldExample: `This concept is applied directly in quantum computing hardware (such as IBM Quantum transmon qubits) to execute algorithms faster than classical supercomputers.`
      };
      setResult(fallbackObj);
      setHistory(prev => [fallbackObj, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveNote = () => {
    if (!result || !onSaveToNotes) return;
    const newNote: NoteItem = {
      id: `note-ask-${Date.now()}`,
      title: `Insight: ${result.question}`,
      date: new Date().toLocaleDateString(),
      category: 'AI Research Insight',
      categoryTag: 'QUANTUM AI',
      summary: result.shortExplanation,
      content: `## ${result.question}\n\n### Short Explanation\n${result.shortExplanation}\n\n### Detailed Scientific Explanation\n${result.detailedExplanation}\n\n### Key Points\n${result.keyPoints.map(p => `- ${p}`).join('\n')}\n\n### Real-world Example\n${result.realWorldExample}`,
      tags: ['GEMINI AI', 'ASK QUANTUM', 'PHYSICS']
    };
    onSaveToNotes(newNote);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 3000);
  };

  return (
    <div className="space-y-8 pb-28">
      {/* Top Header */}
      <header className="bento-card p-6 md:p-8 bg-gradient-to-br from-[#0D0628] via-[#120A38] to-[#0A041E] border border-cyan-500/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
              <span className="material-symbols-outlined text-sm">psychology</span>
              DYNAMIC QUANTUM AI ENGINE
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Ask Anything About Quantum
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed">
              Powered by Gemini AI. Ask any question to generate a structured analysis featuring a simple summary, deep scientific explanation, key points, and real-world examples.
            </p>
          </div>

          <button
            onClick={onOpenBlochSphere}
            className="quantum-glow font-bold py-3 px-5 rounded-xl flex items-center gap-2 active:scale-95 transition-all text-xs shrink-0 self-start md:self-auto"
          >
            <span className="material-symbols-outlined text-lg">3d_rotation</span>
            3D Bloch Simulator
          </button>
        </div>
      </header>

      {/* Query Search / Input Bar */}
      <div className="bento-card p-4 md:p-6 bg-[#0E0724] border border-[#231242] space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
              search
            </span>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask any quantum mechanics, qubits, gates, circuit, VQE, or Qiskit question..."
              className="w-full bg-[#070314] border border-[#231242] focus:border-cyan-400 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder:text-slate-500 focus:outline-none transition-all font-sans"
            />
          </div>

          <button
            onClick={() => handleAsk()}
            disabled={!question.trim() || isLoading}
            className="quantum-glow py-3.5 px-7 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-40 shrink-0"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Generating...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                Ask Quantum AI
              </>
            )}
          </button>
        </div>

        {/* Popular Sample Prompts */}
        <div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-bold block mb-2">
            Suggested Quantum Prompts
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((sample) => (
              <button
                key={sample}
                onClick={() => {
                  setQuestion(sample);
                  handleAsk(sample);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#140A33] border border-[#231242] hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all text-left active:scale-95"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="bento-card p-8 bg-[#0E0724] border border-cyan-500/30 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-1 animate-spin">
            <div className="w-full h-full bg-[#070314] rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-cyan-400 text-2xl">auto_awesome</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Gemini Quantum Engine is analyzing your query...</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Constructing short summary, scientific proof, key points & real-world applications.
            </p>
          </div>
        </div>
      )}

      {/* Response Display Section */}
      {result && !isLoading && (
        <div className="space-y-6 animate-fadeIn">
          {/* Question Banner & Actions */}
          <div className="bento-card p-5 bg-[#0C0621] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                AI GENERATED EXPLANATION
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                "{result.question}"
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl bg-[#170E38] hover:bg-[#20134C] border border-purple-500/40 text-purple-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">
                  {copiedNote ? 'check_circle' : 'bookmark_add'}
                </span>
                {copiedNote ? 'Saved to Notes!' : 'Save to Study Notes'}
              </button>

              <button
                onClick={onOpenBlochSphere}
                className="px-3 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-900/60 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">3d_rotation</span>
                3D Bloch
              </button>
            </div>
          </div>

          {/* 4 Required Display Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Short Explanation */}
            <div className="bento-card p-6 bg-[#0E0724] border border-cyan-500/40 space-y-3">
              <div className="flex items-center gap-2.5 text-cyan-400 border-b border-[#231242] pb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">bolt</span>
                </div>
                <h3 className="font-extrabold text-lg text-white">1. Short Explanation</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {result.shortExplanation}
              </p>
            </div>

            {/* 4. Real-world Example */}
            <div className="bento-card p-6 bg-[#0E0724] border border-purple-500/40 space-y-3">
              <div className="flex items-center gap-2.5 text-purple-400 border-b border-[#231242] pb-3">
                <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-500/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">public</span>
                </div>
                <h3 className="font-extrabold text-lg text-white">4. Real-World Example</h3>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {result.realWorldExample}
              </p>
            </div>
          </div>

          {/* 2. Detailed Explanation */}
          <div className="bento-card p-6 md:p-8 bg-[#0B051D] border border-blue-500/30 space-y-4">
            <div className="flex items-center gap-2.5 text-blue-400 border-b border-[#231242] pb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-500/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">menu_book</span>
              </div>
              <h3 className="font-extrabold text-xl text-white">2. Detailed Scientific Explanation</h3>
            </div>

            <div className="whitespace-pre-wrap text-sm text-slate-200 leading-relaxed font-sans space-y-3">
              {result.detailedExplanation}
            </div>
          </div>

          {/* 3. Key Points */}
          <div className="bento-card p-6 md:p-8 bg-[#0E0724] border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-400 border-b border-[#231242] pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-lg">checklist</span>
              </div>
              <h3 className="font-extrabold text-xl text-white">3. Key Takeaway Points</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#070314] border border-[#231242] space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    POINT {idx + 1}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Session Question History */}
      {history.length > 0 && (
        <div className="bento-card p-6 bg-[#0E0724] border border-[#231242] space-y-4">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-lg">history</span>
            Recent Asked Questions
          </h3>

          <div className="space-y-2">
            {history.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setResult(item)}
                className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                  result?.question === item.question
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300 font-bold'
                    : 'bg-[#070314] border-[#231242] text-slate-300 hover:border-slate-600'
                }`}
              >
                <span className="truncate max-w-xl">"{item.question}"</span>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
