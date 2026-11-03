import React from 'react';
import { FarmingTip } from '../types';
import { X, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';

interface TipDetailModalProps {
  tip: FarmingTip | null;
  onClose: () => void;
  onSpeakText?: (text: string) => void;
}

export const TipDetailModal: React.FC<TipDetailModalProps> = ({ tip, onClose, onSpeakText }) => {
  if (!tip) return null;

  const handleRead = () => {
    if (onSpeakText) {
      const text = `${tip.title}। ${tip.description}। প্রথম পদক্ষেপ: ${tip.steps[0]}`;
      onSpeakText(text);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95"
      >
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold bg-emerald-800 text-amber-300 px-2.5 py-0.5 rounded-lg border border-emerald-700">
              {tip.category} · {tip.season}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onSpeakText && (
              <button
                onClick={handleRead}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                title="পড়ে শোনান"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          <div>
            <h3 className="text-base font-bold text-stone-900 leading-snug">
              {tip.title}
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {tip.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-emerald-950 mb-2">
              মাঠের সঠিক বাস্তবায়ন ও ধাপসমূহ:
            </h4>
            <ul className="space-y-2">
              {tip.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-stone-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-3 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl transition-colors"
          >
            বুঝেছি, বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
