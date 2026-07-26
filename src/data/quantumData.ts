import { ConceptItem, NoteItem, PastScore, ChatMessage, Flashcard, QuizQuestion } from '../types';

export const INITIAL_CONCEPTS: ConceptItem[] = [
  {
    id: 'c1',
    title: 'Qubits & Quantum State Representation',
    subtitle: 'Core Concept • 15 min study',
    timeAgo: '1 hour ago',
    duration: '15 min study',
    category: 'QUBITS',
    categoryType: 'physics',
    icon: 'deployed_code',
    iconColor: 'text-cyan-400',
    summary: 'The fundamental unit of quantum information, represented as a two-level state vector |ψ⟩ = α|0⟩ + β|1⟩ on the Bloch sphere with |α|² + |β|² = 1.',
    formula: '|ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩',
    keyPoints: [
      'Two-level quantum state vectors in Hilbert space',
      'Bloch sphere geometric visualization',
      'Measurement collapse and probability amplitudes'
    ],
    status: 'Completed'
  },
  {
    id: 'c2',
    title: 'Quantum Superposition',
    subtitle: 'Core Concept • 20 min study',
    timeAgo: '2 hours ago',
    duration: '20 min study',
    category: 'SUPERPOSITION',
    categoryType: 'physics',
    icon: 'blur_on',
    iconColor: 'text-purple-400',
    summary: 'The ability of a quantum system to exist in a linear combination of multiple states simultaneously until measured.',
    formula: '|ψ⟩ = (1/√2)(|0⟩ + |1⟩)',
    keyPoints: [
      'Linear combination of basis states',
      'Constructive and destructive wave interference',
      'Generated using Hadamard (H) transformations'
    ],
    status: 'Completed'
  },
  {
    id: 'c3',
    title: 'Quantum Entanglement',
    subtitle: 'Core Concept • 25 min study',
    timeAgo: 'Yesterday',
    duration: '25 min study',
    category: 'ENTANGLEMENT',
    categoryType: 'advanced',
    icon: 'link',
    iconColor: 'text-blue-400',
    summary: 'A strong quantum correlation where the quantum states of two or more particles cannot be described independently of each other.',
    formula: '|Φ⁺⟩ = (1/√2)(|00⟩ + |11⟩)',
    keyPoints: [
      'Maximally entangled Bell states',
      'Violates classical Bell inequalities',
      'Essential for quantum teleportation and QKD'
    ],
    status: 'Completed'
  },
  {
    id: 'c4',
    title: 'Quantum Gates (Single & Multi-Qubit)',
    subtitle: 'Core Concept • 30 min study',
    timeAgo: '2 days ago',
    duration: '30 min study',
    category: 'GATES',
    categoryType: 'math',
    icon: 'tune',
    iconColor: 'text-cyan-400',
    summary: 'Unitary transformations operating on state vectors (Hadamard, Pauli-X/Y/Z, CNOT, Phase Gates) preserving norm.',
    formula: 'U U† = U† U = I',
    keyPoints: [
      'Universal gate sets for quantum computation',
      'Reversible unitary linear transformations',
      'CNOT creates multi-qubit entanglement'
    ],
    status: 'In Progress'
  },
  {
    id: 'c5',
    title: 'Quantum Circuits & Algorithms',
    subtitle: 'Core Concept • 35 min study',
    timeAgo: '3 days ago',
    duration: '35 min study',
    category: 'CIRCUITS',
    categoryType: 'advanced',
    icon: 'schema',
    iconColor: 'text-blue-400',
    summary: 'Sequences of quantum gates, state preparation, and measurement channels executed on physical quantum hardware or simulators.',
    formula: '|Ψ_out⟩ = U_n ... U_2 U_1 |Ψ_in⟩',
    keyPoints: [
      'Circuit depth and gate fidelity constraints',
      'Quantum Phase Estimation & Quantum Fourier Transform',
      'Measurement in computational Z-basis'
    ],
    status: 'In Progress'
  },
  {
    id: 'c6',
    title: 'VQE (Variational Quantum Eigensolver)',
    subtitle: 'Hybrid Algorithm • 40 min study',
    timeAgo: '4 days ago',
    duration: '40 min study',
    category: 'VQE',
    categoryType: 'advanced',
    icon: 'calculate',
    iconColor: 'text-purple-400',
    summary: 'A hybrid quantum-classical algorithm that finds the ground state energy of a molecular Hamiltonian using parameterized ansatz circuits.',
    formula: 'E_0 ≤ ⟨ψ(θ)| H |ψ(θ)⟩',
    keyPoints: [
      'NISQ-era quantum chemistry benchmark',
      'Classical optimizer updates parameters θ',
      'Uses Rayleigh-Ritz variational principle'
    ],
    status: 'In Progress'
  },
  {
    id: 'c7',
    title: 'QAOA (Quantum Approximate Optimization)',
    subtitle: 'Combinatorial Algorithm • 35 min study',
    timeAgo: '5 days ago',
    duration: '35 min study',
    category: 'QAOA',
    categoryType: 'advanced',
    icon: 'hub',
    iconColor: 'text-cyan-400',
    summary: 'A polynomial-time variational algorithm designed to solve combinatorial optimization problems like Max-Cut on NISQ devices.',
    formula: '|γ, β⟩ = U(B, β_p) U(C, γ_p) ... U(B, β_1) U(C, γ_1) |+⟩^n',
    keyPoints: [
      'Alternating cost and mixer Hamiltonians',
      'Tackles NP-hard combinatorial graph problems',
      'Monotonically improves with layer depth p'
    ],
    status: 'Needs Review'
  }
];

