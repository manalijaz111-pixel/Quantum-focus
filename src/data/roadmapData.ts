import { RoadmapModule } from '../types';

export const INITIAL_ROADMAP_MODULES: RoadmapModule[] = [
  // Phase 1: Classical & Atomic Foundations (Modules 1 - 5)
  {
    id: 1,
    title: 'Structure of Atom',
    category: 'Classical & Atomic Physics',
    summary: 'Protons, neutrons, electrons, nucleus geometry, and subatomic constituent interactions.',
    description: 'Understand how matter is constructed at the atomic scale, from Rutherford scattering and nuclear density to electron clouds surrounding atomic nuclei.',
    keyPoints: [
      'Atomic nucleus composed of tightly bound protons and neutrons (nucleons)',
      'Negative electron cloud bound by electrostatic Coulomb force',
      'Classical planetary orbits failed due to continuous electromagnetic radiation loss',
      'Fundamental mass and charge distribution of subatomic particles'
    ],
    formula: 'F_c = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2}',
    icon: 'blur_on',
    status: 'Completed',
    estimatedMinutes: 20
  },
  {
    id: 2,
    title: 'Electrons and Energy Levels',
    category: 'Classical & Atomic Physics',
    summary: 'Quantized electron orbits, principle quantum numbers, photon absorption & emission.',
    description: 'Discover how atomic electrons occupy discrete energy states (n = 1, 2, 3...) and transition between levels by absorbing or emitting discrete photon energy quanta.',
    keyPoints: [
      'Atomic states are quantized into discrete bound energy levels',
      'Ground state represents minimum energy configuration',
      'Excitations require absorbed photon energy matching ΔE = E_f - E_i',
      'Emission spectra create unique atomic spectral signatures'
    ],
    formula: '\\Delta E = E_2 - E_1 = h\\nu = \\frac{hc}{\\lambda}',
    icon: 'stacked_line_chart',
    status: 'Completed',
    estimatedMinutes: 25,
    prerequisites: 'Module 1: Structure of Atom'
  },
  {
    id: 3,
    title: 'Wave Particle Duality',
    category: 'Early Quantum Theory',
    summary: 'Dual nature of light and matter exhibiting both wave interference and particle momentum.',
    description: 'Explore the revolutionary breakthrough showing that electromagnetic radiation and subatomic matter exhibit wave characteristics (diffraction, interference) and particle traits (localized impact).',
    keyPoints: [
      'Young double-slit interference demonstrates wave nature of single photons & electrons',
      'Compton scattering and photoelectric effect demonstrate localized particle collisions',
      'Quantum entities exist as wave-packet state distributions',
      'Observer measurement collapses interference patterns into classical particle hits'
    ],
    formula: 'E = h\\nu = \\hbar \\omega, \\quad p = \\frac{h}{\\lambda} = \\hbar k',
    icon: 'waves',
    status: 'Completed',
    estimatedMinutes: 30,
    prerequisites: 'Module 2: Electrons and Energy Levels'
  },
  {
    id: 4,
    title: 'Photoelectric Effect',
    category: 'Early Quantum Theory',
    summary: 'Einstein explanation of electron emission via light quanta (photons) and work function.',
    description: 'Study how light hitting a metallic surface ejects electrons only if photon frequency exceeds threshold frequency ν₀, proving the existence of energy quanta (photons).',
    keyPoints: [
      'Kinetic energy of ejected photoelectrons depends on frequency, not light intensity',
      'Light intensity increases total photo-current rate, not individual electron speed',
      'Work function Φ is minimum binding energy needed to liberate surface electrons',
      '1921 Nobel Prize work proving light quantization'
    ],
    formula: 'K_{max} = h\\nu - \\Phi = e V_{stop}',
    icon: 'lightbulb',
    status: 'Completed',
    estimatedMinutes: 25,
    prerequisites: 'Module 3: Wave Particle Duality'
  },
  {
    id: 5,
    title: 'Bohr Model',
    category: 'Early Quantum Theory',
    summary: 'Quantized angular momentum orbits and Rydberg formula for hydrogen spectral lines.',
    description: 'Niels Bohr combined classical mechanics with quantization rules to derive stationary electron orbits and accurately calculate the Balmer series spectral lines of Hydrogen.',
    keyPoints: [
      'Electron angular momentum is quantized in integer multiples of ℏ: L = nℏ',
      'Electrons do not radiate energy while occupying stationary orbits',
      'Rydberg constant derived purely from fundamental physical constants',
      'Model limitations led directly to wave mechanics and Schrödinger formulations'
    ],
    formula: 'L = m_e v r = n\\hbar, \\quad \\frac{1}{\\lambda} = R_H \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)',
    icon: 'orbit',
    status: 'In Progress',
    estimatedMinutes: 30,
    prerequisites: 'Module 4: Photoelectric Effect'
  },

  // Phase 2: Quantum Foundations & Core Theory (Modules 6 - 10)
  {
    id: 6,
    title: 'de Broglie Theory',
    category: 'Early Quantum Theory',
    summary: 'Matter wave hypothesis assigning wavelengths λ = h/p to massive moving particles.',
    description: 'Louis de Broglie hypothesized that if light waves exhibit particle properties, material particles (like electrons) must possess an intrinsic matter wavelength.',
    keyPoints: [
      'Matter wavelength inversely proportional to momentum: λ = h / p',
      'Davisson-Germer electron diffraction experiment confirmed matter waves',
      'Explains Bohr orbital quantization as constructive standing wave condition: 2πr = nλ',
      'Foundation for wave function physics in quantum mechanics'
    ],
    formula: '\\lambda = \\frac{h}{p} = \\frac{h}{mv}',
    icon: 'graphic_eq',
    status: 'In Progress',
    estimatedMinutes: 25,
    prerequisites: 'Module 5: Bohr Model'
  },
  {
    id: 7,
    title: 'Heisenberg Uncertainty Principle',
    category: 'Core Quantum Mechanics',
    summary: 'Fundamental limit on simultaneous measurement precision of conjugate variables.',
    description: 'Discover why position and momentum (or energy and time) cannot be measured simultaneously to arbitrary precision due to non-commuting quantum operator commutators.',
    keyPoints: [
      'Fundamental physical property of quantum state vectors, not measurement flaw',
      'Position-momentum uncertainty bound: Δx Δp ≥ ℏ / 2',
      'Energy-time uncertainty relation: ΔE Δt ≥ ℏ / 2',
      'Non-zero commutator [x, p] = iℏ proves conjugated observables cannot share eigenstates'
    ],
    formula: '\\Delta x \\Delta p \\ge \\frac{\\hbar}{2}, \\quad [\\hat{A}, \\hat{B}] = i\\hbar',
    icon: 'all_inclusive',
    status: 'In Progress',
    estimatedMinutes: 30,
    prerequisites: 'Module 6: de Broglie Theory'
  },
  {
    id: 8,
    title: 'Schrodinger Equation',
    category: 'Core Quantum Mechanics',
    summary: 'Governing partial differential equation for time evolution of quantum state vectors.',
    description: 'Master Erwin Schrödinger equation describing how quantum wave functions Ψ(x,t) evolve deterministically under Hamiltonian operator H.',
    keyPoints: [
      'Time-Dependent equation governs continuous unitary state trajectory',
      'Time-Independent equation yields energy eigenvalues E and stationary spatial states',
      'Hamiltonian operator H = T + V combines kinetic & potential energy terms',
      'Solutions explain atomic orbitals, tunneling barriers, and quantum potential wells'
    ],
    formula: 'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(x,t) = \\hat{H}\\Psi(x,t)',
    icon: 'functions',
    status: 'In Progress',
    estimatedMinutes: 40,
    prerequisites: 'Module 7: Heisenberg Uncertainty Principle'
  },
  {
    id: 9,
    title: 'Wave Function and Probability',
    category: 'Core Quantum Mechanics',
    summary: 'Born probability rule, complex probability amplitudes, normalization, and measurement.',
    description: 'Learn Max Born interpretation: the absolute square of complex amplitude |Ψ(x,t)|² gives probability density of finding a particle at coordinate x.',
    keyPoints: [
      'Wave function Ψ is complex-valued amplitude field',
      'Born Rule: P(x) = |Ψ(x,t)|² = Ψ* Ψ',
      'Normalization constraint requires total integrated probability = 1 across space',
      'Measurement causes wavefunction collapse into definite observable eigenstate'
    ],
    formula: '\\int_{-\\infty}^{\\infty} |\\Psi(x,t)|^2 dx = 1, \\quad P(a) = |\\langle a | \\Psi \\rangle|^2',
    icon: 'insights',
    status: 'In Progress',
    estimatedMinutes: 30,
    prerequisites: 'Module 8: Schrodinger Equation'
  },
  {
    id: 10,
    title: 'Quantum States',
    category: 'Core Quantum Mechanics',
    summary: 'Bra-ket Dirac notation, Hilbert vector space, basis states, and inner products.',
    description: 'Transition from spatial continuous wave functions to generalized linear algebra representation using Dirac Bra-Ket notation |ψ⟩ in complex vector Hilbert space.',
    keyPoints: [
      'State vectors represented as kets |ψ⟩ and dual row vectors as bras ⟨ψ|',
      'Inner product ⟨φ|ψ⟩ measures overlap amplitude between quantum states',
      'Orthonormal basis states ⟨i|j⟩ = δ_ij span N-dimensional state space',
      'Hermitian matrix operators represent measurable physical observables'
    ],
    formula: '|\\psi\\rangle = \\sum_{i} c_i |e_i\\rangle, \\quad \\langle \\phi | \\psi \\rangle = \\mathbf{d}^\\dagger \\mathbf{c}',
    icon: 'auto_awesome_motion',
    status: 'Locked',
    estimatedMinutes: 35,
    prerequisites: 'Module 9: Wave Function and Probability'
  },

  // Phase 3: Quantum Information & Core Qubit Theory (Modules 11 - 15)
  {
    id: 11,
    title: 'Qubits',
    category: 'Quantum Information',
    summary: 'Fundamental 2-state quantum bit state vector spanned by computational basis |0⟩ and |1⟩.',
    description: 'Understand the building block of quantum information processing: the qubit state vector live in 2-dimensional complex Hilbert space C².',
    keyPoints: [
      'Classical bit is strictly 0 or 1; qubit exists as linear combination α|0⟩ + β|1⟩',
      'Complex probability amplitudes α and β satisfy normalization |α|² + |β|² = 1',
      'Physical implementations: superconducting Josephson junctions, trapped ions, photon polarization',
      'N qubits span 2^N dimensional Hilbert computational space'
    ],
    formula: '|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle, \\quad |\\alpha|^2 + |\\beta|^2 = 1',
    icon: 'memory',
    status: 'Locked',
    estimatedMinutes: 30,
    prerequisites: 'Module 10: Quantum States'
  },
  {
    id: 12,
    title: 'Superposition',
    category: 'Quantum Information',
    summary: 'Simultaneous linear combination of quantum basis states prior to measurement.',
    description: 'Learn how quantum systems evaluate multiple computational paths concurrently by existing in coherent superposition states.',
    keyPoints: [
      'Superposition principle allows qubits to hold 2^N state amplitudes in parallel',
      'Created dynamically using Hadamard (H) logic gate transformations',
      'Phase factors e^(iφ) create relative quantum interference',
      'Measurement destroys superposition, collapsing state into a single eigenstate'
    ],
    formula: '|+\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}}, \\quad |-\\rangle = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}}',
    icon: 'join_inner',
    status: 'Locked',
    estimatedMinutes: 35,
    prerequisites: 'Module 11: Qubits'
  },
  {
    id: 13,
    title: 'Entanglement',
    category: 'Quantum Information',
    summary: 'Non-local quantum correlations, EPR paradox, Bell states, and quantum teleportation.',
    description: 'Explore "spooky action at a distance" where multi-qubit joint states cannot be factorized into individual single-qubit states.',
    keyPoints: [
      'Non-separable joint wave functions: |Ψ_AB⟩ ≠ |ψ_A⟩ ⊗ |ψ_B⟩',
      'Four fundamental maximally entangled Bell states (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩)',
      'Measuring qubit A instantly dictates measurement outcome probabilities for qubit B',
      'Core resource for Quantum Teleportation, Superdense Coding, and QKD encryption'
    ],
    formula: '|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
    icon: 'hub',
    status: 'Locked',
    estimatedMinutes: 40,
    prerequisites: 'Module 12: Superposition'
  },
  {
    id: 14,
    title: 'Quantum Gates',
    category: 'Quantum Information',
    summary: 'Unitary matrix logic transformations (Pauli X, Y, Z, Hadamard, CNOT, Phase, Toffoli).',
    description: 'Master 1-qubit and 2-qubit logic operations represented by reversible unitary matrices U that rotate qubit state vectors on the Bloch sphere.',
    keyPoints: [
      'Unitary matrices preserve state vector norm: U U^† = I',
      'Pauli X (bit-flip/NOT), Pauli Z (phase-flip), Hadamard H (superposition creator)',
      'Controlled-NOT (CNOT) entangles target qubit conditioned on control qubit',
      'Universal gate sets can synthesize any quantum algorithm calculation'
    ],
    formula: 'H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}, \\quad X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}',
    icon: 'schema',
    status: 'Locked',
    estimatedMinutes: 40,
    prerequisites: 'Module 13: Entanglement'
  },
  {
    id: 15,
    title: 'Bloch Sphere',
    category: 'Quantum Information',
    summary: '3D geometric visualization mapping pure qubit states to points on unit sphere S².',
    description: 'Visualize single qubit state vectors geometrically using polar angle θ and azimuthal angle φ mapped to x, y, z axes on the unit Bloch sphere.',
    keyPoints: [
      'North pole represents |0⟩, South pole represents |1⟩',
      'Equatorial circle maps equal-superposition states with relative phase φ',
      'Quantum gates act as 3D rotations about axes X, Y, Z',
      'Pure states lie on the boundary surface; mixed states lie inside sphere interior'
    ],
    formula: '|\\psi\\rangle = \\cos\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\left(\\frac{\\theta}{2}\\right)|1\\rangle',
    icon: '3d_rotation',
    status: 'Locked',
    estimatedMinutes: 35,
    prerequisites: 'Module 14: Quantum Gates'
  },

  // Phase 4: Circuits, Algorithms & Modern Hardware (Modules 16 - 20)
  {
    id: 16,
    title: 'Quantum Circuits',
    category: 'Quantum Algorithms & Hardware',
    summary: 'Composition of quantum wires, gate execution sequences, barrier alignment, and measurement.',
    description: 'Learn how to read and synthesize multi-qubit circuit schematics where time flows left to right across parallel qubit registers.',
    keyPoints: [
      'Qubit wires represent quantum registers initialized to |0⟩',
      'Sequential gate application computes joint unitary transformation matrix U_total',
      'Barriers prevent compiler optimization re-ordering during pulse schedule timing',
      'Measurement ops project quantum states into classical output bit strings'
    ],
    formula: '|\\psi_{final}\\rangle = U_n U_{n-1} \\cdots U_1 |00\\dots 0\\rangle',
    icon: 'developer_board',
    status: 'Locked',
    estimatedMinutes: 40,
    prerequisites: 'Module 15: Bloch Sphere'
  },
  {
    id: 17,
    title: 'Quantum Algorithms',
    category: 'Quantum Algorithms & Hardware',
    summary: 'Exponential and polynomial speedups: Deutsch-Jozsa, Grover search, Shor factoring, QFT.',
    description: 'Study how quantum algorithms exploit constructive interference and phase kickback to outperform best classical algorithms.',
    keyPoints: [
      'Grover Search provides quadratic O(√N) speedup for unsorted database queries',
      'Shor Algorithm factors large integers in polynomial time O((log N)³), impacting RSA',
      'Quantum Fourier Transform (QFT) extracts periodic frequency eigenvalues',
      'Phase kickback transfers global phase information into target register control bits'
    ],
    formula: 'O(\\sqrt{N}) \\text{ vs } O(N), \\quad QFT: |j\\rangle \\mapsto \\frac{1}{\\sqrt{N}} \\sum_{k=0}^{N-1} e^{2\\pi i j k / N} |k\\rangle',
    icon: 'psychology',
    status: 'Locked',
    estimatedMinutes: 45,
    prerequisites: 'Module 16: Quantum Circuits'
  },
  {
    id: 18,
    title: 'VQE',
    category: 'Quantum Algorithms & Hardware',
    summary: 'Variational Quantum Eigensolver hybrid algorithm for ground state energy in quantum chemistry.',
    description: 'Master VQE, a NISQ-era hybrid quantum-classical algorithm that computes ground state molecular energies by parameterizing parameterized quantum circuits (ansatz).',
    keyPoints: [
      'Rely on Rayleigh-Ritz Variational Principle: ⟨Ψ(θ)|H|Ψ(θ)⟩ ≥ E_ground',
      'Quantum processor measures expectation value ⟨H⟩ for trial state |Ψ(θ)⟩',
      'Classical optimizer (COBYLA, SPSA, ADAM) updates ansatz parameters θ',
      'Crucial for simulating chemical catalysts, battery materials, and protein folding'
    ],
    formula: 'E_0 \\le \\langle \\psi(\\vec{\\theta}) | \\hat{H} | \\psi(\\vec{\\theta}) \\rangle = \\sum_i c_i \\langle P_i \\rangle_{\\vec{\\theta}}',
    icon: 'biotech',
    status: 'Locked',
    estimatedMinutes: 45,
    prerequisites: 'Module 17: Quantum Algorithms'
  },
  {
    id: 19,
    title: 'QAOA',
    category: 'Quantum Algorithms & Hardware',
    summary: 'Quantum Approximate Optimization Algorithm for combinatorial problems (Max-Cut, TSP).',
    description: 'Explore QAOA, an algorithm that alternates problem Hamiltonian phase operators and driver mixer operators to solve complex NP-hard combinatorial optimization graphs.',
    keyPoints: [
      'Maps graph cost functions C(x) into Ising spin glass Hamiltonian operators H_C',
      'Alternates Cost Unitary U(H_C, γ) and Mixer Unitary U(H_B, β)',
      'Layer depth p controls solution approximation ratio',
      'Solves Max-Cut graph partitioning, portfolio optimization, and supply chain logistics'
    ],
    formula: '|\\gamma, \\beta\\rangle = \\prod_{k=1}^p e^{-i \\beta_k \\hat{H}_B} e^{-i \\gamma_k \\hat{H}_C} |+\\rangle^{\\otimes n}',
    icon: 'account_tree',
    status: 'Locked',
    estimatedMinutes: 45,
    prerequisites: 'Module 18: VQE'
  },
  {
    id: 20,
    title: 'Modern Quantum Computing',
    category: 'Quantum Algorithms & Hardware',
    summary: 'Superconducting transmons, trapped ions, fault tolerance, Qiskit framework & protein folding.',
    description: 'Discover real-world state of quantum hardware (IBM Quantum, Google Sycamore, IonQ), error mitigation, surface codes, and cutting-edge application in bio-molecular protein folding.',
    keyPoints: [
      'Physical platform types: Superconducting transmons, Trapped Ions, Neutral Atoms, Photonic',
      'NISQ era vs Fault-Tolerant Quantum Computing (FTQC) with logical error correcting qubits',
      'Qiskit open-source SDK for writing circuits and executing on live IBM cloud hardware',
      'Simulating amino acid lattice folds and drug target docking on quantum processors'
    ],
    formula: 'T_1 \\text{ (energy relaxation)}, T_2 \\text{ (dephasing)}, \\text{Qiskit: } \\texttt{transpile(qc, backend)}',
    icon: 'rocket_launch',
    status: 'Locked',
    estimatedMinutes: 50,
    prerequisites: 'Module 19: QAOA'
  }
];
