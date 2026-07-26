import React, { useState } from 'react';
import {
  NavigationTab,
  ConceptItem,
  NoteItem,
  PastScore,
  ChatMessage,
  RoadmapModule
} from './types';
import {
  INITIAL_CONCEPTS,
  INITIAL_NOTES,
  INITIAL_SCORES,
  INITIAL_CHAT
} from './data/quantumData';
import { INITIAL_ROADMAP_MODULES } from './data/roadmapData';

import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { NotesScreen } from './components/NotesScreen';
import { QuizScreen } from './components/QuizScreen';
import { TutorScreen } from './components/TutorScreen';
import { ConceptsScreen } from './components/ConceptsScreen';
import { RoadmapScreen } from './components/RoadmapScreen';
import { QuantumVisualizationsScreen } from './components/QuantumVisualizationsScreen';

import { BlochSphereVisualizer } from './components/BlochSphereVisualizer';
import { FlashcardsModal } from './components/FlashcardsModal';
import { QuizRunnerModal } from './components/QuizRunnerModal';
import { NoteEditorModal } from './components/NoteEditorModal';
import { ConceptDetailModal } from './components/ConceptDetailModal';
import { AnalysisModal } from './components/AnalysisModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');

  // Application Data States
  const [concepts, setConcepts] = useState<ConceptItem[]>(INITIAL_CONCEPTS);
  const [notes, setNotes] = useState<NoteItem[]>(INITIAL_NOTES);
  const [pastScores, setPastScores] = useState<PastScore[]>(INITIAL_SCORES);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [roadmapModules, setRoadmapModules] = useState<RoadmapModule[]>(INITIAL_ROADMAP_MODULES);

  // Toggle Module Status
  const handleToggleModuleStatus = (id: number) => {
    setRoadmapModules(prev =>
      prev.map(m => {
        if (m.id === id) {
          const nextStatus =
            m.status === 'Completed'
              ? 'In Progress'
              : m.status === 'In Progress'
              ? 'Locked'
              : 'Completed';
          return { ...m, status: nextStatus };
        }
        return m;
      })
    );
  };

  // Modals & Active View States
  const [isBlochSphereOpen, setIsBlochSphereOpen] = useState(false);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Quiz Runner Modal State
  const [isQuizRunnerOpen, setIsQuizRunnerOpen] = useState(false);
  const [quizDifficulty, setQuizDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [quizConcepts, setQuizConcepts] = useState<string[]>(['Wave-Particle Duality']);

  // Selected Note Editor/Reader Modal State
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  // Selected Concept Modal State
  const [selectedConcept, setSelectedConcept] = useState<ConceptItem | null>(null);
  const [isConceptModalOpen, setIsConceptModalOpen] = useState(false);

  // AI Tutor Generation State
  const [isGenerating, setIsGenerating] = useState(false);

  // Handlers
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      const sanitizedHistory = chatHistory.slice(-10).map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          history: sanitizedHistory
        })
      });

      let data: any = {};
      if (res && res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          data = await res.json();
        }
      }

      const replyText = data.text || `### Simple Explanation\nIn quantum mechanics, when exploring **${text}**, physical systems operate via complex probability amplitudes in Hilbert space rather than classical binary states.\n\n### Scientific Analysis\nState $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ undergoes unitary transformations $U U^\\dagger = I$. Measurement outcome probability is governed by Born's rule $P(x) = |\\langle x | \\psi \\rangle|^2$.`;

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags: data.tags || ['QUANTUM AI', 'TUTOR'],
        hasVisualization: data.hasVisualization ?? true,
        visualizationType: data.visualizationType || 'bloch'
      };

      setChatHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn('AI tutor API request notice:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-fallback-${Date.now()}`,
        sender: 'ai',
        text: `### Simple Explanation\nIn quantum mechanics, when exploring **${text}**, physical systems operate via complex probability amplitudes in Hilbert space rather than classical binary states.\n\n### Scientific Analysis\nState $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$ undergoes unitary transformations $U U^\\dagger = I$. Measurement outcome probability is governed by Born's rule $P(x) = |\\langle x | \\psi \\rangle|^2$.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags: ['PHYSICS CORE', 'QUANTUM AI'],
        hasVisualization: true,
        visualizationType: 'bloch'
      };
      setChatHistory(prev => [...prev, fallbackMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStartQuiz = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced', selected: string[]) => {
    setQuizDifficulty(difficulty);
    setQuizConcepts(selected.length ? selected : ['Wave-Particle Duality']);
    setIsQuizRunnerOpen(true);
  };

  const handleFinishQuiz = (score: PastScore) => {
    setPastScores(prev => [score, ...prev]);
  };

  const handleSaveNote = (updatedNote: NoteItem) => {
    setNotes(prev => {
      const exists = prev.some(n => n.id === updatedNote.id);
      if (exists) {
        return prev.map(n => (n.id === updatedNote.id ? updatedNote : n));
      } else {
        return [updatedNote, ...prev];
      }
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handleCreateNewNote = () => {
    setSelectedNote(null);
    setIsNoteModalOpen(true);
  };

  const handleSelectNote = (note: NoteItem) => {
    setSelectedNote(note);
    setIsNoteModalOpen(true);
  };

  const handleSelectConcept = (concept: ConceptItem) => {
    setSelectedConcept(concept);
    setIsConceptModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070314] text-[#F8FAFC] selection:bg-cyan-500/30 relative font-sans">
      {/* Fixed Top Header */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsBlochSphereOpen(true)}
      />

      {/* Main View Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-20 min-h-screen">
        {currentTab === 'home' && (
          <HomeScreen
            concepts={concepts}
            onTabChange={setCurrentTab}
            onSelectConcept={handleSelectConcept}
            onOpenAnalysis={() => setIsAnalysisOpen(true)}
            onOpenFlashcards={() => setIsFlashcardsOpen(true)}
          />
        )}

        {currentTab === 'roadmap' && (
          <RoadmapScreen
            modules={roadmapModules}
            onToggleModuleStatus={handleToggleModuleStatus}
            onAskTutor={(promptText) => {
              setCurrentTab('tutor');
              handleSendMessage(promptText);
            }}
            onOpenBlochSphere={() => setIsBlochSphereOpen(true)}
          />
        )}

        {currentTab === 'visualizations' && (
          <QuantumVisualizationsScreen
            onAskTutor={(promptText) => {
              setCurrentTab('tutor');
              handleSendMessage(promptText);
            }}
          />
        )}

        {currentTab === 'notes' && (
          <NotesScreen
            notes={notes}
            onSelectNote={handleSelectNote}
            onCreateNewNote={handleCreateNewNote}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizScreen
            pastScores={pastScores}
            onStartQuiz={handleStartQuiz}
          />
        )}

        {currentTab === 'tutor' && (
          <TutorScreen
            chatHistory={chatHistory}
            onSendMessage={handleSendMessage}
            onOpenBlochSphere={() => setIsBlochSphereOpen(true)}
            isGenerating={isGenerating}
          />
        )}

        {currentTab === 'concepts' && (
          <ConceptsScreen
            concepts={concepts}
            onSelectConcept={handleSelectConcept}
            onOpenBlochSphere={() => setIsBlochSphereOpen(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {/* Modals */}
      <BlochSphereVisualizer
        isOpen={isBlochSphereOpen}
        onClose={() => setIsBlochSphereOpen(false)}
      />

      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
      />

      <QuizRunnerModal
        isOpen={isQuizRunnerOpen}
        difficulty={quizDifficulty}
        selectedConcepts={quizConcepts}
        onClose={() => setIsQuizRunnerOpen(false)}
        onFinishQuiz={handleFinishQuiz}
      />

      <NoteEditorModal
        note={selectedNote}
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSaveNote={handleSaveNote}
        onDeleteNote={handleDeleteNote}
      />

      <ConceptDetailModal
        concept={selectedConcept}
        isOpen={isConceptModalOpen}
        onClose={() => setIsConceptModalOpen(false)}
        onOpenBlochSphere={() => setIsBlochSphereOpen(true)}
      />

      <AnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        onGoToQuiz={() => {
          setCurrentTab('quiz');
        }}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
}
