import React from 'react';
import { Heart, Sparkles, ExternalLink, Award } from 'lucide-react';

export default function Footer({ onOpenInfoModal }) {
  return (
    <footer className="w-full bg-[#05030d] border-t border-amber-500/20 py-10 px-4 mt-16 text-center text-amber-200/70 text-xs relative overflow-hidden">
      
      {/* Decorative Golden Garland Line */}
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 mb-6 opacity-60">
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <span className="text-amber-400 text-sm">🪔 🌸 🪔 🌸 🪔</span>
        <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        
        {/* Sacred Sanskrit Shloka */}
        <p className="font-sanskrit text-amber-300 text-sm sm:text-base tracking-wider max-w-xl mx-auto opacity-90">
          शुभं करोति कल्याणमारोग्यं धनसंपदा । शत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तुते ॥
        </p>
        <p className="text-[11px] text-amber-200/60 -mt-2">
          "Salutations to the light of the sacred lamp which brings auspiciousness, health, and prosperity."
        </p>

        {/* Organizer badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          <a
            href="https://gdg.community.dev/gdg-on-campus-jis-university-kolkata-india/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 hover:border-amber-400 transition-colors"
          >
            <span>GDG on Campus JIS University</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>

          <a
            href="https://www.meetup.com/aws-sbg-at-jis-university-agarpara-campus/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 hover:bg-amber-900/50 hover:border-amber-400 transition-colors"
          >
            <span>AWS Student Builder Group JISU</span>
            <ExternalLink className="w-3 h-3 text-amber-400" />
          </a>

          <button
            onClick={onOpenInfoModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/50 transition-colors"
          >
            <Award className="w-3 h-3 text-yellow-400" />
            <span>Contest Info & Tech Stack</span>
          </button>
        </div>

        {/* Submission Notice */}
        <p className="text-[11px] text-amber-200/50 mt-2">
          Built with ❤️ & AI for the <strong>Diwali Digital Diya Hackathon (Nov 2026)</strong>. Powered by Google Gemini AI, Firebase, AWS Cloud & Web Audio.
        </p>

      </div>
    </footer>
  );
}
