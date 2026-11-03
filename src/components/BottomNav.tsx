import React from 'react';
import { Home, Wheat, Stethoscope, CloudSun, Calculator } from 'lucide-react';

export type TabKey = 'home' | 'crops' | 'diseases' | 'weather' | 'tools';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  isMobileFrame?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, isMobileFrame }) => {
  const tabs = [
    { id: 'home', label: 'হোম', icon: Home },
    { id: 'crops', label: 'ফসল চাষ', icon: Wheat },
    { id: 'diseases', label: 'রোগ ও পোকা', icon: Stethoscope },
    { id: 'weather', label: 'আবহাওয়া', icon: CloudSun },
    { id: 'tools', label: 'হিসাব ও সেবা', icon: Calculator }
  ] as const;

  return (
    <nav
      className={`${
        isMobileFrame ? 'sticky bottom-0 left-0 right-0' : 'fixed bottom-0 left-0 right-0'
      } z-40 bg-white/95 backdrop-blur-md border-t border-stone-200/90 shadow-lg`}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center min-h-[48px] py-1 transition-all select-none relative group"
            >
              {/* Active pill background */}
              <div
                className={`flex items-center justify-center w-12 h-7 rounded-full transition-all ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-800 font-semibold'
                    : 'text-stone-500 group-hover:text-emerald-700'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-0.5 whitespace-nowrap transition-colors ${
                  isActive ? 'text-emerald-900 font-bold' : 'text-stone-600'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
