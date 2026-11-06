import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Flame, Play, Pause, Trash2, Rocket, RotateCw } from 'lucide-react';
import { 
  playRocketLaunchSound, 
  playExplosionSound, 
  playChakriSound, 
  playFlowerpotSound, 
  playSparklerSound 
} from '../utils/audio';

export default function FireworksSimulator() {
  const canvasRef = useRef(null);
  const [crackerType, setCrackerType] = useState('rocket'); // 'rocket', 'chakri', 'anar', 'sparkler'
  const [selectedColor, setSelectedColor] = useState('multicolor');
  const [autoShow, setAutoShow] = useState(false);

  // References for animation state
  const particlesRef = useRef([]);
  const rocketsRef = useRef([]);
  const spinnersRef = useRef([]);
  const fountainsRef = useRef([]);
  const isPointerDownRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });

  const PALETTES = {
    multicolor: ['#f59e0b', '#ef4444', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6', '#fbbf24', '#ffffff'],
    gold: ['#fef08a', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#ffffff'],
    peacock: ['#06b6d4', '#0284c7', '#10b981', '#34d399', '#38bdf8'],
    crimson: ['#f43f5e', '#e11d48', '#be123c', '#fb7185', '#ffffff']
  };

  const getColors = () => PALETTES[selectedColor] || PALETTES.multicolor;

  // Launch a Rocket
  const launchRocket = (startX, targetX, targetY) => {
    playRocketLaunchSound();
    const colors = getColors();
    const color = colors[Math.floor(Math.random() * colors.length)];
    rocketsRef.current.push({
      x: startX,
      y: canvasRef.current ? canvasRef.current.height : 600,
      targetX,
      targetY,
      speed: 7 + Math.random() * 3,
      color,
      trail: []
    });
  };

  // Explode Rocket into fireworks particles
  const explodeRocket = (x, y, baseColor) => {
    playExplosionSound('large');
    const colors = getColors();
    const particleCount = 70 + Math.floor(Math.random() * 40);
    const burstType = Math.random() > 0.5 ? 'ring' : 'sphere';

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 / particleCount) * i + (Math.random() * 0.1);
      const speed = burstType === 'ring' 
        ? 3.5 + Math.random() * 1.5 
        : Math.random() * 5 + 1;
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        decay: 0.012 + Math.random() * 0.015,
        gravity: 0.06,
        size: Math.random() * 2.5 + 1.5,
        flicker: Math.random() > 0.4
      });
    }
  };

  // Spawn Ground Chakri
  const spawnChakri = (x, y) => {
    playChakriSound();
    spinnersRef.current.push({
      x,
      y,
      angle: 0,
      spinSpeed: 0.35,
      life: 140,
      colors: getColors()
    });
  };

  // Spawn Flowerpot / Anar
  const spawnAnar = (x, y) => {
    playFlowerpotSound();
    fountainsRef.current.push({
      x,
      y,
      life: 160,
      colors: getColors()
    });
  };

  // Emit Sparkler Particles around mouse/touch
  const emitSparkler = (x, y) => {
    playSparklerSound();
    const colors = getColors();
    for (let i = 0; i < 7; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 8,
        y: y + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.03 + Math.random() * 0.03,
        gravity: 0.08,
        size: Math.random() * 2 + 1,
        flicker: true
      });
    }
  };

  // Canvas interaction handlers
  const handlePointerDown = (e) => {
    isPointerDownRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    pointerPosRef.current = { x, y };

    if (crackerType === 'rocket') {
      const startX = x + (Math.random() - 0.5) * 60;
      launchRocket(startX, x, y);
    } else if (crackerType === 'chakri') {
      spawnChakri(x, y);
    } else if (crackerType === 'anar') {
      spawnAnar(x, y);
    } else if (crackerType === 'sparkler') {
      emitSparkler(x, y);
    }
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    pointerPosRef.current = { x, y };

    if (isPointerDownRef.current && crackerType === 'sparkler') {
      emitSparkler(x, y);
    }
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  // Auto Show Loop
  useEffect(() => {
    if (!autoShow) return;
    const interval = setInterval(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const targetX = Math.random() * (canvas.width * 0.8) + (canvas.width * 0.1);
      const targetY = Math.random() * (canvas.height * 0.45) + 60;
      const startX = targetX + (Math.random() - 0.5) * 120;
      
      const randType = Math.random();
      if (randType < 0.6) {
        launchRocket(startX, targetX, targetY);
      } else if (randType < 0.8) {
        spawnChakri(targetX, canvas.height - 40);
      } else {
        spawnAnar(targetX, canvas.height - 30);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [autoShow, selectedColor]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Resize handling
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio;
        canvas.height = 540 * window.devicePixelRatio;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId;

    const render = () => {
      // Semi-transparent clear to leave trailing glow trails
      ctx.fillStyle = 'rgba(7, 6, 20, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Update & Render Rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];
        const dx = r.targetX - r.x;
        const dy = r.targetY - r.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < r.speed || r.y <= r.targetY) {
          explodeRocket(r.x, r.y, r.color);
          rocketsRef.current.splice(i, 1);
          continue;
        }

        r.x += (dx / dist) * r.speed;
        r.y += (dy / dist) * r.speed;

        // Draw ascending rocket head
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Rocket golden trail sparks
        for (let j = 0; j < 3; j++) {
          particlesRef.current.push({
            x: r.x + (Math.random() - 0.5) * 4,
            y: r.y + Math.random() * 5,
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 1.5 + 1,
            color: '#fbbf24',
            alpha: 0.8,
            decay: 0.05,
            gravity: 0.02,
            size: 1.5,
            flicker: true
          });
        }
      }

      // 2. Update & Render Spinners (Chakri)
      for (let i = spinnersRef.current.length - 1; i >= 0; i--) {
        const c = spinnersRef.current[i];
        c.life--;
        c.angle += c.spinSpeed;

        if (c.life <= 0) {
          spinnersRef.current.splice(i, 1);
          continue;
        }

        // Draw center spinning spark core
        ctx.beginPath();
        ctx.arc(c.x, c.y, 4 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.fill();

        // Emit spinning spiral arms
        for (let arm = 0; arm < 4; arm++) {
          const armAngle = c.angle + (arm * Math.PI / 2);
          const sparkSpeed = 3.5 + Math.random() * 2;
          particlesRef.current.push({
            x: c.x,
            y: c.y,
            vx: Math.cos(armAngle) * sparkSpeed,
            vy: Math.sin(armAngle) * sparkSpeed,
            color: c.colors[Math.floor(Math.random() * c.colors.length)],
            alpha: 1,
            decay: 0.028,
            gravity: 0.02,
            size: 2,
            flicker: true
          });
        }
      }

      // 3. Update & Render Fountains (Anar)
      for (let i = fountainsRef.current.length - 1; i >= 0; i--) {
        const f = fountainsRef.current[i];
        f.life--;

        if (f.life <= 0) {
          fountainsRef.current.splice(i, 1);
          continue;
        }

        // Emit vertical fountain sparks
        for (let s = 0; s < 5; s++) {
          const spreadAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
          const power = Math.random() * 7 + 4;
          particlesRef.current.push({
            x: f.x + (Math.random() - 0.5) * 10,
            y: f.y,
            vx: Math.cos(spreadAngle) * power * 0.3,
            vy: Math.sin(spreadAngle) * power,
            color: f.colors[Math.floor(Math.random() * f.colors.length)],
            alpha: 1,
            decay: 0.02,
            gravity: 0.16,
            size: Math.random() * 2.5 + 1.2,
            flicker: true
          });
        }
      }

      // 4. Update & Render Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > canvas.height + 20) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.flicker && Math.random() > 0.5 ? 1.4 : 1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [selectedColor]);

  const clearCanvas = () => {
    particlesRef.current = [];
    rocketsRef.current = [];
    spinnersRef.current = [];
    fountainsRef.current = [];
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section className="w-full py-8 px-4 flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>100% Eco-Friendly • Zero Smoke • Pure Celebration</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-gold-shimmer">
          Green Fireworks Arena
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 mt-1">
          Select your eco-cracker, pick vibrant hues, and tap anywhere on the canvas to launch dazzling bursts!
        </p>
      </div>

      {/* Control Toolbar */}
      <div className="w-full max-w-4xl festive-glass rounded-xl p-3 mb-4 flex flex-wrap items-center justify-between gap-3 border border-amber-500/25">
        
        {/* Cracker Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setCrackerType('rocket')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              crackerType === 'rocket'
                ? 'bg-amber-500 text-black font-semibold shadow-[0_0_10px_#f59e0b]'
                : 'bg-black/30 text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            Rocket (Aakash Baan)
          </button>

          <button
            onClick={() => setCrackerType('chakri')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              crackerType === 'chakri'
                ? 'bg-amber-500 text-black font-semibold shadow-[0_0_10px_#f59e0b]'
                : 'bg-black/30 text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
            Chakri (Ground Spinner)
          </button>

          <button
            onClick={() => setCrackerType('anar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              crackerType === 'anar'
                ? 'bg-amber-500 text-black font-semibold shadow-[0_0_10px_#f59e0b]'
                : 'bg-black/30 text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            Anar (Flowerpot Fountain)
          </button>

          <button
            onClick={() => setCrackerType('sparkler')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              crackerType === 'sparkler'
                ? 'bg-amber-500 text-black font-semibold shadow-[0_0_10px_#f59e0b]'
                : 'bg-black/30 text-amber-200 hover:bg-amber-950/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Phuljhadi (Sparkler)
          </button>
        </div>

        {/* Color Palette & Actions */}
        <div className="flex items-center gap-2">
          {/* Palette Picker */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-amber-500/20">
            {Object.keys(PALETTES).map((pKey) => (
              <button
                key={pKey}
                onClick={() => setSelectedColor(pKey)}
                title={`Color: ${pKey}`}
                className={`w-5 h-5 rounded-full capitalize text-[9px] font-bold border transition-all ${
                  selectedColor === pKey ? 'scale-110 border-white shadow-[0_0_6px_#fff]' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{
                  background: pKey === 'multicolor'
                    ? 'linear-gradient(135deg, #f59e0b, #ef4444, #06b6d4)'
                    : pKey === 'gold'
                    ? '#f59e0b'
                    : pKey === 'peacock'
                    ? '#0284c7'
                    : '#e11d48'
                }}
              />
            ))}
          </div>

          {/* Auto Fireworks Toggle */}
          <button
            onClick={() => setAutoShow(a => !a)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              autoShow
                ? 'bg-red-500/20 text-red-300 border-red-500 shadow-[0_0_8px_#ef4444]'
                : 'bg-black/40 text-amber-200 border-amber-500/30 hover:bg-amber-950/40'
            }`}
          >
            {autoShow ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
            <span>Auto Show</span>
          </button>

          {/* Clear */}
          <button
            onClick={clearCanvas}
            title="Clear Canvas"
            className="p-1.5 rounded-lg bg-black/40 text-gray-400 hover:text-red-400 border border-gray-700 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Interactive Canvas Container */}
      <div className="relative w-full max-w-4xl h-[460px] sm:h-[540px] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.2)] bg-[#070614] cursor-crosshair">
        
        {/* Instruction overlay when canvas is untouched */}
        <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 text-xs text-amber-200">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>Tap or drag anywhere to celebrate with {crackerType}!</span>
        </div>

        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full block touch-none"
        />

        {/* Decorative Skyline silhouette at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between px-6 opacity-40">
          <span className="text-xl">🪔</span>
          <span className="text-lg">🏛️</span>
          <span className="text-xl">🪔</span>
          <span className="text-lg">✨</span>
          <span className="text-xl">🪔</span>
        </div>

      </div>

    </section>
  );
}
