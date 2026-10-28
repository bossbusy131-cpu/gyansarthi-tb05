import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Terminal, 
  Globe, 
  Rocket 
} from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col my-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-md">
              <svg viewBox="0 0 76 65" fill="currentColor" className="w-5 h-5">
                <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>Deploy to Vercel</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                  Ready
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This app is pre-configured for Vercel deployment with vercel.json &amp; serverless APIs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Readiness Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">vercel.json Configured</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                SPA rewrites, clean URLs, and static asset caching policies added.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Vercel Serverless APIs</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Full `/api` backend for key verification, TPStreams, and TargetBoard proxy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">11,000+ Lectures Embedded</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Pre-bundled in `/public/study-data.js` for high-speed CDN delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">PWA &amp; Offline Ready</span>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Includes manifest, service worker, and home screen install icons.
              </p>
            </div>
          </div>
        </div>

        {/* Deployment Methods */}
        <div className="space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Rocket className="w-4 h-4 text-blue-500" />
            <span>Choose Your Deployment Method</span>
          </h3>

          {/* Option 1: Git Push */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2 bg-gradient-to-r from-blue-50/40 via-transparent to-transparent dark:from-blue-950/20">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Method 1: Connect GitHub to Vercel (Recommended)</span>
              </span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold px-2 py-0.5 rounded-full">
                Auto-Deploys on Push
              </span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-300 pl-1 leading-relaxed">
              <li>Push this project codebase to your GitHub / GitLab repository.</li>
              <li>Go to <strong className="text-slate-900 dark:text-white">vercel.com</strong> and click <strong className="text-slate-900 dark:text-white">"Add New Project"</strong>.</li>
              <li>Select your repository. Vercel automatically selects <strong className="text-blue-600 dark:text-blue-400">Vite</strong> preset.</li>
              <li>Click <strong className="text-slate-900 dark:text-white">"Deploy"</strong>. Your website will be live in ~45 seconds!</li>
            </ol>
          </div>

          {/* Option 2: CLI */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-2 bg-slate-50 dark:bg-slate-800/40">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span>Method 2: Deploy instantly with Vercel CLI</span>
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-slate-900 text-slate-100 font-mono text-[11px] px-3 py-2 rounded-xl border border-slate-800">
                <code>npm i -g vercel &amp;&amp; vercel --prod</code>
                <button
                  onClick={() => copyToClipboard('npm i -g vercel && vercel --prod', 1)}
                  className="p-1 hover:text-white text-slate-400 transition-colors"
                  title="Copy command"
                >
                  {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Preset Settings Info */}
          <div className="p-3 bg-slate-100/70 dark:bg-slate-800/70 rounded-xl space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
            <div className="font-bold text-slate-800 dark:text-slate-200">Vercel Build Settings (Auto-Configured):</div>
            <div className="grid grid-cols-2 gap-2 text-slate-500 dark:text-slate-400 font-mono">
              <div>Framework: <span className="text-slate-900 dark:text-white font-semibold">Vite</span></div>
              <div>Build Command: <span className="text-slate-900 dark:text-white font-semibold">npm run build</span></div>
              <div>Output Directory: <span className="text-slate-900 dark:text-white font-semibold">dist</span></div>
              <div>Node.js Version: <span className="text-slate-900 dark:text-white font-semibold">20.x or 22.x</span></div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-black font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <svg viewBox="0 0 76 65" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
            </svg>
            <span>Open Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
