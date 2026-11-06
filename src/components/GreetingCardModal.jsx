import React, { useState, useRef } from 'react';
import { Share2, Download, Copy, Check, Sparkles, Send, Flame, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playDiyaLightSound } from '../utils/audio';

export default function GreetingCardModal({ initialData, onClose }) {
  const [toName, setToName] = useState(initialData?.to || 'Priya');
  const [fromName, setFromName] = useState(initialData?.from || 'Soumyadeep');
  const [headline, setHeadline] = useState(initialData?.headline || 'Shubh Deepavali • Festival of Lights');
  const [message, setMessage] = useState(
    initialData?.message ||
    'May the radiant golden light of this Diya illuminate your life with health, happiness, peace, and abundance. Happy Diwali to you and your loved ones!'
  );
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  // Generate shareable link
  const generateShareUrl = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const params = new URLSearchParams({
      to: toName.trim(),
      from: fromName.trim(),
      h: headline.trim(),
      m: message.trim()
    });
    return `${origin}${pathname}?${params.toString()}`;
  };

  const handleCopyLink = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    playDiyaLightSound();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = generateShareUrl();
    const text = `🪔 *Diwali Digital Diya Greeting for ${toName}!* ✨\n\n"${headline}"\n\n${message}\n\nWarmest wishes from *${fromName}*.\n\nOpen your special interactive Diya greeting here:\n👉 ${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // Render Card to Canvas and Download as PNG
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350; // Instagram story / card aspect ratio
    const ctx = canvas.getContext('2d');

    // Background Velvet Dark Gradient
    const bgGrad = ctx.createRadialGradient(540, 675, 100, 540, 675, 750);
    bgGrad.addColorStop(0, '#2e123d');
    bgGrad.addColorStop(0.6, '#150921');
    bgGrad.addColorStop(1, '#07030d');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1350);

    // Golden Borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1000, 1270);
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 970, 1240);

    // Corner Ornaments
    const drawCorner = (x, y, angle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCorner(55, 55, 0);
    drawCorner(1025, 55, 0);
    drawCorner(55, 1295, 0);
    drawCorner(1025, 1295, 0);

    // Header Diya Icon & Text
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px serif';
    ctx.fillText('॥ शुभ दीपावली ॥', 540, 180);

    // Recipient Name
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 54px sans-serif';
    ctx.fillText(`Dearest ${toName}`, 540, 270);

    // Central Glowing Flame Drawing
    ctx.save();
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(540, 460, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.restore();

    // Diya Vessel in canvas
    ctx.fillStyle = '#92400e';
    ctx.beginPath();
    ctx.ellipse(540, 520, 110, 35, 0, 0, Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#fef08a';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Headline
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 44px serif';
    ctx.fillText(headline, 540, 680);

    // Multi-line message wrapping
    ctx.fillStyle = '#f8fafc';
    ctx.font = '32px sans-serif';
    const words = message.split(' ');
    let line = '';
    let y = 760;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 820 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 50;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Sender Concluding Line
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'italic bold 38px serif';
    ctx.fillText(`With Love & Warm Blessings,`, 540, 1120);
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 48px sans-serif';
    ctx.fillText(`— ${fromName}`, 540, 1180);

    // Footer Event watermark
    ctx.fillStyle = 'rgba(245, 158, 11, 0.7)';
    ctx.font = '22px sans-serif';
    ctx.fillText('Diwali Digital Diya • GDG on Campus JIS University & AWS SBG', 540, 1260);

    // Download
    const link = document.createElement('a');
    link.download = `diwali-greeting-${toName.toLowerCase()}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section className="w-full py-8 px-4 flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
          <Send className="w-3.5 h-3.5 text-amber-400" />
          <span>Personalized Festive Shareable Card</span>
        </div>
        <h2 className="font-festive text-3xl sm:text-4xl font-extrabold text-gold-shimmer">
          Share Your Digital Diya
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/70 mt-1">
          Generate an instant customized greeting link for WhatsApp or download an HD digital card image!
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Left: Live Interactive Card Preview (7 cols) */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={cardRef}
            className="w-full max-w-md festive-glass rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.3)] bg-gradient-to-b from-[#1c1033] via-[#100821] to-[#080312] relative overflow-hidden text-center"
          >
            {/* Golden Ornamental Corner accents */}
            <div className="absolute top-2 left-2 text-amber-400/40 text-xs">🪔</div>
            <div className="absolute top-2 right-2 text-amber-400/40 text-xs">🪔</div>
            <div className="absolute bottom-2 left-2 text-amber-400/40 text-xs">✨</div>
            <div className="absolute bottom-2 right-2 text-amber-400/40 text-xs">✨</div>

            {/* Sacred Top Title */}
            <span className="font-sanskrit text-amber-400/90 tracking-widest text-sm uppercase block mb-1">
              ॥ शुभ दीपावली ॥
            </span>

            {/* Recipient */}
            <h3 className="font-festive text-2xl sm:text-3xl font-extrabold text-gold-shimmer mt-1 mb-3">
              Dearest {toName}
            </h3>

            {/* Interactive Lit Diya in center of card */}
            <div className="my-3 flex flex-col items-center justify-center">
              <div className="relative animate-flame-flicker">
                {/* Flame Halo */}
                <div className="absolute -inset-3 bg-amber-400/30 rounded-full blur-md" />
                <div className="w-6 h-10 rounded-[50%_50%_35%_35%/60%_60%_40%_40%] bg-gradient-to-t from-orange-600 via-amber-400 to-yellow-100 shadow-[0_0_20px_#f59e0b] flex items-center justify-center">
                  <div className="w-2 h-4 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                </div>
              </div>
              {/* Clay base */}
              <div className="w-20 -mt-1">
                <svg viewBox="0 0 100 40" className="w-full">
                  <path d="M 10 15 Q 50 45 90 15 Q 95 10 90 10 Q 50 18 10 10 Z" fill="#92400e" stroke="#fbbf24" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Headline */}
            <h4 className="font-festive text-lg sm:text-xl font-bold text-amber-300 mb-2">
              {headline}
            </h4>

            {/* Message Body */}
            <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-amber-500/20 mb-4 whitespace-pre-line">
              {message}
            </p>

            {/* Sender Sign-off */}
            <div className="pt-2 border-t border-amber-500/25 flex flex-col items-center justify-center">
              <span className="text-xs text-amber-400/80 italic font-serif">Warmest regards & prayers,</span>
              <span className="font-festive text-lg font-bold text-gold-gradient mt-0.5">
                — {fromName}
              </span>
            </div>

            {/* Footer watermark */}
            <div className="mt-4 text-[10px] text-amber-300/50">
              Diwali Digital Diya • GDG on Campus JIS University
            </div>

          </div>
        </div>

        {/* Right: Customization & Sharing Controls (5 cols) */}
        <div className="lg:col-span-5 festive-glass rounded-2xl p-5 border border-amber-500/30 flex flex-col gap-4">
          
          <h3 className="font-festive text-lg font-bold text-amber-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Edit Card Details</span>
          </h3>

          <div>
            <label className="text-xs font-medium text-amber-200 block mb-1">
              To (Recipient Name)
            </label>
            <input
              type="text"
              value={toName}
              onChange={(e) => setToName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-amber-200 block mb-1">
              From (Your Name)
            </label>
            <input
              type="text"
              value={fromName}
              onChange={(e) => setFromName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-amber-200 block mb-1">
              Headline
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-amber-200 block mb-1">
              Personal Message
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-100 text-xs focus:border-amber-400 focus:outline-none resize-none"
            />
          </div>

          {/* Sharing Buttons */}
          <div className="flex flex-col gap-2 pt-2 border-t border-amber-500/20">
            
            {/* WhatsApp Share Button */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="w-full py-2 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 hover:bg-amber-900/40 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Interactive Greeting Link'}</span>
            </button>

            {/* Download HD Card PNG */}
            <button
              onClick={handleDownloadImage}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-[0_0_10px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download HD Card Image (PNG)</span>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
