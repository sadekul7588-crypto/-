import React from 'react';
import { TabKey } from './BottomNav';
import { CROPS_DATA } from '../data/cropsData';
import { FARMING_TIPS_DATA } from '../data/tipsData';
import { WEATHER_DATA } from '../data/weatherData';
import { MARKET_PRICES_DATA, HELPLINE_CONTACTS } from '../data/marketPricesData';
import { Crop, FarmingTip } from '../types';
import { 
  CloudSun, 
  Calculator, 
  Stethoscope, 
  Wheat, 
  PhoneCall, 
  TrendingUp, 
  ChevronRight, 
  Sparkles, 
  Droplets, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Volume2,
  Smartphone,
  Download
} from 'lucide-react';

interface HomeScreenProps {
  onNavigateTab: (tab: TabKey) => void;
  onSelectCrop: (crop: Crop) => void;
  onSelectTip: (tip: FarmingTip) => void;
  selectedCityId: string;
  onSpeakText?: (text: string) => void;
  onOpenAndroidInstall?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onSelectCrop,
  onSelectTip,
  selectedCityId,
  onSpeakText,
  onOpenAndroidInstall
}) => {
  const currentWeather = WEATHER_DATA.find((w) => w.id === selectedCityId) || WEATHER_DATA[0];
  const featuredCrops = CROPS_DATA.slice(0, 4);
  const urgentTips = FARMING_TIPS_DATA.slice(0, 3);
  const topMarketItems = MARKET_PRICES_DATA.slice(0, 3);
  const primaryHelpline = HELPLINE_CONTACTS[0];

  const handleReadHomeGreeting = () => {
    if (onSpeakText) {
      const speech = `স্বাগতম সাদেকুল এগ্রো বাংলায়। বর্তমান রবি ও বোরো মৌসুমে আপনার ফসলের সুস্বাস্থ্য ও অধিক ফলনের জন্য আমরা আছি আপনার পাশে। আজ ${currentWeather.nameBangla}-এ আবহাওয়া ${currentWeather.conditionBangla}, তাপমাত্রা ${currentWeather.currentTemp} ডিগ্রি সেলসিয়াস। ${currentWeather.sprayAdvice}`;
      onSpeakText(speech);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Hero Welcome Banner with real photography */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-emerald-700/20 bg-stone-900">
        <img
          src="/src/assets/images/hero_paddy_bangladesh_1793625516929.jpg"
          alt="Lush green paddy fields in Bangladesh"
          referrerPolicy="no-referrer"
          className="w-full h-44 sm:h-52 object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/60 to-transparent flex flex-col justify-end p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-amber-300">
              রবি ও বোরো মৌসুম · কার্তিক-অগ্রহায়ণ ১৪৩১
            </span>
            {onSpeakText && (
              <button
                onClick={handleReadHomeGreeting}
                className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
                title="পরামর্শ শুনুন"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white leading-tight mt-1">
            শুভ দিন! কৃষক ভাই ও বোনেরা
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 line-clamp-2 mt-0.5">
            উন্নত জাতের ধান ও সবজি চাষ, রোগবালাই দমন এবং পরিমিত সারের হিসাব জানুন ঘরে বসেই।
          </p>
        </div>
      </div>

      {/* Quick Agro Weather Snippet */}
      <div 
        onClick={() => onNavigateTab('weather')}
        className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-sm border border-stone-200/80 hover:border-emerald-500/60 cursor-pointer transition-all hover:shadow-md"
      >
        <div className="flex items-center justify-between pb-2 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-stone-700">
              কৃষি আবহাওয়া বার্তা · {currentWeather.nameBangla}
            </span>
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-0.5">
            বিস্তারিত <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tabular-nums">
              {currentWeather.currentTemp}°সে
            </span>
            <span className="text-xs font-medium text-stone-600">
              {currentWeather.conditionBangla}
            </span>
          </div>

          <div className="text-right">
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              আজ স্প্রে: {currentWeather.spraySuitability}
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              আর্দ্রতা {currentWeather.humidity}% · বৃষ্টির সম্ভাবনা {currentWeather.rainChance}%
            </p>
          </div>
        </div>

        <p className="mt-2 text-xs text-stone-600 bg-stone-50 rounded-lg p-2 border border-stone-100/80 leading-relaxed">
          {currentWeather.sprayAdvice}
        </p>
      </div>

      {/* Android PWA Install Banner */}
      {onOpenAndroidInstall && (
        <div 
          onClick={onOpenAndroidInstall}
          className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-3 sm:p-3.5 shadow-sm border border-emerald-700/60 flex items-center justify-between gap-3 cursor-pointer hover:opacity-95 transition-all group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">অ্যান্ড্রয়েড ফোনে অ্যাপটি সেভ করুন</span>
                <span className="text-[10px] bg-emerald-700 text-emerald-200 px-1.5 py-0.5 rounded font-medium">অফলাইন কার্যকর</span>
              </div>
              <p className="text-[11px] text-emerald-100/90 line-clamp-1 mt-0.5">
                হোম স্ক্রিনে ইনস্টল করে ইন্টারনেট ছাড়াও ধানের রোগ ও সারের হিসাব দেখুন
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenAndroidInstall();
            }}
            className="py-1 px-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            ইনস্টল গাইড
          </button>
        </div>
      )}

      {/* 4 Primary Quick Action Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-stone-800">
            জরুরি কৃষি সেবা ও টুলস
          </h3>
          <span className="text-xs text-stone-500">এক ক্লিকেই সমাধান</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Action 1: Fertilizer Calculator */}
          <button
            onClick={() => onNavigateTab('tools')}
            className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-emerald-600 hover:shadow-sm text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-stone-900 leading-tight">
                সার পরিমাপক
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                জমি অনুযায়ী সঠিক কেজি
              </p>
            </div>
          </button>

          {/* Action 2: Crop Doctor */}
          <button
            onClick={() => onNavigateTab('diseases')}
            className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-rose-500 hover:shadow-sm text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Stethoscope className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-stone-900 leading-tight">
                শস্য ডাক্তার
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                রোগ ও পোকার ঔষধ
              </p>
            </div>
          </button>

          {/* Action 3: Cultivation Guide */}
          <button
            onClick={() => onNavigateTab('crops')}
            className="p-3 bg-white rounded-xl border border-stone-200 shadow-xs hover:border-amber-600 hover:shadow-sm text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Wheat className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-stone-900 leading-tight">
                ফসল চাষ পদ্ধতি
              </h4>
              <p className="text-[11px] text-stone-500 mt-0.5">
                ধান ও সবজি গাইড
              </p>
            </div>
          </button>

          {/* Action 4: Agriculture Helpline */}
          <a
            href={`tel:${primaryHelpline.number}`}
            className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 shadow-xs hover:border-emerald-500 hover:shadow-sm text-left transition-all group flex flex-col justify-between"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
              <PhoneCall className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="mt-2.5">
              <h4 className="text-xs font-bold text-emerald-950 leading-tight">
                কৃষি কল সেন্টার
              </h4>
              <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">
                ডায়াল: ১৬১২৩
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* Featured Crops (ধান ও শাকসবজি) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              চলতি মৌসুমের প্রধান ফসল
            </h3>
            <p className="text-[11px] text-stone-500">বোরো ধান ও লাভজনক শীতকালীন সবজি</p>
          </div>
          <button
            onClick={() => onNavigateTab('crops')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-0.5"
          >
            সব দেখুন <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {featuredCrops.map((crop) => (
            <div
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md hover:border-emerald-500 cursor-pointer transition-all flex flex-col"
            >
              <div className="relative h-28 overflow-hidden bg-stone-100">
                <img
                  src={crop.imageUrl}
                  alt={crop.banglaName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-emerald-900/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  {crop.categoryBangla}
                </span>
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                    {crop.banglaName}
                  </h4>
                  <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    ফলন: {crop.yieldPerAcre.split('(')[0]}
                  </p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-500">
                  <span>জীবনকাল: {crop.durationDays}</span>
                  <span className="text-emerald-700 font-semibold">চাষ গাইড →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Farming Tips Section */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-stone-900">
              কৃষকের জন্য পরামর্শ ও টিপস
            </h3>
            <p className="text-[11px] text-stone-500">মাটি তৈরি, বীজ শোধন ও পরিচর্যা কৌশল</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {urgentTips.map((tip) => (
            <div
              key={tip.id}
              onClick={() => onSelectTip(tip)}
              className="p-3 bg-white rounded-xl border border-stone-200/90 shadow-xs hover:border-emerald-600 hover:shadow-sm cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                    <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200/60 font-semibold">
                      {tip.category}
                    </span>
                    <span>গুরুত্ব: {tip.importance}</span>
                  </div>
                  <h4 className="text-xs font-bold text-stone-900 mt-1">
                    {tip.title}
                  </h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2 mt-0.5 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Market Price Preview Snippet */}
      <div className="bg-white rounded-2xl p-3.5 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-700" />
            <h3 className="text-xs font-bold text-stone-900">
              দৈনিক কৃষি বাজার দর বুলেটিন
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('tools')}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
          >
            সম্পূর্ণ দর তালিকা →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {topMarketItems.map((item) => (
            <div key={item.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-stone-900">{item.name}</p>
                <p className="text-[10px] text-stone-500">{item.marketLocation.split(' ')[0]}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-extrabold text-emerald-800 tabular-nums">
                  {item.wholesalePrice} ৳
                </p>
                <p className="text-[10px] text-stone-500">{item.unit.split('/')[1] || item.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
