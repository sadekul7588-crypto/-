import React from 'react';
import { Smartphone, Monitor, Bell, Sparkles, Sprout, Volume2, VolumeX, ShieldCheck, Download } from 'lucide-react';

interface HeaderProps {
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenNotifications: () => void;
  onOpenAndroidInstall: () => void;
  isAudioActive: boolean;
  toggleAudio: () => void;
  activeTabTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileFrame,
  setIsMobileFrame,
  onOpenNotifications,
  onOpenAndroidInstall,
  isAudioActive,
  toggleAudio,
  activeTabTitle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md border-b border-emerald-900/40">
      {/* Android Top Status Bar Simulation (only in mobile frame mode) */}
      {isMobileFrame && (
        <div className="flex items-center justify-between px-5 pt-1.5 pb-0.5 text-[11px] font-mono tracking-tight text-emerald-100 bg-emerald-900/60 select-none">
          <span className="font-semibold">১০:৪৫</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px]">৪জি</span>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/>
            </svg>
            <span className="text-[10px] font-bold">৯৬%</span>
          </div>
        </div>
      )}

      {/* Main App Bar */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center text-emerald-950 shadow-inner">
            <Sprout className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                সাদেকুল এগ্রো বাংলা
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] bg-emerald-700/80 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-600/50">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                কৃষি সহায়ক
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/90 hidden xs:block">
              {activeTabTitle ? `চলতি পাতা: ${activeTabTitle}` : 'কৃষকের আধুনিক ডিজিটাল সাথী'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Audio helper toggle */}
          <button
            onClick={toggleAudio}
            title={isAudioActive ? 'ভয়েস সহায়িকা বন্ধ করুন' : 'ভয়েস সহায়িকা চালু করুন'}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium ${
              isAudioActive 
                ? 'bg-amber-400 text-stone-950 font-semibold shadow-sm' 
                : 'text-emerald-100 hover:bg-emerald-700/70'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-emerald-200" />}
            <span className="hidden md:inline">{isAudioActive ? 'ভয়েস চালু' : 'ভয়েস'}</span>
          </button>

          {/* Android App Install Button */}
          <button
            onClick={onOpenAndroidInstall}
            title="অ্যান্ড্রয়েড ফোনে অ্যাপটি ইনস্টল করুন"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden xs:inline">ইনস্টল</span>
          </button>

          {/* Daily Alert Bell */}
          <button
            onClick={onOpenNotifications}
            title="কৃষি বুলেটিন ও নোটিফিকেশন"
            className="p-2 text-emerald-100 hover:bg-emerald-700/70 rounded-lg transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-emerald-800 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
          </button>

          {/* Toggle Mobile Phone Frame vs Wide Web Responsive */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'ফুল স্ক্রিন ভিউতে যান' : 'মোবাইল স্ক্রিন ভিউতে দেখুন'}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-emerald-300" />
                <span>ফুলস্ক্রিন</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                <span>মোবাইল ভিউ</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
