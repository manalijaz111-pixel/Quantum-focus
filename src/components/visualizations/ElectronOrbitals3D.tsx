import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ElectronOrbitals3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedOrbital, setSelectedOrbital] = useState<string>('2px'); // 1s, 2s, 2px, 2py, 2pz, 3dz2
  const [pointCount, setPointCount] = useState<number>(12000);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060312);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Coordinate Axes
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // Generate Points based on Quantum Probability Density |Ψ|^2
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    const colors = new Float32Array(pointCount * 3);

    const color1 = new THREE.Color(0x06b6d4); // Cyan
    const color2 = new THREE.Color(0xa855f7); // Purple

    let count = 0;
    const maxRadius = 4;

    while (count < pointCount) {
      // Rejection sampling for orbital probability densities
      const r = Math.random() * maxRadius;
      const theta = Math.acos(2 * Math.random() - 1); // 0 to pi
      const phi = 2 * Math.PI * Math.random(); // 0 to 2pi

      let psi = 0;

      if (selectedOrbital === '1s') {
        // Ψ_100 ~ e^(-r)
        psi = Math.exp(-r * 1.5);
      } else if (selectedOrbital === '2s') {
        // Ψ_200 ~ (2 - r) e^(-r/2)
        psi = Math.abs(2 - r) * Math.exp(-r / 1.2);
      } else if (selectedOrbital === '2px') {
        // Ψ_211 ~ r e^(-r/2) sin(θ) cos(φ)
        psi = r * Math.exp(-r / 1.2) * Math.abs(Math.sin(theta) * Math.cos(phi));
      } else if (selectedOrbital === '2py') {
        // Ψ_211 ~ r e^(-r/2) sin(θ) sin(φ)
        psi = r * Math.exp(-r / 1.2) * Math.abs(Math.sin(theta) * Math.sin(phi));
      } else if (selectedOrbital === '2pz') {
        // Ψ_210 ~ r e^(-r/2) cos(θ)
        psi = r * Math.exp(-r / 1.2) * Math.abs(Math.cos(theta));
      } else if (selectedOrbital === '3dz2') {
        // Ψ_320 ~ r^2 e^(-r/3) (3 cos^2 θ - 1)
        psi = (r * r) * Math.exp(-r / 1.5) * Math.abs(3 * Math.cos(theta) * Math.cos(theta) - 1);
      }

      const prob = psi * psi;

      if (Math.random() < prob) {
        // Convert spherical (r, theta, phi) to Cartesian (x, y, z)
        const x = r * Math.sin(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(theta);

        positions[count * 3] = x;
        positions[count * 3 + 1] = y;
        positions[count * 3 + 2] = z;

        // Color gradient based on distance from nucleus
        const mixRatio = Math.min(r / maxRadius, 1);
        const ptColor = color1.clone().lerp(color2, mixRatio);

        colors[count * 3] = ptColor.r;
        colors[count * 3 + 1] = ptColor.g;
        colors[count * 3 + 2] = ptColor.b;

        count++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const pointCloud = new THREE.Points(geometry, material);
    scene.add(pointCloud);

    // Central Nucleus Dot
    const nGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const nMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const nucleus = new THREE.Mesh(nGeo, nMat);
    scene.add(nucleus);

    // Animation Loop (Slow rotation of orbital cloud)
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      pointCloud.rotation.y += 0.005;
      pointCloud.rotation.x += 0.002;
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
      cancelAnimationFrame(frameId);
      if (renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedOrbital, pointCount]);

  const orbitalList = [
    { key: '1s', label: '1s (Spherical)' },
    { key: '2s', label: '2s (Radial Node)' },
    { key: '2px', label: '2p_x (X-Dumbbell)' },
    { key: '2py', label: '2p_y (Y-Dumbbell)' },
    { key: '2pz', label: '2p_z (Z-Dumbbell)' },
    { key: '3dz2', label: '3d_z² (Clover/Torus)' }
  ];

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-inner bg-[#060312]">
        <div ref={mountRef} className="w-full h-full" />

        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            3D QUANTUM ORBITAL CLOUD |Ψ|²
          </div>
          <div>Active Orbital: <span className="text-cyan-300 font-bold">{selectedOrbital}</span></div>
          <div>Point Density: {pointCount.toLocaleString()} particles</div>
        </div>
      </div>

      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-300 font-bold">Select Orbital:</span>
          {orbitalList.map(o => (
            <button
              key={o.key}
              onClick={() => setSelectedOrbital(o.key)}
              className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedOrbital === o.key
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'bg-[#150B33] text-slate-400 border-[#231242] hover:text-white'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-300 font-bold">Density:</span>
          <button
            onClick={() => setPointCount(prev => prev === 12000 ? 20000 : 12000)}
            className="px-3 py-1.5 rounded-lg bg-[#180E3C] border border-cyan-500/30 text-cyan-300 font-bold"
          >
            {pointCount === 12000 ? 'High (12k)' : 'Ultra (20k)'}
          </button>
        </div>
      </div>
    </div>
  );
};
