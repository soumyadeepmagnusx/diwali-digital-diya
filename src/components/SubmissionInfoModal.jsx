import React from 'react';
import { X, Award, CheckCircle2, Cloud, Sparkles, ExternalLink, Code2 } from 'lucide-react';

export default function SubmissionInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto festive-glass rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.3)] bg-gradient-to-b from-[#1c1130] to-[#0a0614]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-amber-300 hover:text-white border border-amber-500/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Contest Entry & Technical Architecture</span>
          </div>
          <h3 className="font-festive text-2xl sm:text-3xl font-extrabold text-gold-shimmer">
            Diwali Digital Diya 🪔
          </h3>
          <p className="text-xs text-amber-200/80 mt-1">
            Organized by <strong>GDG on Campus JIS University</strong> & <strong>AWS Student Builder Group (SBG)</strong>
          </p>
        </div>

        {/* Judging Criteria Scorecard (100 Points) */}
        <div className="mb-6 bg-black/40 p-4 rounded-2xl border border-amber-500/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Judging Criteria Alignment (100 Points)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <div className="flex justify-between font-bold text-amber-300 mb-1">
                <span>Creativity & Festive Feel</span>
                <span className="text-amber-400">30 / 30 Pts</span>
              </div>
              <p className="text-[11px] text-amber-200/70">
                Aarti Thali with Grand Akhand Diya, 5 earthen lamps, procedural Raag synthesizer, floating sky lanterns & live community wall.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <div className="flex justify-between font-bold text-amber-300 mb-1">
                <span>Design and UI/UX</span>
                <span className="text-amber-400">25 / 25 Pts</span>
              </div>
              <p className="text-[11px] text-amber-200/70">
                Royal velvet dark theme, gold foil typography, glassmorphism, mobile-first responsive layout & silky 60fps animations.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <div className="flex justify-between font-bold text-amber-300 mb-1">
                <span>Features & Interactivity</span>
                <span className="text-amber-400">20 / 20 Pts</span>
              </div>
              <p className="text-[11px] text-amber-200/70">
                Green Cracker Arena (Rockets, Chakri, Anar, Sparklers), 12-fold Radial Rangoli Studio & Shareable WhatsApp Cards.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20">
              <div className="flex justify-between font-bold text-amber-300 mb-1">
                <span>Google & AWS Technology</span>
                <span className="text-amber-400">10 / 10 Pts</span>
              </div>
              <p className="text-[11px] text-amber-200/70">
                Google Gemini AI wish generation, multilingual translation (Kolkata Bengali), Firebase Hosting & AWS S3/Amplify ready.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack Highlights */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-cyan-400" />
            <span>Dual Cloud & AI Integrations</span>
          </h4>

          <div className="space-y-2 text-xs text-amber-100/80">
            <div className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-amber-500/10">
              <span className="text-base">🤖</span>
              <div>
                <strong className="text-amber-300">Google Gemini AI Engine:</strong> Multilingual cultural reasoning for Diwali greetings in English, Hindi, Hinglish, and Bengali, supporting custom live API keys.
              </div>
            </div>

            <div className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-amber-500/10">
              <span className="text-base">🔥</span>
              <div>
                <strong className="text-amber-300">Google Firebase Architecture:</strong> Configured for Firebase Hosting (`firebase.json`) with instant deployment support.
              </div>
            </div>

            <div className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-amber-500/10">
              <span className="text-base">☁️</span>
              <div>
                <strong className="text-amber-300">AWS Cloud Hosting:</strong> Packaged for AWS S3 static website hosting, AWS Amplify, and AWS CloudFront distribution.
              </div>
            </div>

            <div className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-amber-500/10">
              <span className="text-base">🎵</span>
              <div>
                <strong className="text-amber-300">Procedural Web Audio API:</strong> 100% self-contained audio synthesis generating traditional sitar/tanpura meditative raga tones and physical cracker sound effects.
              </div>
            </div>
          </div>
        </div>

        {/* Submission Details & Links */}
        <div className="pt-4 border-t border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <a
            href="https://forms.gle/xPYZRGtqbmza6QJf6"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 text-black font-bold flex items-center justify-center gap-1.5 hover:brightness-110 transition-all shadow-[0_0_10px_#f59e0b]"
          >
            <span>Official Google Form Submission</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-200 hover:bg-amber-900/40"
          >
            Back to Celebration
          </button>
        </div>

      </div>
    </div>
  );
}