export const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'n-featured',
    title: 'Variational Quantum Eigensolver (VQE) Deep Dive',
    date: 'July 25, 2026',
    category: 'VQE',
    categoryTag: 'ALGORITHMS',
    summary: 'An end-to-end breakdown of VQE ansatz design, molecular Hamiltonian mapping via Jordan-Wigner transform, and classical optimization loops.',
    content: `### Variational Quantum Eigensolver (VQE) Overview

VQE is a cornerstone hybrid quantum-classical algorithm optimized for Noisy Intermediate-Scale Quantum (NISQ) devices. It finds upper bounds on the ground state energy $E_0$ of a Hamiltonian $H$.

#### Core Execution Steps:
1. **Hamiltonian Mapping**: Map fermionic creation/annihilation operators to qubit Pauli strings $H = \\sum_i c_i P_i$ using Jordan-Wigner or Bravyi-Kitaev transformations.
2. **Ansatz Preparation**: Prepare a parameterized trial state $|\\psi(\\boldsymbol{\\theta})\\rangle$ on quantum hardware using single-qubit rotations and CNOT entanglers.
3. **Expectation Value Measurement**: Measure the expectation values $\\langle P_i \\rangle$ on the quantum computer to compute $\\langle H \\rangle_{\\boldsymbol{\\theta}}$.
4. **Classical Parameter Update**: A classical optimizer (e.g. COBYLA, SPSA) computes cost gradients and updates parameters $\\boldsymbol{\\theta} \\rightarrow \\boldsymbol{\\theta}'$ until convergence.

> **Key Takeaway**: VQE reduces required quantum coherence time by offloading parameter optimization to classical CPUs.`,
    tags: ['VQE', 'Algorithms', 'Quantum Chemistry', 'NISQ'],
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    lastEditedAgo: 'Edited 1 hour ago'
  },
  {
    id: 'n1',
    title: 'QAOA Max-Cut Formulation',
    date: 'July 24, 2026',
    category: 'QAOA',
    categoryTag: 'OPTIMIZATION',
    summary: 'Formulating Max-Cut graph partitioning into Ising cost Hamiltonians for QAOA execution...',
    content: 'QAOA encodes graph adjacency matrices into cost Hamiltonians C = Σ 0.5*(1 - Zi Zj). Alternating application of cost unitaries e^(-i γ C) and transverse field mixer unitaries e^(-i β B) drives the state toward optimal cut configurations.',
    tags: ['QAOA', 'Optimization', 'Ising Model']
  },
  {
    id: 'n2',
    title: 'Universal Quantum Gate Matrix Representations',
    date: 'July 22, 2026',
    category: 'Gates',
    categoryTag: 'CIRCUITS',
    summary: 'Matrix representations of Pauli X, Y, Z, Hadamard (H), Phase (S, T), and CNOT gates...',
    content: 'Hadamard matrix H = 1/√2 [[1, 1], [1, -1]]. CNOT matrix is a 4x4 controlled-NOT operator. Any multi-qubit unitary can be decomposed into single-qubit rotations and CNOT gates with arbitrary precision (Solovay-Kitaev theorem).',
    tags: ['Quantum Gates', 'Matrices', 'Circuits']
  },
  {
    id: 'n3',
    title: 'Bloch Sphere Mathematics & State Rotations',
    date: 'July 20, 2026',
    category: 'Qubits',
    categoryTag: 'QUBITS',
    summary: 'Derivation of polar angle θ and azimuthal angle φ for single-qubit state manipulations...',
    content: 'Rotations on the Bloch sphere around axis n by angle θ are given by R_n(θ) = exp(-i θ n·σ / 2) = cos(θ/2) I - i sin(θ/2) (n_x X + n_y Y + n_z Z). Pauli matrices serve as rotation generators.',
    tags: ['Qubits', 'Superposition', 'Bloch Sphere']
  },
  {
    id: 'n4',
    title: 'Bell State Generation & Entanglement Verification',
    date: 'July 18, 2026',
    category: 'Entanglement',
    categoryTag: 'ENTANGLEMENT',
    summary: 'Constructing Bell circuits using H and CNOT gates to verify CHSH inequality violation...',
    content: 'Starting from |00⟩, applying H to qubit 0 produces 1/√2(|00⟩ + |10⟩). Applying CNOT with qubit 0 as control and qubit 1 as target yields maximally entangled state |Φ⁺⟩ = 1/√2(|00⟩ + |11⟩).',
    tags: ['Entanglement', 'Bell States', 'Circuits']
  }
];

