import React, { useRef, useState, useEffect } from 'react';
import { Palette, RotateCcw, Download, Sparkles, Wand2, Eye } from 'lucide-react';

export default function RangoliStudio() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#f59e0b');
  const [brushSize, setBrushSize] = useState(6);
  const [symmetry, setSymmetry] = useState(8); // 4, 8, 12, or 1 (freehand)
  const [brushMode, setBrushMode] = useState('sand'); // 'sand' or 'smooth'
  const isDrawingRef = useRef(false);
  const historyRef = useRef([]);

  const COLORS = [
    { label: 'Haldi Yellow', hex: '#f59e0b' },
    { label: 'Kumkum Red', hex: '#dc2626' },
    { label: 'Gulal Magenta', hex: '#ec4899' },
    { label: 'Peacock Blue', hex: '#0284c7' },
    { label: 'Emerald Green', hex: '#10b981' },
    { label: 'Temple White', hex: '#ffffff' },
    { label: 'Deep Saffron', hex: '#ea580c' },
    { label: 'Golden Dust', hex: '#fde047' },
  ];

  // Initialize Canvas & Dark Velvet Altar background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set logical coordinate resolution
    canvas.width = 600;
    canvas.height = 600;

    // Draw dark rangoli floor plate
    drawBackground(ctx, 600, 600);
    saveHistoryState();
  }, []);

  const drawBackground = (ctx, w, h) => {
    // Rich royal maroon-indigo velvet gradient
    const grad = ctx.createRadialGradient(w/2, h/2, 50, w/2, h/2, w/2);
    grad.addColorStop(0, '#1c0a24');
    grad.addColorStop(0.7, '#0e0618');
    grad.addColorStop(1, '#07030d');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle guideline concentric circles for easy sacred geometry
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.08)';
    ctx.lineWidth = 1;
    [60, 120, 180, 240, 280].forEach(r => {
      ctx.beginPath();
      ctx.arc(w/2, h/2, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Center sacred bindu dot
    ctx.beginPath();
    ctx.arc(w/2, h/2, 4, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.fill();
  };

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (historyRef.current.length > 15) {
      historyRef.current.shift();
    }
    historyRef.current.push(canvas.toDataURL());
  };

  const handleUndo = () => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop(); // Remove current
    const previousState = historyRef.current[historyRef.current.length - 1];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = previousState;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawBackground(ctx, canvas.width, canvas.height);
    saveHistoryState();
  };

  // Drawing routines with radial symmetry
  const drawSymmetricPoint = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const baseAngle = Math.atan2(dy, dx);

    const step = (Math.PI * 2) / symmetry;

    ctx.save();
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = brushMode === 'sand' ? 8 : 4;

    for (let i = 0; i < symmetry; i++) {
      const angle = baseAngle + (i * step);
      const px = cx + Math.cos(angle) * dist;
      const py = cy + Math.sin(angle) * dist;

      if (brushMode === 'sand') {
        // Sand particle dispersion
        for (let s = 0; s < 5; s++) {
          const offsetX = (Math.random() - 0.5) * brushSize * 1.5;
          const offsetY = (Math.random() - 0.5) * brushSize * 1.5;
          ctx.beginPath();
          ctx.arc(px + offsetX, py + offsetY, Math.random() * (brushSize / 2.2) + 1, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Smooth droplet
        ctx.beginPath();
        ctx.arc(px, py, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const { x, y } = getCanvasCoordinates(e);
    drawSymmetricPoint(x, y);
  };

  const drawMove = (e) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getCanvasCoordinates(e);
    drawSymmetricPoint(x, y);
  };

  const stopDrawing = () => {
    if (isDrawingRef.current) {
      isDrawingRef.current = false;
      saveHistoryState();
    }
  };

  // Pre-load Sacred Lotus Preset
  const loadPresetLotus = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    drawBackground(ctx, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const numPetals = 8;
    const step = (Math.PI * 2) / numPetals;

    // Outer Petals
    ctx.save();
    for (let i = 0; i < numPetals; i++) {
      const angle = i * step;
      ctx.beginPath();
      ctx.fillStyle = '#ec4899';
      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 10;
      const px = cx + Math.cos(angle) * 140;
      const py = cy + Math.sin(angle) * 140;
      ctx.arc(px, py, 35, 0, Math.PI * 2);
      ctx.fill();
    }

    // Inner Golden Flower
    for (let i = 0; i < numPetals; i++) {
      const angle = i * step + (step / 2);
      ctx.beginPath();
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 8;
      const px = cx + Math.cos(angle) * 80;
      const py = cy + Math.sin(angle) * 80;
      ctx.arc(px, py, 25, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sacred White Pearls
    for (let i = 0; i < 16; i++) {
      const angle = (i * Math.PI * 2) / 16;
      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 4;
      const px = cx + Math.cos(angle) * 200;
      const py = cy + Math.sin(angle) * 200;
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central Diya Core
    ctx.beginPath();
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 15;
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = '#fef08a';
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    saveHistoryState();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `diwali-digital-rangoli-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="w-full py-8 px-4 flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-2">
          <Palette className="w-3.5 h-3.5 text-pink-400" />
          <span>Sacred Mandala & Sand Powder Art</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-gold-shimmer">
          Interactive Rangoli Studio
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 mt-1">
          Draw with glowing sand colors. The radial mandala symmetry mirrors your strokes into breathtaking festive sacred patterns!
        </p>
      </div>

      {/* Main Studio Workspace */}
      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-6 justify-center">
        
        {/* Canvas Display */}
        <div className="relative flex flex-col items-center">
          <div className="relative p-2.5 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-700 shadow-[0_0_35px_rgba(245,158,11,0.3)]">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={drawMove}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={drawMove}
              onTouchEnd={stopDrawing}
              className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] rounded-full block cursor-crosshair touch-none shadow-inner"
            />
          </div>
          <span className="text-[11px] text-amber-300/60 mt-2 italic">
            Tip: Move your mouse or finger slowly for lush sand dispersion
          </span>
        </div>

        {/* Toolbar & Controls Panel */}
        <div className="w-full max-w-sm festive-glass rounded-2xl p-5 border border-amber-500/25 flex flex-col gap-4">
          
          {/* Color Palette */}
          <div>
            <label className="text-xs font-semibold text-amber-300 mb-2 block flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gulaal Powder Colors</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setColor(c.hex)}
                  title={c.label}
                  className={`h-9 rounded-xl flex items-center justify-center border-2 transition-all ${
                    color === c.hex 
                      ? 'scale-110 border-white shadow-[0_0_12px_#fff]' 
                      : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                >
                  {color === c.hex && (
                    <span className="w-2 h-2 rounded-full bg-black/70" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Radial Symmetry Mode */}
          <div>
            <label className="text-xs font-semibold text-amber-300 mb-1.5 block">
              Radial Symmetry (Mandala Folds)
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { val: 4, label: '4-Fold' },
                { val: 8, label: '8-Fold' },
                { val: 12, label: '12-Fold' },
                { val: 1, label: 'Free' }
              ].map((s) => (
                <button
                  key={s.val}
                  onClick={() => setSymmetry(s.val)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    symmetry === s.val
                      ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-[0_0_8px_#f59e0b]'
                      : 'bg-black/30 text-amber-200 border-amber-500/20 hover:bg-amber-950/40'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brush Mode & Size */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1">
              <label className="text-xs font-semibold text-amber-300 mb-1 block">
                Brush Texture
              </label>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setBrushMode('sand')}
                  className={`flex-1 py-1 rounded text-xs transition-all ${
                    brushMode === 'sand'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-black/30 text-gray-400 hover:text-white'
                  }`}
                >
                  ✨ Sand Glow
                </button>
                <button
                  onClick={() => setBrushMode('smooth')}
                  className={`flex-1 py-1 rounded text-xs transition-all ${
                    brushMode === 'smooth'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                      : 'bg-black/30 text-gray-400 hover:text-white'
                  }`}
                >
                  💧 Smooth
                </button>
              </div>
            </div>

            <div className="w-24">
              <label className="text-xs font-semibold text-amber-300 mb-1 block">
                Size: {brushSize}px
              </label>
              <input
                type="range"
                min="3"
                max="24"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Preset Mandala Button */}
          <button
            onClick={loadPresetLotus}
            className="w-full py-2 px-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 text-xs font-semibold hover:bg-purple-900/60 transition-colors flex items-center justify-center gap-2"
          >
            <Wand2 className="w-3.5 h-3.5 text-yellow-300" />
            <span>Load Sacred Lakshmi Lotus Preset</span>
          </button>

          {/* Action Row: Undo, Clear, Download */}
          <div className="flex items-center gap-2 pt-2 border-t border-amber-500/20">
            <button
              onClick={handleUndo}
              className="flex-1 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-200 text-xs font-medium hover:bg-amber-950/40 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Undo
            </button>

            <button
              onClick={handleClear}
              className="flex-1 py-2 rounded-xl bg-black/40 border border-red-500/30 text-red-300 text-xs font-medium hover:bg-red-950/40 transition-colors"
            >
              Clear
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(245,158,11,0.4)] flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Save PNG
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
