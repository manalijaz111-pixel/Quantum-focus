import { VisualizationItem } from '../types';

export const VISUALIZATION_ITEMS: VisualizationItem[] = [
  {
    id: 'atomic-structure',
    title: '1. Atomic Structure',
    category: 'Atomic Physics',
    shortDesc: '3D Rutherford-Bohr model with nucleus, orbiting electrons, discrete energy levels, and excitation photon emission.',
    icon: 'blur_on',
    explanation: {
      overview: 'The atomic structure visualization models an atom consisting of a dense central nucleus (protons & neutrons) orbited by electrons in discrete, quantized energy shells (n = 1, 2, 3...).',
      physicsPrinciples: [
        'Coulomb Electrostatic Attraction: Holds negative electrons bound to the positively charged nucleus.',
        'Quantized Energy States: Electrons occupy fixed non-radiating stationary orbits specified by quantum number n.',
        'Photon Absorption & Emission: Jumping to a higher shell absorbs a photon of exact energy ΔE = hν; dropping to a lower shell emits a photon.'
      ],
      mathematicalFormulas: [
        'F_c = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Z e^2}{r^2}',
        'E_n = -\\frac{13.6\\text{ eV}}{n^2}',
        '\\Delta E = E_{final} - E_{initial} = h\\nu = \\frac{hc}{\\lambda}'
      ],
      quantumSignificance: 'Demonstrates why classical electrodynamics failed (which predicted rapid orbital collapse via radiation) and why quantum discrete energy levels are required to stabilize matter.',
      interactiveControlsGuide: 'Adjust the atomic number Z (elements H, He, Li), orbit speed, and click "Excite Electron" to simulate photon absorption and atomic emission decay.'
    }
  },
  {
    id: 'electron-orbitals',
    title: '2. Electron Orbitals',
    category: 'Quantum Chemistry',
    shortDesc: '3D point-cloud electron probability density distributions |Ψ(r,θ,φ)|² for 1s, 2s, 2p_x, 2p_y, 2p_z, and 3d orbitals.',
    icon: 'grain',
    explanation: {
      overview: 'Unlike classical planetary orbits, electrons occupy 3D spatial probability clouds called atomic orbitals defined by quantum numbers (n, l, m_l). The density of points represents where finding an electron is most probable.',
      physicsPrinciples: [
        'Probability Density: The probability of locating an electron in volume dV is dP = |Ψ(r,θ,φ)|² dV.',
        'Nodal Surfaces: Regions where Ψ(r,θ,φ) = 0 and probability density vanishes completely.',
        'Spherical Harmonics Y_l^m(θ,φ): Dictate the distinct angular geometry of s (spherical), p (dumbbell), and d (cloverleaf) orbitals.'
      ],
      mathematicalFormulas: [
        '\\Psi_{n,l,m}(r,\\theta,\\phi) = R_{n,l}(r) Y_l^{m}(\\theta,\\phi)',
        'P(r) dr = r^2 |R_{n,l}(r)|^2 dr',
        '\\int |\\Psi|^2 dV = 1'
      ],
      quantumSignificance: 'Forms the physical basis of chemical bonding, molecular geometry, the periodic table structure, and semiconductor physics.',
      interactiveControlsGuide: 'Select between 1s, 2s, 2p_x, 2p_y, 2p_z, and 3d orbitals. Rotate the 3D probability cloud and slice density cutaways.'
    }
  },
  {
    id: 'wave-particle-duality',
    title: '3. Wave Particle Duality',
    category: 'Quantum Principles',
    shortDesc: '3D/2D Double-Slit experiment with single-particle emission, interference fringe accumulation, and detector collapse.',
    icon: 'waves',
    explanation: {
      overview: 'Demonstrates how light photons or subatomic electrons travel as probability waves passing through both double slits simultaneously, but strike detector screens as localized single particles.',
      physicsPrinciples: [
        'Superposition of Wave Paths: Wave functions passing through Slit A and Slit B interfere constructively and destructively.',
        'Single-Particle Interference: Even when sent one-by-one, particles build up an interference pattern over time.',
        'Observer Effect: Adding a detector to observe which slit the particle passed through collapses the wavefunction, destroying interference.'
      ],
      mathematicalFormulas: [
        '\\Psi_{total} = \\Psi_{Slit A} + \\Psi_{Slit B}',
        'I(x) \\propto |\\Psi_{A} + \\Psi_{B}|^2 = |\\Psi_{A}|^2 + |\\Psi_{B}|^2 + 2\\text{Re}(\\Psi_A^* \\Psi_B)',
        'y_{bright} = \\frac{m \\lambda L}{d}'
      ],
      quantumSignificance: 'Proves that quantum entities cannot be categorized purely as classical particles or classical waves, but possess dual nature described by complex wavefunctions.',
      interactiveControlsGuide: 'Fire individual particles or continuous beams. Toggle Slit A/B, adjust slit separation, and toggle the Which-Way Detector to observe decoherence.'
    }
  },
  {
    id: 'schrodinger-wave',
    title: '4. Schrodinger Wave Function',
    category: 'Core Mechanics',
    shortDesc: 'Real-time animated complex wave packet Ψ(x,t) with real part, imaginary part, phase vector, and probability density |Ψ|².',
    icon: 'functions',
    explanation: {
      overview: 'Visualizes the time-dependent Schrödinger equation governing the continuous deterministic evolution of a quantum wave packet moving through space.',
      physicsPrinciples: [
        'Complex Amplitude: Ψ(x,t) = Re[Ψ] + i Im[Ψ] contains both magnitude and quantum phase.',
        'Wave Packet Dispersion: Unbound free Gaussian wave packets spread out in space over time due to momentum uncertainty.',
        'Unitary Evolution: Total integrated probability density remains exactly 1.0 (conserved norm).'
      ],
      mathematicalFormulas: [
        'i\\hbar \\frac{\\partial}{\\partial t}\\Psi(x,t) = -\\frac{\\hbar^2}{2m} \\frac{\\partial^2}{\\partial x^2}\\Psi(x,t) + V(x)\\Psi(x,t)',
        '\\Psi(x,0) = \\frac{1}{(2\\pi \\sigma^2)^{1/4}} e^{i k_0 x} e^{-x^2/(4\\sigma^2)}',
        'P(x,t) = |\\Psi(x,t)|^2 = (Re[\\Psi])^2 + (Im[\\Psi])^2'
      ],
      quantumSignificance: 'The foundational wave equation of non-relativistic quantum mechanics, replacing Newton second law F = ma with linear operator differential equations.',
      interactiveControlsGuide: 'Adjust initial particle momentum k₀, spatial spread σ, and pause/step the time-dependent wavepacket evolution.'
    }
  },
  {
    id: 'quantum-tunneling',
    title: '5. Quantum Tunneling',
    category: 'Quantum Mechanics',
    shortDesc: 'Incident wave packet striking potential energy barrier V₀ > E with exponentially decaying evanescent wave inside barrier and transmitted wave.',
    icon: 'radar',
    explanation: {
      overview: 'In classical mechanics, a ball with kinetic energy E cannot pass a hill of potential height V₀ > E. In quantum mechanics, the wave function decays exponentially inside the barrier, leaving a non-zero probability amplitude for the particle to tunnel through.',
      physicsPrinciples: [
        'Exponential Barrier Decay: Inside V₀ > E region, wave solution becomes real exponential Ψ(x) ~ e^(-κx).',
        'Transmission Probability T: Finite probability of particle appearing on the far side without gaining classical energy.',
        'Applications: Nuclear fusion in stars, Scanning Tunneling Microscopes (STM), Flash memory, and superconducting Josephson junctions.'
      ],
      mathematicalFormulas: [
        '\\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}',
        'T \\approx e^{-2 \\kappa a} = \\exp\\left( -2 a \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar} \\right)',
        'R + T = 1'
      ],
      quantumSignificance: 'Explains radioactive alpha decay, enables modern semiconductors and nanoscale electronics, and powers nuclear reactions in the Sun.',
      interactiveControlsGuide: 'Adjust barrier height V₀, barrier width a, and incident particle kinetic energy E. Watch the transmitted probability wave fraction update in real-time.'
    }
  },
  {
    id: 'bloch-sphere',
    title: '6. Bloch Sphere',
    category: 'Quantum Information',
    shortDesc: 'Interactive 3D unit sphere S² mapping qubit state vector |ψ⟩ = cos(θ/2)|0⟩ + e^(iφ)sin(θ/2)|1⟩ with polar angles θ and φ.',
    icon: '3d_rotation',
    explanation: {
      overview: 'The Bloch sphere provides a geometric representation of a single qubit normalized pure state in 2D complex Hilbert space C² mapped onto a 3D unit sphere surface.',
      physicsPrinciples: [
        'North & South Poles: Represent computational basis states |0⟩ (Z = +1) and |1⟩ (Z = -1).',
        'Equatorial Plane: Contains equal superpositions |+⟩, |-⟩, |i+⟩, |-i⟩ with phase angle φ.',
        'Bloch Vector: 3D unit vector (x, y, z) = (sin θ cos φ, sin θ sin φ, cos θ).'
      ],
      mathematicalFormulas: [
        '|\\psi\\rangle = \\cos\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\left(\\frac{\\theta}{2}\\right)|1\\rangle',
        'x = \\sin\\theta\\cos\\phi, \\quad y = \\sin\\theta\\sin\\phi, \\quad z = \\cos\\theta',
        'P(0) = \\cos^2\\left(\\frac{\\theta}{2}\\right), \\quad P(1) = \\sin^2\\left(\\frac{\\theta}{2}\\right)'
      ],
      quantumSignificance: 'Essential tool for visualizing single-qubit state manipulations, phase shifts, Rabi oscillations, and quantum gate rotations.',
      interactiveControlsGuide: 'Drag sliders for polar angle θ (0 to π) and azimuthal angle φ (0 to 2π) or click preset states (|0⟩, |1⟩, |+⟩, |-⟩) to watch vector rotation.'
    }
  },
  {
    id: 'superposition',
    title: '7. Superposition',
    category: 'Quantum Information',
    shortDesc: 'Interactive 2-state quantum system in α|0⟩ + β|1⟩ with continuous probability tuning, measurement simulator, and quantum state collapse.',
    icon: 'join_inner',
    explanation: {
      overview: 'Superposition allows a quantum system to exist in a linear combination of basis states simultaneously until measured, at which point it collapses randomly into one basis state according to Born rule probabilities |α|² and |β|².',
      physicsPrinciples: [
        'Linear Combination: State |ψ⟩ = α|0⟩ + β|1⟩ with complex coefficients satisfying |α|² + |β|² = 1.',
        'Quantum Measurement Collapse: Measuring destroys superposition and projects state irreversibly into |0⟩ or |1⟩.',
        'Parallel Computational Capacity: N qubits in superposition simultaneously hold 2^N state amplitudes.'
      ],
      mathematicalFormulas: [
        '|\\psi\\rangle = \\alpha |0\\rangle + \\beta |1\\rangle',
        '|\\alpha|^2 + |\\beta|^2 = 1',
        'P(\\text{measuring } 0) = |\\alpha|^2, \\quad P(\\text{measuring } 1) = |\\beta|^2'
      ],
      quantumSignificance: 'The foundational power source of quantum computing, enabling quantum algorithms to process exponentially large state spaces simultaneously.',
      interactiveControlsGuide: 'Slide probability amplitude α and β. Run 100 or 1,000 simulated measurement shots to see experimental frequency match theoretical Born probability.'
    }
  },
  {
    id: 'entanglement',
    title: '8. Entanglement',
    category: 'Quantum Information',
    shortDesc: '3D dual-qubit Bell state (|00⟩ + |11⟩)/√2 simulator demonstrating instant correlation upon measurement of Qubit A.',
    icon: 'hub',
    explanation: {
      overview: 'Visualizes two entangled qubits whose quantum state cannot be factored independently. Measuring Qubit A instantly forces Qubit B into the corresponding correlated state regardless of distance.',
      physicsPrinciples: [
        'Non-Separability: Joint wave function |Ψ_AB⟩ ≠ |ψ_A⟩ ⊗ |ψ_B⟩.',
        'Maximal Correlation: In Bell state (|00⟩ + |11⟩)/√2, if Alice measures 0, Bob automatically measures 0 with 100% probability.',
        'Einstein-Podolsky-Rosen (EPR) Paradox: Bell inequalities prove quantum correlations exceed any local hidden variable theory.'
      ],
      mathematicalFormulas: [
        '|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
        '|\\Psi^+\\rangle = \\frac{|01\\rangle + |10\\rangle}{\\sqrt{2}}',
        '\\langle A B \\rangle = -\\cos(\\theta_A - \\theta_B)'
      ],
      quantumSignificance: 'Powers quantum cryptography (QKD), superdense coding, quantum teleportation, and quantum error correction networks.',
      interactiveControlsGuide: 'Select Bell State (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩). Click "Measure Qubit A" and observe immediate outcome collapse on Qubit B with spin vector alignment.'
    }
  },
  {
    id: 'quantum-gates',
    title: '9. Quantum Gates',
    category: 'Quantum Gates',
    shortDesc: '3D Bloch vector trajectory animation applying Hadamard (H), Pauli X, Y, Z, S, and T unitary gates.',
    icon: 'schema',
    explanation: {
      overview: 'Quantum gates are reversible unitary transformations U represented by complex matrices that rotate qubit state vectors on the Bloch sphere without losing quantum information.',
      physicsPrinciples: [
        'Unitary Property: U U^† = I preserves state norm and probability sum.',
        'Hadamard Gate H: Rotates |0⟩ into equal superposition state |+⟩ = (|0⟩ + |1⟩)/√2.',
        'Pauli Gates X, Y, Z: Perform 180° π rotations about x, y, z axes of the Bloch sphere.'
      ],
      mathematicalFormulas: [
        'H = \\frac{1}{\\sqrt{2}}\\begin{pmatrix} 1 & 1 \\\\ 1 & -1 \\end{pmatrix}, \\quad X = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}',
        'Z = \\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}, \\quad T = \\begin{pmatrix} 1 & 0 \\\\ 0 & e^{i\\pi/4} \\end{pmatrix}',
        'U|\\psi\\rangle = U(\\alpha|0\\rangle + \\beta|1\\rangle)'
      ],
      quantumSignificance: 'Building blocks of quantum logic programs, equivalent to AND, OR, NOT logic gates in classical microprocessors.',
      interactiveControlsGuide: 'Select input state |0⟩ or |1⟩. Click gates (H, X, Y, Z, S, T) to watch smooth 3D Bloch sphere vector rotation trajectories and view resulting amplitude state.'
    }
  },
  {
    id: 'quantum-circuits',
    title: '10. Quantum Circuits',
    category: 'Quantum Computing',
    shortDesc: 'Interactive 3-qubit circuit composer with draggable gates (H, X, CNOT, SWAP, M) and live state probability histogram.',
    icon: 'developer_board',
    explanation: {
      overview: 'Interactive quantum circuit builder where time flows from left to right along horizontal qubit wire registers, executing sequential single and multi-qubit gate transformations.',
      physicsPrinciples: [
        'Circuit Logic Model: Represents quantum algorithms as chronological sequences of gate operations.',
        'Entangling Operations: 2-qubit CNOT gates create entanglement between control and target qubit registers.',
        'State Vector Computation: System joint state vector updates continuously through tensor product matrix multiplication U_total = U_n · ... · U_1.'
      ],
      mathematicalFormulas: [
        '|\\Psi_{final}\\rangle = (U_3 \\otimes U_2 \\otimes U_1) |000\\rangle',
        '\\text{CNOT} = \\begin{pmatrix} 1 & 0 & 0 & 0 \\\\ 0 & 1 & 0 & 0 \\\\ 0 & 0 & 0 & 1 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix}',
        'P(x_1 x_2 x_3) = |c_{x_1 x_2 x_3}|^2'
      ],
      quantumSignificance: 'The primary architecture for writing and compiling quantum algorithms executed on physical IBM, Google, or Rigetti quantum processing units (QPUs).',
      interactiveControlsGuide: 'Click gate chips (H, X, CNOT, SWAP) to place them on Qubit 0, Qubit 1, or Qubit 2 wires. Watch the 8-state (|000⟩ to |111⟩) probability histogram update in real-time!'
    }
  }
];
