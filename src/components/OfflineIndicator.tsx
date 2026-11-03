import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff, CheckCircle2 } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] px-3.5 py-2 rounded-xl bg-amber-600/95 text-white text-xs font-medium shadow-lg backdrop-blur-xs flex items-center justify-between gap-2.5 animate-in slide-in-from-top-2 border border-amber-400/40">
      <div className="flex items-center gap-2">
        <WifiOff className="w-4 h-4 shrink-0 text-amber-200" />
        <span className="leading-tight">
          অফলাইন মোড — ইন্টারনেটের অনুপস্থিতিতেও সকল সংরক্ষিত ফসল ও পরামর্শ সচল রয়েছে।
        </span>
      </div>
      <span className="w-2 h-2 rounded-full bg-white animate-ping shrink-0" />
    </div>
  );
};
