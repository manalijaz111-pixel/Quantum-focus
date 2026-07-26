import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const BlochSphere3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [theta, setTheta] = useState<number>(Math.PI / 2); // 90 deg = equator
  const [phi, setPhi] = useState<number>(0); // 0 deg

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 380;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060312);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3, 2.5, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient light
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    // Transparent Sphere
    const sphereGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Axes Lines (X, Y, Z)
    const axesGroup = new THREE.Group();
    scene.add(axesGroup);

    // Z axis (up-down |0> and |1>)
    const zGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, -2.2, 0),
      new THREE.Vector3(0, 2.2, 0)
    ]);
    axesGroup.add(new THREE.Line(zGeo, new THREE.LineBasicMaterial({ color: 0xef4444 })));

    // X axis (front-back)
    const xGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.2, 0, 0),
      new THREE.Vector3(2.2, 0, 0)
    ]);
    axesGroup.add(new THREE.Line(xGeo, new THREE.LineBasicMaterial({ color: 0x22d3ee })));

    // Y axis (left-right)
    const yGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, -2.2),
      new THREE.Vector3(0, 0, 2.2)
    ]);
    axesGroup.add(new THREE.Line(yGeo, new THREE.LineBasicMaterial({ color: 0xa855f7 })));

    // Equator Circle
    const ringGeo = new THREE.RingGeometry(1.79, 1.81, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    // State Vector Arrow (3D Vector from origin to Bloch coordinates)
    // Spherical to Cartesian:
    // x = r * sin(theta) * cos(phi)
    // z_3d = r * cos(theta) (up axis)
    // y_3d = r * sin(theta) * sin(phi)
    const r = 1.8;
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);

    const dir = new THREE.Vector3(x, z, y).normalize();
    const origin = new THREE.Vector3(0, 0, 0);
    const arrow = new THREE.ArrowHelper(dir, origin, r, 0xfacc15, 0.3, 0.15);
    scene.add(arrow);

    // Tip Sphere Dot
    const tipGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.set(x, z, y);
    scene.add(tip);

    // Slow rotation of camera around scene for 3D depth
    let frameId: number;
    let cameraAngle = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      cameraAngle += 0.003;
      camera.position.x = 4.5 * Math.cos(cameraAngle);
      camera.position.z = 4.5 * Math.sin(cameraAngle);
      camera.lookAt(0, 0, 0);
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
  }, [theta, phi]);

  // Probability calculations
  const p0 = Math.cos(theta / 2) ** 2;
  const p1 = Math.sin(theta / 2) ** 2;

  const presets = [
    { label: '|0⟩ (North Pole)', t: 0, p: 0 },
    { label: '|1⟩ (South Pole)', t: Math.PI, p: 0 },
    { label: '|+⟩ (Superposition)', t: Math.PI / 2, p: 0 },
    { label: '|-⟩ (Opposite Phase)', t: Math.PI / 2, p: Math.PI },
    { label: '|i+⟩ (Y-Axis)', t: Math.PI / 2, p: Math.PI / 2 }
  ];

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#060312]">
        <div ref={mountRef} className="w-full h-full" />

        <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md p-3 rounded-xl border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1">
          <div className="font-bold text-white flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-yellow-400">3d_rotation</span>
            BLOCH SPHERE STATE VECTOR
          </div>
          <div>|ψ⟩ = cos({(theta / 2 * 180 / Math.PI).toFixed(0)}°)|0⟩ + e^(i{(phi * 180 / Math.PI).toFixed(0)}°)sin({(theta / 2 * 180 / Math.PI).toFixed(0)}°)|1⟩</div>
          <div className="text-emerald-400 font-bold">P(0) = {(p0 * 100).toFixed(1)}% | P(1) = {(p1 * 100).toFixed(1)}%</div>
        </div>
      </div>

      {/* Preset State Buttons */}
      <div className="bg-[#0D0727] p-4 rounded-xl border border-[#231242] space-y-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-300 font-bold">Presets:</span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => { setTheta(preset.t); setPhi(preset.p); }}
              className="px-3 py-1.5 rounded-lg bg-[#150B33] hover:bg-cyan-950 border border-[#231242] hover:border-cyan-500 text-cyan-300 font-bold transition-all"
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#231242]">
          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-bold w-24">Polar θ ({Math.round(theta * 180 / Math.PI)}°):</span>
            <input
              type="range"
              min="0"
              max={Math.PI}
              step="0.05"
              value={theta}
              onChange={(e) => setTheta(parseFloat(e.target.value))}
              className="accent-yellow-400 flex-1"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-300 font-bold w-24">Phase φ ({Math.round(phi * 180 / Math.PI)}°):</span>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.05"
              value={phi}
              onChange={(e) => setPhi(parseFloat(e.target.value))}
              className="accent-purple-400 flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
