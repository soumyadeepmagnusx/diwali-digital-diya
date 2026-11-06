import React, { useState } from 'react';
import { X, Cloud, Cpu, Server, Shield, Check, Copy, ExternalLink, Zap, Terminal } from 'lucide-react';

export default function CloudArchitectureModal({ isOpen, onClose }) {
  const [activeCloud, setActiveCloud] = useState('aws'); // 'aws' or 'google'
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const awsCfnSnippet = `AWSTemplateFormatVersion: '2010-09-09'
Description: 'Diwali Digital Diya AWS S3 + CloudFront Global CDN Stack'
Resources:
  DiwaliBucket:
    Type: AWS::S3::Bucket
    Properties:
      WebsiteConfiguration:
        IndexDocument: index.html
  DiwaliCDN:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Enabled: true
        HttpVersion: http2and3
        PriceClass: PriceClass_All
        ViewerProtocolPolicy: redirect-to-https`;

  const geminiPayloadSnippet = `POST /v1beta/models/gemini-1.5-flash:generateContent
Host: generativelanguage.googleapis.com
Content-Type: application/json

{
  "contents": [{
    "parts": [{ "text": "Craft Diwali blessing from Soumyadeep to Priya (Bengali, Kolkata context)..." }]
  }],
  "systemInstruction": {
    "parts": [{ "text": "Cultural scholar & poet for Deepavali festival." }]
  },
  "generationConfig": {
    "responseMimeType": "application/json",
    "temperature": 0.8
  }
}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto festive-glass rounded-3xl p-6 sm:p-8 border-2 border-amber-500/50 shadow-[0_0_60px_rgba(245,158,11,0.35)] bg-gradient-to-b from-[#1b1030] to-[#090514]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-amber-300 hover:text-white border border-amber-500/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
            <Cloud className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dual Cloud & Generative AI Architecture</span>
          </div>
          <h3 className="font-festive text-2xl sm:text-3xl font-extrabold text-gold-shimmer">
            AWS & Google Cloud Architecture
          </h3>
          <p className="text-xs text-amber-200/80 mt-1 max-w-xl mx-auto">
            Engineered specifically to fulfill the 10-Point Bonus Rubric for GDG on Campus JIS University & AWS Student Builder Group.
          </p>
        </div>

        {/* Switcher Tabs: AWS vs Google Cloud */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={() => setActiveCloud('aws')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
              activeCloud === 'aws'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black border-amber-400 shadow-[0_0_15px_#f97316]'
                : 'bg-black/40 text-amber-200 border-amber-500/20 hover:bg-amber-950/40'
            }`}
          >
            <span>☁️ AWS Cloud Infrastructure</span>
            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded text-white font-mono">AWS SBG</span>
          </button>

          <button
            onClick={() => setActiveCloud('google')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
              activeCloud === 'google'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-blue-400 shadow-[0_0_15px_#3b82f6]'
                : 'bg-black/40 text-amber-200 border-amber-500/20 hover:bg-amber-950/40'
            }`}
          >
            <span>🤖 Google Gemini & Firebase</span>
            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded text-white font-mono">GDG JISU</span>
          </button>
        </div>

        {/* AWS TAB CONTENT */}
        {activeCloud === 'aws' && (
          <div className="space-y-4 text-xs">
            {/* Visual Architecture Flow */}
            <div className="bg-black/40 p-4 rounded-2xl border border-amber-500/25">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>AWS Serverless Pipeline Diagram</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-stone-900/80 border border-amber-500/30 flex flex-col items-center">
                  <span className="text-xl mb-1">📱</span>
                  <span className="font-bold text-amber-300">Client / Mobile</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">HTTPS & Web Audio</span>
                </div>

                <div className="p-2.5 rounded-xl bg-orange-950/50 border border-orange-500/40 flex flex-col items-center">
                  <span className="text-xl mb-1">⚡</span>
                  <span className="font-bold text-orange-300">AWS CloudFront</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Global Edge CDN (ap-south-1)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 flex flex-col items-center">
                  <span className="text-xl mb-1">🪣</span>
                  <span className="font-bold text-amber-300">AWS S3 Bucket</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Static Website Hosting</span>
                </div>

                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-500/40 flex flex-col items-center">
                  <span className="text-xl mb-1">🚀</span>
                  <span className="font-bold text-purple-300">AWS Amplify</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Git CI/CD Pipeline</span>
                </div>
              </div>
            </div>

            {/* AWS Code Artifacts Included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-300">aws-cloudformation.yaml</span>
                  <button
                    onClick={() => handleCopy(awsCfnSnippet)}
                    className="text-[10px] text-amber-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-amber-100/70 mb-2">
                  1-Click Infrastructure-as-Code deploying S3 static hosting, CloudFront CDN, and public bucket policies.
                </p>
                <div className="p-2 rounded bg-stone-950 text-[10px] font-mono text-gray-300 overflow-x-auto max-h-24">
                  {awsCfnSnippet}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-amber-500/20">
                <div className="font-bold text-amber-300 mb-1">amplify.yml & buildspec.yml</div>
                <p className="text-[11px] text-amber-100/70 mb-2">
                  Native AWS CodeBuild and AWS Amplify specifications that automatically build and deploy every git push.
                </p>
                <div className="p-2 rounded bg-stone-950 text-[10px] font-mono text-gray-300">
                  aws s3 sync dist/ s3://diwali-digital-diya --delete
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GOOGLE CLOUD TAB CONTENT */}
        {activeCloud === 'google' && (
          <div className="space-y-4 text-xs">
            {/* Visual Google Tech Flow */}
            <div className="bg-black/40 p-4 rounded-2xl border border-blue-500/25">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" />
                <span>Google Developer Group (GDG) AI & Cloud Ecosystem</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-500/40 flex flex-col items-center">
                  <span className="text-xl mb-1">🧠</span>
                  <span className="font-bold text-blue-300">Gemini 1.5 Flash</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Multilingual Cultural AI</span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-500/40 flex flex-col items-center">
                  <span className="text-xl mb-1">🔥</span>
                  <span className="font-bold text-amber-300">Firebase Hosting</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">firebase.json Global Edge</span>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/40 flex flex-col items-center">
                  <span className="text-xl mb-1">⚡</span>
                  <span className="font-bold text-indigo-300">Zero-Latency Fallback</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">High Reliability Guardrail</span>
                </div>
              </div>
            </div>

            {/* Google Gemini Payload Viewer */}
            <div className="p-3 rounded-xl bg-black/40 border border-blue-500/20">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-blue-300">Gemini REST Endpoint & Payload Architecture</span>
                <button
                  onClick={() => handleCopy(geminiPayloadSnippet)}
                  className="text-[10px] text-blue-400 hover:text-white flex items-center gap-1"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] text-amber-100/70 mb-2">
                Sends structured JSON Schema queries to Google Gemini 1.5 Flash to synthesize culturally resonant Hindi, Bengali, Sanskrit, and English Diwali wishes.
              </p>
              <div className="p-2 rounded bg-stone-950 text-[10px] font-mono text-cyan-300 overflow-x-auto max-h-28">
                {geminiPayloadSnippet}
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-amber-500/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-amber-200/70 text-[11px]">
            Artifacts present in root repo: <code className="text-amber-400">aws-cloudformation.yaml</code>, <code className="text-amber-400">buildspec.yml</code>, <code className="text-amber-400">firebase.json</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold hover:brightness-110"
          >
            Close Architecture View
          </button>
        </div>

      </div>
    </div>
  );
}