export const INITIAL_SCORES: PastScore[] = [
  {
    id: 's1',
    title: 'Qubits & Superposition Evaluation',
    score: 95,
    date: 'July 24, 2026',
    difficulty: 'INTERMEDIATE',
    totalQuestions: 10
  },
  {
    id: 's2',
    title: 'Quantum Gates & Circuit Diagnostics',
    score: 90,
    date: 'July 20, 2026',
    difficulty: 'BEGINNER',
    totalQuestions: 10
  },
  {
    id: 's3',
    title: 'VQE & QAOA Optimization Assessment',
    score: 85,
    date: 'July 15, 2026',
    difficulty: 'ADVANCED',
    totalQuestions: 10
  }
];

export const INITIAL_CHAT: ChatMessage[] = [
  {
    id: 'msg1',
    sender: 'ai',
    text: "Welcome to Quantum Learning Assistant! I am your AI Quantum Tutor. How can I assist you with Qubits, Superposition, Entanglement, Quantum Gates, Circuits, VQE, or QAOA today?",
    timestamp: '10:00 AM',
    tags: ['QUANTUM TUTOR', 'MS PHYSICS RESEARCH']
  },
  {
    id: 'msg2',
    sender: 'user',
    text: "Can you explain the difference between VQE and QAOA in simple terms?",
    timestamp: '10:01 AM'
  },
  {
    id: 'msg3',
    sender: 'ai',
    text: "Certainly! Both **VQE** and **QAOA** are hybrid quantum-classical algorithms designed for NISQ hardware, but they target different domains:\n\n1. **VQE (Variational Quantum Eigensolver)**:\n   - **Primary Goal**: Find the lowest energy state (ground state) of physical molecules and materials.\n   - **Analogy**: Imagine tuning a quantum microscope to measure the natural energy levels of chemical bonds.\n\n2. **QAOA (Quantum Approximate Optimization Algorithm)**:\n   - **Primary Goal**: Solve discrete combinatorial math problems (like graph routing or Max-Cut).\n   - **Analogy**: Imagine a quantum pendulum swinging back and forth between constraints to find the shortest delivery route.",
    timestamp: '10:01 AM',
    tags: ['VQE', 'QAOA', 'HYBRID ALGORITHMS']
  }
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'f1',
    question: 'What is a Qubit?',
    answer: 'The fundamental unit of quantum information capable of existing in superposition states |ψ⟩ = α|0⟩ + β|1⟩, unlike classical bits restricted to 0 or 1.',
    topic: 'Qubits',
    difficulty: 'Easy'
  },
  {
    id: 'f2',
    question: 'What is Quantum Superposition?',
    answer: 'A quantum principle allowing a qubit to exist in a linear combination of |0⟩ and |1⟩ simultaneously until measurement forces a collapse to a definite basis state.',
    topic: 'Superposition',
    difficulty: 'Easy'
  },
  {
    id: 'f3',
    question: 'What defines Quantum Entanglement?',
    answer: 'A phenomenon where two or more qubits become inextricably linked so that measuring one instantly dictates the state of another, regardless of spatial distance.',
    topic: 'Entanglement',
    difficulty: 'Medium'
  },
  {
    id: 'f4',
    question: 'What does a Hadamard Gate (H) do?',
    answer: 'Transforms computational basis states |0⟩ into (|0⟩+|1⟩)/√2 and |1⟩ into (|0⟩-|1⟩)/√2, creating an equal superposition state.',
    topic: 'Quantum Gates',
    difficulty: 'Medium'
  },
  {
    id: 'f5',
    question: 'What is a Quantum Circuit?',
    answer: 'A sequence of unitary quantum gates applied to qubits in defined chronological wire order, ending in measurement operations.',
    topic: 'Quantum Circuits',
    difficulty: 'Medium'
  },
  {
    id: 'f6',
    question: 'What is VQE (Variational Quantum Eigensolver)?',
    answer: 'A hybrid quantum-classical algorithm using parameterized ansatz circuits to estimate ground state energies of molecular Hamiltonians.',
    topic: 'VQE',
    difficulty: 'Hard'
  },
  {
    id: 'f7',
    question: 'What is QAOA (Quantum Approximate Optimization Algorithm)?',
    answer: 'A variational algorithm that uses alternating cost and mixer Hamiltonian unitaries to approximate solutions for combinatorial optimization problems like Max-Cut.',
    topic: 'QAOA',
    difficulty: 'Hard'
  }
];

