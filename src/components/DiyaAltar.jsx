import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Heart, Sun, RotateCcw, Share2 } from 'lucide-react';
import { playDiyaLightSound } from '../utils/audio';
import confetti from 'canvas-confetti';

export default function DiyaAltar({ onGoToGreeting, onGoToFireworks }) {
  // Diyas state: 0 is central grand diya, 1-4 are cardinal earthen diyas
  const [diyas, setDiyas] = useState([
    { id: 0, name: "Grand Akhand Diya", lit: true, size: "large", x: 50, y: 50 },
    { id: 1, name: "North Diya (Shanti)", lit: false, size: "medium", x: 50, y: 18 },
    { id: 2, name: "East Diya (Samriddhi)", lit: false, size: "medium", x: 82, y: 50 },
    { id: 3, name: "South Diya (Arogya)", lit: false, size: "medium", x: 50, y: 82 },
    { id: 4, name: "West Diya (Gyan)", lit: false, size: "medium", x: 18, y: 50 },
  ]);

  const [globalCount, setGlobalCount] = useState(12480);
  const [recentBlessing, setRecentBlessing] = useState("Soumyadeep from Kolkata lit an Akhand Diya ✨");
  const [showPetalShower, setShowPetalShower] = useState(false);
  const [activeWish, setActiveWish] = useState("Peace & Prosperity");

  // Simulated live community increments
  useEffect(() => {
    const locations = [
      "Kolkata", "Mumbai", "Bengaluru", "Delhi", "Hyderabad",
      "Pune", "Chennai", "London", "San Jose", "Toronto", "Singapore"
    ];
    const wishes = [
      "offered a prayer for family health 🪔",
      "lit a Diya for peace & light ✨",
      "celebrated with green fireworks 🎆",
      "made a sacred rangoli 🌺",
      "wished everyone a prosperous Diwali 💛"
    ];

    const timer = setInterval(() => {
      setGlobalCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      const loc = locations[Math.floor(Math.random() * locations.length)];
      const wish = wishes[Math.floor(Math.random() * wishes.length)];
      setRecentBlessing(`Someone in ${loc} ${wish}`);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const triggerFlowerShower = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#ef4444', '#dc2626', '#f43f5e'],
      shapes: ['circle'],
      scalar: 1.2,
      ticks: 120,
    });
  };

  const handleToggleDiya = (id) => {
    setDiyas(prev => prev.map(diya => {
      if (diya.id === id) {
        const nextState = !diya.lit;
        if (nextState) {
          playDiyaLightSound();
          triggerFlowerShower();
          setGlobalCount(c => c + 1);
        }
        return { ...diya, lit: nextState };
      }
      return diya;
    }));
  };

  const handleLightAll = () => {
    playDiyaLightSound();
    triggerFlowerShower();
    setDiyas(prev => prev.map(d => ({ ...d, lit: true })));
    setGlobalCount(c => c + 5);
  };

  const handleReset = () => {
    setDiyas(prev => prev.map((d, i) => ({ ...d, lit: i === 0 })));
  };

  const litCount = diyas.filter(d => d.lit).length;

  return (
    <section className="relative w-full py-8 px-4 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Floating Sky Lanterns in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute bottom-10 left-[15%] w-7 h-10 bg-amber-500/80 rounded-t-lg rounded-b-sm blur-[1px] shadow-[0_0_15px_#f59e0b] animate-float-slow" />
        <div className="absolute bottom-20 right-[18%] w-6 h-9 bg-orange-500/80 rounded-t-lg rounded-b-sm blur-[1px] shadow-[0_0_15px_#f97316] animate-float-reverse" />
        <div className="absolute bottom-4 left-[35%] w-5 h-8 bg-amber-400/70 rounded-t-lg rounded-b-sm blur-[1px] shadow-[0_0_12px_#fbbf24] animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-16 right-[38%] w-8 h-11 bg-red-500/70 rounded-t-lg rounded-b-sm blur-[1px] shadow-[0_0_18px_#ef4444] animate-float-reverse" style={{ animationDelay: '3.5s' }} />
      </div>

      {/* Hero Headings */}
      <div className="text-center max-w-3xl mx-auto mb-6 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span>Tamaso Mā Jyotir Gamaya • Lead Us From Darkness to Light</span>
        </div>
        
        <h2 className="font-festive text-3xl sm:text-5xl font-extrabold text-gold-shimmer tracking-wide leading-tight">
          Sacred Digital Aarti & Diya
        </h2>
        
        <p className="mt-2 text-sm sm:text-base text-amber-100/75 max-w-2xl mx-auto">
          Touch or click on any diya to ignite its sacred flame. Light the Akhand Jyoti, spread warmth to your loved ones, and join thousands across the globe in illuminating the darkness.
        </p>
      </div>

      {/* Main Aarti Thali & Diya Display */}
      <div className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center p-4">
        
        {/* Ambient Warm Altar Bloom */}
        <div 
          className="absolute inset-4 rounded-full transition-all duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(245, 158, 11, ${0.15 + litCount * 0.08}) 0%, rgba(220, 38, 38, ${0.05 + litCount * 0.03}) 50%, transparent 70%)`,
            filter: `blur(${15 + litCount * 5}px)`
          }}
        />

        {/* Brass / Bronze Aarti Thali Plate */}
        <div className="relative w-full h-full rounded-full border-4 border-amber-600/60 bg-gradient-to-br from-[#2a1708] via-[#1a0f05] to-[#0d0703] shadow-[0_0_50px_rgba(245,158,11,0.25)] flex items-center justify-center p-6">
          
          {/* Ornate Concentric Rings & Mandala Engraving */}
          <div className="absolute inset-4 rounded-full border border-amber-500/30 border-dashed animate-spin-slow pointer-events-none" />
          <div className="absolute inset-10 rounded-full border border-amber-400/20 pointer-events-none" />
          <div className="absolute inset-16 rounded-full border-2 border-amber-500/20 border-dotted pointer-events-none" />

          {/* Marigold Petal Floral Border Layer */}
          <div className="absolute inset-2 rounded-full pointer-events-none flex items-center justify-center opacity-80">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                style={{
                  transform: `rotate(${i * 22.5}deg) translateY(-145px)`,
                }}
              />
            ))}
          </div>

          {/* Render Diyas */}
          {diyas.map((diya) => {
            const isCenter = diya.id === 0;
            return (
              <div
                key={diya.id}
                onClick={() => handleToggleDiya(diya.id)}
                className={`absolute cursor-pointer group flex flex-col items-center justify-center transition-transform hover:scale-110 active:scale-95`}
                style={{
                  left: `${diya.x}%`,
                  top: `${diya.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Flame Particle & Glow */}
                <div className="relative h-16 sm:h-20 flex flex-col items-center justify-end">
                  {diya.lit ? (
                    <div className="relative flex flex-col items-center animate-flame-flicker">
                      {/* Aura Halo */}
                      <div className="absolute -inset-4 rounded-full bg-amber-400/30 blur-md pointer-events-none" />
                      
                      {/* Smoke Particle */}
                      <div className="w-1 h-3 bg-amber-200/20 rounded-full blur-[1px] -translate-y-3 animate-pulse" />

                      {/* Outer Flame (Orange-Red) */}
                      <div className="w-6 h-10 sm:w-8 sm:h-12 rounded-[50%_50%_35%_35%/60%_60%_40%_40%] bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-200 shadow-[0_0_20px_#f59e0b] relative flex items-center justify-center">
                        {/* Middle Flame (Yellow) */}
                        <div className="w-3.5 h-6 sm:w-5 sm:h-8 rounded-[50%_50%_35%_35%/60%_60%_40%_40%] bg-gradient-to-t from-amber-400 to-yellow-100 flex items-center justify-center">
                          {/* Inner Core (White/Blue) */}
                          <div className="w-1.5 h-3 sm:w-2 sm:h-4 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                        </div>
                      </div>

                      {/* Black Wick */}
                      <div className="w-1 h-2 bg-stone-900 rounded-sm -mt-0.5" />
                    </div>
                  ) : (
                    /* Unlit Wick */
                    <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="w-1 h-3 bg-stone-700 rounded-sm mb-1" />
                      <span className="text-[10px] text-amber-400/80 bg-black/60 px-1 rounded whitespace-nowrap">
                        Tap to Light
                      </span>
                    </div>
                  )}
                </div>

                {/* Diya Clay Base (Mitti / Gold Vessel) */}
                <div className={`relative ${isCenter ? 'w-24 sm:w-28' : 'w-16 sm:w-20'} transition-transform`}>
                  <svg viewBox="0 0 100 50" className="w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    <defs>
                      <linearGradient id={`diyaGrad-${diya.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        {isCenter ? (
                          <>
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#92400e" />
                          </>
                        ) : (
                          <>
                            <stop offset="0%" stopColor="#ca8a04" />
                            <stop offset="50%" stopColor="#9a3412" />
                            <stop offset="100%" stopColor="#451a03" />
                          </>
                        )}
                      </linearGradient>
                    </defs>
                    {/* Vessel Body */}
                    <path
                      d="M 10 20 Q 50 55 90 20 Q 95 15 90 15 Q 50 25 10 15 Q 5 15 10 20 Z"
                      fill={`url(#diyaGrad-${diya.id})`}
                      stroke="#fef08a"
                      strokeWidth={isCenter ? "1.5" : "0.75"}
                    />
                    {/* Oil Surface */}
                    <ellipse cx="50" cy="18" rx="35" ry="5" fill="#78350f" opacity="0.8" />
                    {/* Decorative Carving */}
                    {isCenter && (
                      <path
                        d="M 30 28 Q 50 38 70 28"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                  </svg>
                </div>

                {/* Diya Name Label */}
                <span className="mt-1 text-[11px] sm:text-xs font-medium text-amber-200/90 drop-shadow">
                  {diya.name.split(" ")[0]}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 z-10">
        <button
          onClick={handleLightAll}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold text-xs sm:text-sm hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
        >
          <Flame className="w-4 h-4 text-red-950 fill-red-950" />
          Light All 5 Diyas
        </button>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/40 text-xs sm:text-sm transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>

        <button
          onClick={onGoToFireworks}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 hover:bg-purple-900/40 text-xs sm:text-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          Go to Eco-Fireworks
        </button>

        <button
          onClick={onGoToGreeting}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-900/30 border border-amber-500/40 text-amber-200 hover:bg-amber-800/40 text-xs sm:text-sm transition-all"
        >
          <Share2 className="w-3.5 h-3.5 text-amber-400" />
          Send Greeting Card
        </button>
      </div>

      {/* Global Sacred Diya Counter & Community Wall */}
      <div className="w-full max-w-xl mt-8 festive-glass rounded-2xl p-4 sm:p-5 text-center z-10 border border-amber-500/30">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Live Global Community Diya Wall
        </div>

        <div className="font-festive text-3xl sm:text-4xl font-extrabold text-gold-gradient tracking-wider my-1">
          {globalCount.toLocaleString()}
        </div>

        <p className="text-xs text-amber-200/70">
          Digital Diyas ignited globally across 50+ countries for peace, joy, and prosperity
        </p>

        {/* Live ticker snippet */}
        <div className="mt-3 py-1.5 px-3 rounded-lg bg-black/40 border border-amber-500/20 text-xs text-amber-300/90 italic flex items-center justify-center gap-2">
          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          <span>{recentBlessing}</span>
        </div>
      </div>

    </section>
  );
}
