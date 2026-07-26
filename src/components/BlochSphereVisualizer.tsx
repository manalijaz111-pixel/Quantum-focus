import React, { useState, useEffect, useRef } from 'react';

interface BlochSphereVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlochSphereVisualizer: React.FC<BlochSphereVisualizerProps> = ({ isOpen, onClose }) => {
  const [theta, setTheta] = useState<number>(Math.PI / 2); // 0 to PI
  const [phi, setPhi] = useState<number>(Math.PI / 4); // 0 to 2*PI
  const [measurementResult, setMeasurementResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Probabilities
  const p0 = Math.cos(theta / 2) ** 2;
  const p1 = Math.sin(theta / 2) ** 2;

  // Apply Gate Helper
  const applyHadamard = () => {
    // Hadamard turns |0> -> (|0> + |1>)/sqrt(2) which is theta = PI/2, phi = 0
    // and |1> -> (|0> - |1>)/sqrt(2) which is theta = PI/2, phi = PI
    if (Math.abs(theta) < 0.1) {
      setTheta(Math.PI / 2);
      setPhi(0);
    } else if (Math.abs(theta - Math.PI) < 0.1) {
      setTheta(Math.PI / 2);
      setPhi(Math.PI);
    } else {
      setTheta(Math.PI / 2);
      setPhi(0);
    }
    setMeasurementResult(null);
  };

  const applyPauliX = () => {
    // Bit flip: theta -> PI - theta, phi -> phi
    setTheta(Math.PI - theta);
    setMeasurementResult(null);
  };

  const applyPauliZ = () => {
    // Phase flip: phi -> phi + PI
    setPhi((phi + Math.PI) % (2 * Math.PI));
    setMeasurementResult(null);
  };

  const measureQubit = () => {
    const rand = Math.random();
    const result = rand < p0 ? '|0⟩' : '|1⟩';
    setMeasurementResult(result);
    if (result === '|0⟩') {
      setTheta(0);
    } else {
      setTheta(Math.PI);
    }
  };

  // Canvas drawing loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.36;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Sphere Outer Circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(221, 183, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Equator Ellipse
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.3, 0, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Z-Axis
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius - 15);
      ctx.lineTo(centerX, centerY + radius + 15);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis labels
      ctx.fillStyle = '#ddb7ff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('|0⟩ (+Z)', centerX, centerY - radius - 22);
      ctx.fillText('|1⟩ (-Z)', centerX, centerY + radius + 30);

      // Compute vector coordinates on 3D projection
      // x = r * sin(theta) * cos(phi)
      // y = r * sin(theta) * sin(phi)
      // z = r * cos(theta)
      // Standard isometric or perspective projection:
      const rx = radius * Math.sin(theta) * Math.cos(phi);
      const ry = radius * Math.sin(theta) * Math.sin(phi);
      const rz = radius * Math.cos(theta);

      // Project (x, y, z) to 2D canvas:
      // screenX = centerX + x - y * 0.4
      // screenY = centerY - z + y * 0.2
      const projX = centerX + rx * 0.85 - ry * 0.35;
      const projY = centerY - rz * 0.85 + ry * 0.2;

      // Draw vector shadow / projection line to equator
      const eqProjX = centerX + rx * 0.85 - ry * 0.35;
      const eqProjY = centerY + ry * 0.2;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(eqProjX, eqProjY);
      ctx.strokeStyle = 'rgba(173, 198, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(eqProjX, eqProjY);
      ctx.lineTo(projX, projY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Main Vector Arrow
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(projX, projY);
      ctx.strokeStyle = '#ddb7ff';
      ctx.lineWidth = 3.5;
      ctx.shadowColor = '#ddb7ff';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Vector Tip Dot
      ctx.beginPath();
      ctx.arc(projX, projY, 6, 0, 2 * Math.PI);
      ctx.fillStyle = '#fabc4e';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Center Dot
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#ddb7ff';
      ctx.fill();
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isOpen, theta, phi]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bento-card max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-[#222222] pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-violet-400 text-2xl">
              3d_rotation
            </span>
            <h2 className="font-mono text-lg font-bold text-[#F5F5F5]">
              Bloch Sphere Visualizer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-white rounded-2xl hover:bg-[#1A1A1A] transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Canvas View */}
          <div className="flex flex-col items-center justify-center bg-[#050505] p-4 rounded-2xl border border-[#222222] relative">
            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              className="max-w-full"
            />
            {measurementResult && (
              <div className="absolute top-3 right-3 bg-violet-500/20 border border-violet-500/50 text-violet-400 font-mono text-xs font-bold px-3 py-1 rounded-2xl animate-bounce">
                Collapsed to {measurementResult}
              </div>
            )}
          </div>

          {/* Controls & Math */}
          <div className="space-y-4">
            <div className="bg-[#050505] p-3.5 rounded-2xl border border-[#222222] space-y-2 font-mono text-xs">
              <div className="text-violet-400 font-bold">
                |ψ⟩ = cos({(theta / 2).toFixed(2)})|0⟩ + e^({phi.toFixed(2)}i) sin({(theta / 2).toFixed(2)})|1⟩
              </div>
              <div className="flex justify-between text-[#888888] pt-1 border-t border-[#222222]">
                <span>P(|0⟩): {(p0 * 100).toFixed(1)}%</span>
                <span>P(|1⟩): {(p1 * 100).toFixed(1)}%</span>
              </div>
            </div>

            {/* Angle Sliders */}
            <div className="space-y-3 font-mono">
              <div>
                <div className="flex justify-between text-xs text-[#888888] mb-1">
                  <span>Polar Angle θ: {(theta * (180 / Math.PI)).toFixed(0)}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.PI}
                  step={0.01}
                  value={theta}
                  onChange={(e) => {
                    setTheta(parseFloat(e.target.value));
                    setMeasurementResult(null);
                  }}
                  className="w-full accent-violet-500 bg-[#1A1A1A] h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#888888] mb-1">
                  <span>Phase Angle φ: {(phi * (180 / Math.PI)).toFixed(0)}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2 * Math.PI}
                  step={0.01}
                  value={phi}
                  onChange={(e) => {
                    setPhi(parseFloat(e.target.value));
                    setMeasurementResult(null);
                  }}
                  className="w-full accent-violet-500 bg-[#1A1A1A] h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Quantum Gate Buttons */}
            <div>
              <span className="text-[10px] uppercase font-mono font-semibold text-[#888888] tracking-wider block mb-2">
                Apply Quantum Gate / Action
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={applyHadamard}
                  className="py-2 bg-violet-500/20 hover:bg-violet-500/30 text-violet-400 border border-violet-500/40 rounded-2xl text-xs font-mono font-bold transition-all"
                  title="Hadamard Gate (Superposition)"
                >
                  H Gate
                </button>
                <button
                  type="button"
                  onClick={applyPauliX}
                  className="py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#F5F5F5] border border-[#333333] rounded-2xl text-xs font-mono font-bold transition-all"
                  title="Pauli-X Gate (Bit Flip)"
                >
                  X Gate
                </button>
                <button
                  type="button"
                  onClick={applyPauliZ}
                  className="py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#F5F5F5] border border-[#333333] rounded-2xl text-xs font-mono font-bold transition-all"
                  title="Pauli-Z Gate (Phase Flip)"
                >
                  Z Gate
                </button>
                <button
                  type="button"
                  onClick={measureQubit}
                  className="py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-xs font-mono font-bold transition-all"
                  title="Quantum Measurement"
                >
                  Measure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
