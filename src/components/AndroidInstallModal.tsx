import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Smartphone, 
  Download, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Share2, 
  PlusSquare,
  Layers
} from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      const result = await install();
      if (result) {
        setInstallSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center">
              <img
                src="/icon.svg"
                alt="সাদেকুল এগ্রো লোগো"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-bold text-white">সাদেকুল এগ্রো বাংলা</h3>
                <span className="text-[10px] font-semibold bg-emerald-700/80 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-600/50">
                  অ্যান্ড্রয়েড রেডি
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 mt-0.5">
                ফোনে কোনো স্টোরেজ নষ্ট না করে সরাসরি ইনস্টল করুন
              </p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-stone-700">
          {isInstalled || installSuccess ? (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-emerald-900 text-base">
                অ্যাপটি আপনার ফোনে সফলভাবে ইনস্টল হয়েছে!
              </h4>
              <p className="text-xs text-emerald-700 leading-relaxed">
                আপনার ফোনের অ্যাপস মেন্যু বা হোম স্ক্রিন থেকে যেকোনো সময় সাদেকুল এগ্রো বাংলা ওপেন করতে পারবেন।
              </p>
            </div>
          ) : (
            <>
              {/* Native prompt button if available */}
              {isInstallable && (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Download className="w-5 h-5 stroke-[2.5]" />
                  <span>এখনই অ্যান্ড্রয়েড ফোনে ইনস্টল করুন</span>
                </button>
              )}

              {/* Android Manual Install Steps */}
              <div className="space-y-3 bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80">
                <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  অ্যান্ড্রয়েড ফোনে ইনস্টল করার সহজ নিয়ম:
                </h4>

                <div className="space-y-2 text-xs text-stone-600">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ১
                    </span>
                    <p className="leading-relaxed">
                      আপনার ব্রাউজারের (Chrome / Samsung Internet) উপরের ডানদিকের <strong>তিনটি ডট (⋮)</strong> মেন্যুতে ক্লিক করুন।
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ২
                    </span>
                    <p className="leading-relaxed">
                      তালিকা থেকে <strong>'অ্যাপ ইনস্টল করুন' (Install App)</strong> অথবা <strong>'হোম স্ক্রিনে যোগ করুন' (Add to Home screen)</strong> অপশনটিতে চাপুন।
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ৩
                    </span>
                    <p className="leading-relaxed">
                      কনফার্মেশন আসলে <strong>'ইনস্টল' (Install)</strong> বাটনে চাপ দিন। কয়েক সেকেন্ডের মধ্যেই অ্যাপটি পূর্ণাঙ্গ অ্যান্ড্রয়েড অ্যাপ হিসেবে আপনার ফোনে সেভ হয়ে যাবে।
                    </p>
                  </div>
                </div>
              </div>

              {/* iOS Alternative instruction (if viewed on iPhone) */}
              {isIOS && (
                <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-1.5 text-xs">
                  <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-sky-600" />
                    আইফোন (iOS) এ যুক্ত করার নিয়ম:
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    সাফারি ব্রাউজারের নিচে <strong>Share (শেয়ার)</strong> আইকনে চাপুন এবং নিচে স্ক্রোল করে <strong>'Add to Home Screen'</strong> নির্বাচন করুন।
                  </p>
                </div>
              )}

              {/* Android Features Highlights */}
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-stone-800 font-medium">অফলাইনেও তথ্য কার্যকর</span>
                </div>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-stone-800 font-medium">মাত্র ০.৫ মেগাবাইট সাইজ</span>
                </div>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-stone-800 font-medium">ফুলস্ক্রিন অ্যাপ ইন্টারফেস</span>
                </div>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span className="text-stone-800 font-medium">বাংলায় সব কৃষি সেবা</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            অ্যান্ড্রয়েড ১২+ এবং যেকোনো স্মার্টফোনে প্রযোজ্য
          </span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
