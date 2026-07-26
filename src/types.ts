export type NavigationTab = 'home' | 'concepts' | 'roadmap' | 'visualizations' | 'tutor' | 'quiz' | 'notes';

export interface VisualizationItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  icon: string;
  explanation: {
    overview: string;
    physicsPrinciples: string[];
    mathematicalFormulas: string[];
    quantumSignificance: string;
    interactiveControlsGuide: string;
  };
}

export interface RoadmapModule {
  id: number;
  title: string;
  category: 'Classical & Atomic Physics' | 'Early Quantum Theory' | 'Core Quantum Mechanics' | 'Quantum Information' | 'Quantum Algorithms & Hardware';
  summary: string;
  description: string;
  keyPoints: string[];
  formula?: string;
  icon: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  estimatedMinutes: number;
  prerequisites?: string;
}

export interface ConceptItem {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  duration: string;
  category: string;
  categoryType: 'physics' | 'advanced' | 'math' | 'core' | 'review' | 'hardware' | 'logic';
  icon: string;
  iconColor: string;
  summary: string;
  formula?: string;
  keyPoints?: string[];
  status: 'Completed' | 'In Progress' | 'Viewed' | 'Needs Review';
}

export interface NoteItem {
  id: string;
  title: string;
  date: string;
  category: string;
  categoryTag: string;
  summary: string;
  content: string;
  tags: string[];
  imageUrl?: string;
  isFeatured?: boolean;
  lastEditedAgo?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface PastScore {
  id: string;
  title: string;
  score: number;
  date: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  totalQuestions: number;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  tags?: string[];
  hasVisualization?: boolean;
  visualizationType?: 'bloch' | 'wave' | 'double-slit';
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface AskQuantumResponse {
  question: string;
  shortExplanation: string;
  detailedExplanation: string;
  keyPoints: string[];
  realWorldExample: string;
}
