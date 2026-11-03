import React, { useState } from 'react';
import { Crop } from '../types';
import { 
  X, 
  Calendar, 
  Layers, 
  Droplets, 
  ShieldAlert, 
  Calculator, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CropDetailModalProps {
  crop: Crop | null;
  onClose: () => void;
  onOpenCalculatorWithCrop: (cropId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onSpeakText?: (text: string) => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  onClose,
  onOpenCalculatorWithCrop,
  isBookmarked,
  onToggleBookmark,
  onSpeakText
}) => {
  const [activeTab, setActiveTab] = useState<'fertilizer' | 'cultivation' | 'irrigation' | 'pests'>('fertilizer');

  if (!crop) return null;

  const handleReadDetails = () => {
    if (onSpeakText) {
      const text = `${crop.banglaName}। জীবনকাল ${crop.durationDays}। বিঘায় ইউরিয়া ${crop.fertilizer.urea}, পটাশ ${crop.fertilizer.mop}। জমি তৈরির শেষ চাষে সব গোবর, টিএসপি এবং অর্ধেক পটাশ দিন।`;
      onSpeakText(text);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header with Image */}
        <div className="relative h-48 sm:h-56 bg-stone-900 shrink-0">
          <img
            src={crop.imageUrl}
            alt={crop.banglaName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent flex flex-col justify-between p-4">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-800/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                {crop.categoryBangla} · {crop.season.split('(')[0]}
              </span>
              <div className="flex items-center gap-1.5">
                {onSpeakText && (
                  <button
                    onClick={handleReadDetails}
                    className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
                    title="পড়ে শোনান"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onToggleBookmark(crop.id)}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
                  title="বুকমার্ক"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
                  title="বন্ধ করুন"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {crop.banglaName}
              </h2>
              <p className="text-xs text-stone-200 mt-0.5">
                জাত: {crop.variety} · গড় ফলন: {crop.yieldPerAcre}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-stone-200 bg-stone-50 px-3 overflow-x-auto no-scrollbar shrink-0">
          <button
            onClick={() => setActiveTab('fertilizer')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'fertilizer'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            সার প্রয়োগের মাত্রা ও কিস্তি
          </button>
          <button
            onClick={() => setActiveTab('cultivation')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cultivation'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            জমি তৈরি ও রোপণ
          </button>
          <button
            onClick={() => setActiveTab('irrigation')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'irrigation'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            সেচ ও আগাছা দমন
          </button>
          <button
            onClick={() => setActiveTab('pests')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pests'
                ? 'border-emerald-700 text-emerald-800 bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            প্রধান রোগবালাই
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 flex-1">
          {activeTab === 'fertilizer' && (
            <div className="space-y-4">
              <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900">
                    বিঘা প্রতি (৩৩ শতক) আদর্শ সার প্রয়োগ মাত্রা
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCalculatorWithCrop(crop.id);
                    }}
                    className="text-[11px] font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-xs"
                  >
                    <Calculator className="w-3 h-3 text-emerald-700" />
                    আপনার জমির হিসাব করুন →
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-stone-400 block text-[10px]">ইউরিয়া (Urea)</span>
                    <span className="font-bold text-stone-900">{crop.fertilizer.urea}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-stone-400 block text-[10px]">টিএসপি (TSP)</span>
                    <span className="font-bold text-stone-900">{crop.fertilizer.tsp}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-stone-400 block text-[10px]">এমওপি / পটাশ (MoP)</span>
                    <span className="font-bold text-stone-900">{crop.fertilizer.mop}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-stone-400 block text-[10px]">জিপসাম / সালফার</span>
                    <span className="font-bold text-stone-900">{crop.fertilizer.gypsum}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-stone-400 block text-[10px]">জিংক সালফেট</span>
                    <span className="font-bold text-stone-900">{crop.fertilizer.zinc}</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="text-stone-400 block text-[10px]">জৈব সার / গোবর</span>
                    <span className="font-bold text-stone-900">{crop.fertilizer.organic}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-900 mb-2">
                  সার প্রয়োগের সঠিক কিস্তি ও নিয়মাবলী:
                </h4>
                <ul className="space-y-2">
                  {crop.fertilizer.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/70 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-stone-700 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'cultivation' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  জমি ও বীজতলা প্রস্তুত প্রণালী
                </span>
                <p className="text-xs leading-relaxed text-stone-700">{crop.landPreparation}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    বপন সময় ও বীজের হার
                  </span>
                  <p className="text-xs leading-relaxed text-stone-700">{crop.sowingTime}</p>
                  <p className="text-xs font-medium text-emerald-800 mt-1">বীজের হার: {crop.seedRate}</p>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    চারা রোপণের দূরত্ব ও গুছি
                  </span>
                  <p className="text-xs leading-relaxed text-stone-700">{crop.transplanting}</p>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  ফসল কর্তন ও সংগ্রহ
                </span>
                <p className="text-xs leading-relaxed text-stone-700">{crop.harvesting}</p>
              </div>
            </div>
          )}

          {activeTab === 'irrigation' && (
            <div className="space-y-3">
              <div className="p-3 bg-sky-50/70 rounded-xl border border-sky-200">
                <span className="text-xs font-bold text-sky-950 block mb-1">
                  সেচ ব্যবস্থাপনা সময়সূচী
                </span>
                <ul className="space-y-1.5 mt-2">
                  {crop.irrigation.map((irri, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-sky-900">
                      <Droplets className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                      <span>{irri}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-stone-900 block mb-1">
                  আগাছা নিড়ানি ও পরিচর্যা
                </span>
                <p className="text-xs leading-relaxed text-stone-700">{crop.weeding}</p>
              </div>
            </div>
          )}

          {activeTab === 'pests' && (
            <div className="space-y-3">
              <p className="text-xs text-stone-600">
                এই ফসলে সচরাচর নিম্নোক্ত রোগ ও ক্ষতিকর পোকা আক্রমণ করতে পারে। লক্ষণ দেখা দেওয়া মাত্রই শস্য ডাক্তার মেন্যু থেকে প্রতিকার দেখুন:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {crop.keyPests.map((pest, idx) => (
                  <div key={idx} className="p-2.5 bg-rose-50/60 rounded-xl border border-rose-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-950">{pest}</span>
                    <span className="text-[10px] text-rose-700 font-medium">প্রতিকার রয়েছে</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-stone-100 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              onOpenCalculatorWithCrop(crop.id);
            }}
            className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Calculator className="w-4 h-4" />
            এই ফসলের সার ক্যালকুলেটরে যান
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-5 bg-white hover:bg-stone-200 text-stone-800 font-semibold text-xs rounded-xl border border-stone-300 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
