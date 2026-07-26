import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const AtomicStructure3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [atomicNumber, setAtomicNumber] = useState<number>(1); // 1 = H, 2 = He, 3 = Li
  const [speed, setSpeed] = useState<number>(1);
  const [excited, setExcited] = useState<boolean>(false);
  const [emittedPhoton, setEmittedPhoton] = useState<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060312);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 2, 50);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Central Nucleus Group
    const nucleusGroup = new THREE.Group();
    scene.add(nucleusGroup);

    // Create protons and neutrons
    const protonGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const protonMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 }); // Red
    const neutronMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.3 }); // Gray

    const numProtons = atomicNumber;
    const numNeutrons = atomicNumber === 1 ? 0 : atomicNumber;

    for (let i = 0; i < numProtons; i++) {
      const p = new THREE.Mesh(protonGeo, protonMat);
      p.position.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);
      nucleusGroup.add(p);
    }
    for (let i = 0; i < numNeutrons; i++) {
      const n = new THREE.Mesh(protonGeo, neutronMat);
      n.position.set((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5);
      nucleusGroup.add(n);
    }

    // Orbit Rings
    const shells = atomicNumber === 3 ? [2.5, 4.5] : [2.5];
    if (excited) shells.push(5.5);

    const orbitLinesGroup = new THREE.Group();
    scene.add(orbitLinesGroup);

    shells.forEach(r => {
      const ringGeo = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      orbitLinesGroup.add(ring);
    });

    // Electrons
    const electronGroup = new THREE.Group();
    scene.add(electronGroup);

    const electronGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const electronMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.8 });

    const totalElectrons = atomicNumber;
    const electronMeshes: THREE.Mesh[] = [];

    for (let i = 0; i < totalElectrons; i++) {
      const e = new THREE.Mesh(electronGeo, electronMat);
      electronGroup.add(e);
      electronMeshes.push(e);
    }

    // Animation Loop
    let animationFrameId: number;
    let angle = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      angle += 0.02 * speed;

      nucleusGroup.rotation.y += 0.01;

      electronMeshes.forEach((eMesh, idx) => {
        let radius = 2.5;
        if (atomicNumber === 3 && idx === 2) radius = 4.5;
        if (excited && idx === electronMeshes.length - 1) radius = 5.5;

        const tilt = (idx * Math.PI) / 3;
        const x = radius * Math.cos(angle + idx * 2.1);
        const z = radius * Math.sin(angle + idx * 2.1);
        const y = Math.sin(angle * 1.5 + idx) * 0.5 * (idx % 2 === 0 ? 1 : -1);

        eMesh.position.set(x, y, z);
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [atomicNumber, speed, excited]);

  const handleExcite = () => {
    setExcited(true);
    setEmittedPhoton(false);
    setTimeout(() => {
      setExcited(false);
      setEmittedPhoton(true);
      setTimeout(() => setEmittedPhoton(false), 2000);
    }, 2500);
  };

  const elementNames = ['1: Hydrogen (H)', '2: Helium (He)', '3: Lithium (Li)'];

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-inner bg-[#060312]">
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Overlay Info */}
        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            3D RUTHERFORD-BOHR ATOM
          </div>
          <div>Element: {elementNames[atomicNumber - 1]}</div>
          <div>Energy Shells: {atomicNumber === 3 ? 'n=1, n=2' : excited ? 'n=1, n=3 (EXCITED)' : 'n=1 (Ground)'}</div>
          {emittedPhoton && (
            <div className="text-yellow-300 font-bold animate-bounce flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">bolt</span>
              PHOTON EMITTED! (ΔE = hν)
            </div>
          )}
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-bold">Element:</span>
          {[1, 2, 3].map(z => (
            <button
              key={z}
              onClick={() => { setAtomicNumber(z); setExcited(false); }}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                atomicNumber === z
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold'
                  : 'bg-[#150B33] text-slate-400 border-[#231242] hover:text-white'
              }`}
            >
              Z = {z} ({z === 1 ? 'H' : z === 2 ? 'He' : 'Li'})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-300 font-bold">Orbital Speed:</span>
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.2"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="accent-cyan-400 w-24"
          />
          <span className="text-cyan-300 font-bold w-8">{speed.toFixed(1)}x</span>
        </div>

        <button
          onClick={handleExcite}
          disabled={excited}
          className="quantum-glow font-bold px-4 py-2 rounded-xl text-white text-xs flex items-center gap-1.5 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-sm">flash_on</span>
          {excited ? 'Absorbing Photon...' : 'Excite Electron (Absorption)'}
        </button>
      </div>
    </div>
  );
};
