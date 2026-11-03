import React, { useState } from 'react';
import { WEATHER_DATA } from '../data/weatherData';
import { DivisionWeather } from '../types';
import { 
  CloudSun, 
  MapPin, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  Sparkles,
  Volume2
} from 'lucide-react';

interface WeatherScreenProps {
  selectedCityId: string;
  onSelectCityId: (id: string) => void;
  onSpeakText?: (text: string) => void;
}

export const WeatherScreen: React.FC<WeatherScreenProps> = ({
  selectedCityId,
  onSelectCityId,
  onSpeakText
}) => {
  const currentCity = WEATHER_DATA.find((w) => w.id === selectedCityId) || WEATHER_DATA[0];

  const handleReadWeather = () => {
    if (onSpeakText) {
      const text = `${currentCity.nameBangla}-এর আবহাওয়া বার্তা। বর্তমান তাপমাত্রা ${currentCity.currentTemp} ডিগ্রি সেলসিয়াস। আকাশ ${currentCity.conditionBangla}। স্প্রে পরামর্শ: ${currentCity.sprayAdvice}। সেচ পরামর্শ: ${currentCity.irrigationAdvice}`;
      onSpeakText(text);
    }
  };

  const getSprayBadge = (suitability: 'উপযুক্ত' | 'সতর্কতা' | 'অনুপযুক্ত') => {
    switch (suitability) {
      case 'উপযুক্ত':
        return {
          icon: CheckCircle2,
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          indicator: 'bg-emerald-600',
          text: 'স্প্রে করা যাবে (অনুকূল)'
        };
      case 'সতর্কতা':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          indicator: 'bg-amber-600',
          text: 'সতর্কতা অবলম্বন করুন'
        };
      case 'অনুপযুক্ত':
        return {
          icon: XCircle,
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          indicator: 'bg-rose-600',
          text: 'আজ স্প্রে নিষিদ্ধ'
        };
    }
  };

  const sprayBadge = getSprayBadge(currentCity.spraySuitability);
  const SprayIcon = sprayBadge.icon;

  return (
    <div className="space-y-4 pb-20">
      {/* Top Selector Card */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 flex items-center gap-2">
              <CloudSun className="w-5 h-5 text-emerald-700" />
              কৃষি আবহাওয়া ও পূর্বাভাস
            </h2>
            <p className="text-xs text-stone-500">
              সঠিক আবহাওয়া দেখে সেচ, সার ও বালাইনাশক প্রয়োগের সঠিক সিদ্ধান্ত নিন
            </p>
          </div>

          {/* Division Selector */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
            <select
              value={selectedCityId}
              onChange={(e) => onSelectCityId(e.target.value)}
              className="text-xs sm:text-sm font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
            >
              {WEATHER_DATA.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nameBangla}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-teal-950 text-white rounded-2xl p-5 shadow-sm border border-emerald-700/50 relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-emerald-600/20 blur-2xl pointer-events-none" />
        
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-200">
                {currentCity.nameBangla} · আজকের আবহাওয়া
              </span>
              {onSpeakText && (
                <button
                  onClick={handleReadWeather}
                  className="sm:hidden p-1.5 rounded-full bg-white/20 text-white"
                  title="আবহাওয়া শুনুন"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums">
                {currentCity.currentTemp}°
              </span>
              <div>
                <p className="text-sm sm:text-base font-bold text-amber-300">
                  {currentCity.conditionBangla}
                </p>
                <p className="text-xs text-emerald-200">
                  অনুভূত তাপমাত্রা: {currentCity.feelsLike}°সে
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onSpeakText && (
              <button
                onClick={handleReadWeather}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-sm transition-colors"
                title="আবহাওয়া শুনুন"
              >
                <Volume2 className="w-4 h-4" />
                <span>বার্তা শুনুন</span>
              </button>
            )}
          </div>
        </div>

        {/* 3-Metric Stats Row */}
        <div className="mt-4 pt-3.5 border-t border-emerald-700/60 grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">বাতাসের আর্দ্রতা</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-sm font-bold text-white tabular-nums">{currentCity.humidity}%</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">বৃষ্টির সম্ভাবনা</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <CloudRain className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-sm font-bold text-white tabular-nums">{currentCity.rainChance}%</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2 backdrop-blur-xs">
            <span className="text-[10px] text-emerald-200 block">বাতাসের বেগ</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <Wind className="w-3.5 h-3.5 text-emerald-200" />
              <span className="text-sm font-bold text-white tabular-nums">{currentCity.windSpeedKm} কিমি/ঘণ্টা</span>
            </div>
          </div>
        </div>
      </div>

      {/* Agro Advisories Matrix (কৃষি সতর্কতা ও করণীয়) */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          মাঠ পর্যায়ের কৃষি সতর্কতা ও দিকনির্দেশনা
        </h3>

        {/* Spray Advisory */}
        <div className={`p-3 rounded-xl border ${sprayBadge.bg}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold flex items-center gap-1.5">
              <SprayIcon className="w-4 h-4" />
              বালাইনাশক ও ভিটামিন স্প্রে নির্দেশনা
            </span>
            <span className="text-[11px] font-bold underline">{sprayBadge.text}</span>
          </div>
          <p className="text-xs leading-relaxed opacity-90 mt-1">
            {currentCity.sprayAdvice}
          </p>
        </div>

        {/* Irrigation Advisory */}
        <div className="p-3 rounded-xl border border-sky-200 bg-sky-50/70 text-sky-950">
          <span className="text-xs font-bold flex items-center gap-1.5 mb-1 text-sky-900">
            <Droplets className="w-4 h-4 text-sky-700" />
            সেচ প্রদান সংক্রান্ত পরামর্শ
          </span>
          <p className="text-xs leading-relaxed text-sky-900">
            {currentCity.irrigationAdvice}
          </p>
        </div>

        {/* Harvest & Sun Drying Advisory */}
        <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/70 text-amber-950">
          <span className="text-xs font-bold flex items-center gap-1.5 mb-1 text-amber-900">
            <Sun className="w-4 h-4 text-amber-700" />
            ফসল তোলা ও রোদে শুকানোর বার্তা
          </span>
          <p className="text-xs leading-relaxed text-amber-900">
            {currentCity.harvestAdvice}
          </p>
        </div>
      </div>

      {/* 7-Day Forecast */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-700" />
            আগামী ৭ দিনের কৃষি পূর্বাভাস
          </h3>
          <span className="text-[11px] text-stone-400">বাংলাদেশ আবহাওয়া অধিদপ্তর উপাত্ত</span>
        </div>

        <div className="space-y-2">
          {currentCity.forecast.map((day, idx) => (
            <div
              key={idx}
              className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 flex items-center justify-between text-xs hover:bg-stone-100/70 transition-colors"
            >
              <div className="w-24">
                <span className="font-bold text-stone-900 block">{day.dayBangla}</span>
                <span className="text-[10px] text-stone-500">{day.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <CloudSun className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-medium text-stone-700">{day.conditionBangla}</span>
              </div>

              <div className="text-right">
                <div className="font-bold text-stone-900 tabular-nums">
                  {day.tempMax}° / <span className="text-stone-500 font-normal">{day.tempMin}°</span>
                </div>
                <div className="text-[10px] text-stone-500">
                  বৃষ্টি: {day.rainChance}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
