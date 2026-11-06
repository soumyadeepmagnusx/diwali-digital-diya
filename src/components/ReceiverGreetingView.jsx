import React, { useState, useEffect } from 'react';
import { Flame, Sparkles, Heart, ArrowRight, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playDiyaLightSound } from '../utils/audio';

export default function ReceiverGreetingView({ greetingData, onExploreWebsite }) {
  const { to, from, headline, message } = greetingData;
  const [isLit, setIsLit] = useState(false);

  useEffect(() => {
    // Initial celebration burst after 800ms
    const timer = setTimeout(() => {
      setIsLit(true);
      playDiyaLightSound();
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#38bdf8', '#ffffff']
      });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleManualLight = () => {
    if (!isLit) {
      setIsLit(true);
      playDiyaLightSound();
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#ef4444', '#10b981']
      });
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Floating lanterns background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-12 left-10 w-8 h-12 bg-amber-500/80 rounded-t-lg shadow-[0_0_20px_#f59e0b] animate-float-slow" />
        <div className="absolute top-20 right-14 w-7 h-10 bg-orange-500/80 rounded-t-lg shadow-[0_0_18px_#f97316] animate-float-reverse" />
        <div className="absolute bottom-16 left-1/4 w-6 h-9 bg-yellow-400/80 rounded-t-lg shadow-[0_0_15px_#facc15] animate-float-slow" />
      </div>

      <div className="w-full max-w-xl festive-glass rounded-3xl p-6 sm:p-10 border-2 border-amber-500/60 shadow-[0_0_60px_rgba(245,158,11,0.35)] bg-gradient-to-b from-[#24133b] via-[#120a21] to-[#07040d] text-center relative z-10">
        
        {/* Sacred Sanskrit Opening */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Auspicious Deepavali Greeting</span>
        </div>

        <p className="text-sm uppercase tracking-widest text-amber-300/80 font-medium">
          A Sacred Digital Diya Has Been Lit For
        </p>

        {/* Recipient Name */}
        <h1 className="font-festive text-3xl sm:text-5xl font-black text-gold-shimmer my-2 tracking-wide">
          {to || 'Beloved Friend'}
        </h1>

        {/* Central Dedicated Diya */}
        <div 
          onClick={handleManualLight}
          className="my-6 cursor-pointer group flex flex-col items-center justify-center"
        >
          <div className="relative h-20 flex flex-col items-center justify-end">
            {isLit ? (
              <div className="relative flex flex-col items-center animate-flame-flicker">
                <div className="absolute -inset-5 rounded-full bg-amber-400/40 blur-lg pointer-events-none" />
                <div className="w-8 h-14 rounded-[50%_50%_35%_35%/60%_60%_40%_40%] bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 shadow-[0_0_30px_#f59e0b] flex items-center justify-center">
                  <div className="w-2.5 h-5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
                </div>
                <div className="w-1.5 h-2 bg-stone-900 rounded-sm -mt-0.5" />
              </div>
            ) : (
              <div className="flex flex-col items-center animate-pulse">
                <div className="w-1.5 h-4 bg-stone-700 rounded-sm mb-1" />
                <span className="text-xs text-amber-400 bg-black/60 px-2 py-0.5 rounded-full border border-amber-500/30">
                  Tap to Ignite
                </span>
              </div>
            )}
          </div>

          {/* Diya Base */}
          <div className="w-28 sm:w-36 -mt-1 drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]">
            <svg viewBox="0 0 100 45" className="w-full">
              <path
                d="M 10 18 Q 50 50 90 18 Q 95 12 90 12 Q 50 22 10 12 Q 5 12 10 18 Z"
                fill="url(#goldClay)"
                stroke="#fef08a"
                strokeWidth="1.2"
              />
              <defs>
                <linearGradient id="goldClay" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="40%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h2 className="font-festive text-xl sm:text-2xl font-bold text-amber-300 mb-3">
          {headline || 'Happy & Prosperous Diwali!'}
        </h2>

        {/* Message */}
        <div className="bg-black/40 p-4 sm:p-5 rounded-2xl border border-amber-500/25 mb-6 text-sm sm:text-base text-amber-100/90 leading-relaxed whitespace-pre-line shadow-inner">
          {message || 'Wishing you infinite joy, prosperity, good health, and sweet celebrations this festive season!'}
        </div>

        {/* Concluding Blessing */}
        <div className="pt-3 border-t border-amber-500/25 flex flex-col items-center">
          <span className="text-xs text-amber-300/80 italic font-serif">Illuminated with deep affection by</span>
          <span className="font-festive text-xl sm:text-2xl font-bold text-gold-gradient mt-1">
            — {from || 'A Well-Wisher'}
          </span>
        </div>

        {/* Action: Open Full Experience & Create Own */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onExploreWebsite}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Celebrate & Send Your Own Greeting</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>

    </div>
  );
}
