import React, { useState } from 'react';
import { Wand2, Sparkles, Copy, Check, Send, Key, RefreshCw, Heart } from 'lucide-react';
import { generateFestiveWish } from '../utils/geminiAi';
import confetti from 'canvas-confetti';

export default function AiWishCrafter({ onSelectForGreetingCard }) {
  const [sender, setSender] = useState('Soumyadeep');
  const [recipient, setRecipient] = useState('Priya');
  const [relation, setRelation] = useState('friends');
  const [language, setLanguage] = useState('english');
  const [tone, setTone] = useState('joyful');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedWish, setGeneratedWish] = useState({
    headline: "Sparklers, Smiles & Endless Festivities for Priya!",
    verse: "May your Diwali be as bright as a sky full of fireworks, as sweet as a box of Kaju Katli, and as colorful as the grandest rangoli! Here's to burning away all stress and lighting up new dreams, laughter, and crazy adventures together.",
    translation: "Celebrate with zero noise pollution and 100% pure festive joy!",
    personalNote: "Dearest Priya, may the glow of this digital diya warm your heart always. With fondest love & blessings, from Soumyadeep. 🪔✨",
    themeTag: "Joyous Festive Vibe",
    modelUsed: "Google Gemini AI Engine"
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateFestiveWish({
        sender: sender.trim() || 'A Well-Wisher',
        recipient: recipient.trim() || 'Dear One',
        relation,
        tone,
        language,
        apiKey
      });
      setGeneratedWish(result);

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#fbbf24', '#ec4899', '#38bdf8']
      });
    } catch (err) {
      console.error("Wish generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedWish) return;
    const fullText = `🪔 ${generatedWish.headline}\n\n${generatedWish.verse}\n\n${generatedWish.personalNote}\n\n✨ Celebrate Diwali with Digital Diya: ${window.location.origin}${window.location.pathname}?to=${encodeURIComponent(recipient)}&from=${encodeURIComponent(sender)}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToCard = () => {
    if (onSelectForGreetingCard && generatedWish) {
      onSelectForGreetingCard({
        to: recipient,
        from: sender,
        message: generatedWish.verse,
        headline: generatedWish.headline,
        note: generatedWish.personalNote
      });
    }
  };

  return (
    <section className="w-full py-8 px-4 flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
          <Wand2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Google Gemini AI • Build With AI</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-gold-shimmer">
          Gemini AI Diwali Wish Studio
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 mt-1">
          Craft personalized, poetic, and heartwarming Diwali greetings in English, Hindi, Hinglish, or Bengali with Google Gemini AI.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Controls (5 cols) */}
        <div className="lg:col-span-5 festive-glass rounded-2xl p-5 border border-amber-500/30 flex flex-col gap-4">
          
          <h3 className="font-festive text-lg font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Customize Your Blessing</span>
          </h3>

          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-amber-200 block mb-1">
                From (Your Name)
              </label>
              <input
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-amber-200 block mb-1">
                To (Recipient)
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Recipient Name"
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Relationship */}
          <div>
            <label className="text-xs font-medium text-amber-200 block mb-1">
              Relationship
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'family', label: 'Family & Elders' },
                { id: 'friends', label: 'Friends & Peers' },
                { id: 'spiritual', label: 'Spiritual / Vedic' },
                { id: 'professional', label: 'Mentor / Team' }
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRelation(r.id)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-left transition-all ${
                    relation === r.id
                      ? 'bg-amber-500/25 border-amber-400 text-amber-200 font-bold'
                      : 'bg-black/30 border-amber-500/15 text-gray-400 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selector (Featuring Bengali for Kolkata JIS University!) */}
          <div>
            <label className="text-xs font-medium text-amber-200 block mb-1">
              Language
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: 'english', label: 'English' },
                { id: 'hindi', label: 'हिन्दी' },
                { id: 'hinglish', label: 'Hinglish' },
                { id: 'bengali', label: 'বাংলা (Kolkata)' }
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLanguage(l.id)}
                  className={`py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    language === l.id
                      ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-[0_0_8px_#f59e0b]'
                      : 'bg-black/30 border-amber-500/20 text-gray-300 hover:text-amber-200'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Gemini Key toggle */}
          <div>
            <button
              onClick={() => setShowKeyInput(s => !s)}
              className="text-[11px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2"
            >
              <Key className="w-3 h-3" />
              <span>{showKeyInput ? 'Hide Gemini API Key' : 'Have a Google Gemini API Key? (Optional)'}</span>
            </button>
            {showKeyInput && (
              <div className="mt-2 p-2.5 rounded-xl bg-black/60 border border-amber-500/20 text-[11px] text-amber-200/80">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste AI Studio Key: AIzaSy..."
                  className="w-full px-2.5 py-1.5 rounded bg-black/50 border border-amber-500/30 text-xs text-white focus:outline-none mb-1"
                />
                <span className="text-[10px] text-gray-400">
                  Optional. Without a key, our built-in Gemini synthesis engine handles generation seamlessly!
                </span>
              </div>
            )}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-black font-extrabold text-sm hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Crafting with Gemini AI...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-black" />
                <span>Craft Greeting with Gemini AI</span>
              </>
            )}
          </button>

        </div>

        {/* Right Output Card (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          
          <div className="relative festive-glass rounded-2xl p-6 border-2 border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-gradient-to-br from-[#1a1233] to-[#0c0820]">
            
            {/* Top Ornamental Ribbon */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/25 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪔</span>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-bold block">
                    {generatedWish.themeTag || "Festive Diwali Blessing"}
                  </span>
                  <span className="text-xs text-amber-200/60">
                    To: {recipient} • From: {sender}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 font-medium">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{generatedWish.modelUsed}</span>
              </div>
            </div>

            {/* Headline */}
            <h4 className="font-festive text-xl sm:text-2xl font-bold text-gold-shimmer mb-3 leading-snug">
              {generatedWish.headline}
            </h4>

            {/* Verse */}
            <div className="bg-black/30 p-4 rounded-xl border border-amber-500/20 mb-3">
              <p className="text-sm sm:text-base text-amber-100/90 whitespace-pre-line leading-relaxed font-normal">
                {generatedWish.verse}
              </p>
            </div>

            {/* Translation / Meaning if non-english */}
            {generatedWish.translation && (
              <div className="mb-3 px-3 py-2 rounded-lg bg-amber-950/30 border border-amber-500/15 text-xs text-amber-200/80 italic">
                <span className="font-semibold text-amber-300 not-italic">Meaning: </span>
                {generatedWish.translation}
              </div>
            )}

            {/* Personal Note */}
            <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mt-2 pt-2 border-t border-amber-500/20">
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 shrink-0" />
              <span>{generatedWish.personalNote}</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-2 px-3 rounded-xl bg-black/40 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-amber-950/40 transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Wish Text'}</span>
            </button>

            <button
              onClick={handleApplyToCard}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black text-xs font-bold hover:brightness-110 active:scale-95 transition-all shadow-[0_0_12px_rgba(245,158,11,0.4)] flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Use in Shareable Card</span>
            </button>
          </div>

        </div>

      </div>

    </section>
  );
}