export const SAMPLE_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What property enables a single Qubit to store a linear combination of basis states simultaneously?',
    options: ['Quantum Decoherence', 'Quantum Superposition', 'Classical Determinism', 'Thermodynamic Equilibrium'],
    correctIndex: 1,
    explanation: 'Quantum Superposition allows qubits to exist in state combinations |ψ⟩ = α|0⟩ + β|1⟩ before measurement.',
    topic: 'Superposition'
  },
  {
    id: 'q2',
    question: 'Which gate sequence produces the maximally entangled Bell state |Φ⁺⟩ starting from initial state |00⟩?',
    options: ['Hadamard on Q0, then CNOT(Q0 → Q1)', 'Pauli-X on Q0, then Pauli-Z on Q1', 'Hadamard on Q0 and Q1 simultaneously', 'CNOT(Q0 → Q1) without Hadamard'],
    correctIndex: 0,
    explanation: 'Hadamard creates superposition 1/√2(|00⟩ + |10⟩), and CNOT entangles it into 1/√2(|00⟩ + |11⟩).',
    topic: 'Entanglement'
  },
  {
    id: 'q3',
    question: 'In VQE (Variational Quantum Eigensolver), which system component updates the circuit parameters θ?',
    options: ['The Quantum Processing Unit (QPU)', 'A Classical Optimizer (e.g. COBYLA or SPSA) on CPU/GPU', 'The Cryogenic Refrigerator', 'The Optical Laser Modulator'],
    correctIndex: 1,
    explanation: 'VQE is a hybrid algorithm: the QPU calculates energy expectation values, while a classical CPU optimizer computes gradient updates for parameters θ.',
    topic: 'VQE'
  },
  {
    id: 'q4',
    question: 'QAOA uses alternating applications of which two types of Hamiltonians?',
    options: ['Thermal and Kinetic Hamiltonians', 'Cost Hamiltonian C and Mixer Hamiltonian B', 'Relativistic and Gravitational Hamiltonians', 'Optical and Acoustic Hamiltonians'],
    correctIndex: 1,
    explanation: 'QAOA applies U(C, γ) = e^(-i γ C) (Cost Hamiltonian) and U(B, β) = e^(-i β B) (Mixer Hamiltonian) in p layers.',
    topic: 'QAOA'
  }
];
