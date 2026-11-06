import React from 'react';
import { Volume2, VolumeX, Music, Sparkles, Info, Flame, Palette, Wand2, Send } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  isMuted,
  onToggleMute,
  isPlayingAmbient,
  onToggleAmbient,
  onTriggerGrandFinale,
  onOpenInfoModal
}) {
  const navItems = [
    { id: 'altar', label: 'Diya Altar', icon: Flame },
    { id: 'fireworks', label: 'Eco-Fireworks', icon: Sparkles },
    { id: 'rangoli', label: 'Rangoli Studio', icon: Palette },
    { id: 'ai-crafter', label: 'Gemini AI Wish', icon: Wand2 },
    { id: 'greeting', label: 'Share Card', icon: Send },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#070614]/85 border-b border-amber-500/25 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand / Title & GDG-AWS Badge */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('altar')}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div className="relative">
              <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] group-hover:scale-110 transition-transform">
                🪔
              </span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
            </div>
            <div>
              <h1 className="font-festive text-xl sm:text-2xl font-bold tracking-wider text-gold-shimmer flex items-center gap-1.5">
                Diwali Digital Diya
              </h1>
              <div className="flex items-center gap-1.5 text-[10px] text-amber-300/80 font-medium tracking-tight">
                <span className="bg-amber-950/70 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                  GDG JIS University
                </span>
                <span>×</span>
                <span className="bg-amber-950/70 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                  AWS SBG
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-900/30 border border-transparent hover:border-amber-500/20'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-amber-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Controls: Audio, Grand Show, Info */}
        <div className="flex items-center gap-2">
          {/* Ambient Music Button */}
          <button
            onClick={onToggleAmbient}
            title={isPlayingAmbient ? "Pause Festive Music" : "Play Festive Raag Ambience"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all border ${
              isPlayingAmbient
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                : 'bg-black/40 text-gray-400 border-gray-700 hover:text-amber-300 hover:border-amber-500/30'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${isPlayingAmbient ? 'animate-bounce text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Music</span>
            {isPlayingAmbient && (
              <span className="flex gap-0.5 items-end h-3">
                <span className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                <span className="w-0.5 h-3 bg-amber-300 animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-amber-400 animate-pulse delay-150" />
              </span>
            )}
          </button>

          {/* SFX Mute/Unmute */}
          <button
            onClick={onToggleMute}
            title={isMuted ? "Unmute Sound Effects" : "Mute Sound Effects"}
            className={`p-1.5 rounded-full border transition-all ${
              isMuted
                ? 'bg-red-950/40 text-red-400 border-red-500/30'
                : 'bg-black/40 text-amber-400 border-amber-500/30 hover:bg-amber-950/40'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Grand Finale Spectacle Button */}
          <button
            onClick={onTriggerGrandFinale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-white hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.5)] transition-all animate-pulse"
            title="Launch Grand Fireworks & Aarti Spectacle"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span className="hidden sm:inline">Grand Finale</span>
          </button>

          {/* Info Modal Button */}
          <button
            onClick={onOpenInfoModal}
            title="Contest & Cloud Tech Architecture"
            className="p-1.5 rounded-full bg-amber-950/40 text-amber-300 border border-amber-500/30 hover:bg-amber-900/40 transition-colors"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
