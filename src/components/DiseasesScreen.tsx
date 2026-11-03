import React, { useState, useMemo } from 'react';
import { DISEASES_DATA } from '../data/diseasesData';
import { Disease, DiseaseType } from '../types';
import { 
  Stethoscope, 
  Search, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Leaf, 
  FlaskConical, 
  ShieldCheck, 
  ChevronRight,
  Filter,
  Volume2
} from 'lucide-react';

interface DiseasesScreenProps {
  onSpeakText?: (text: string) => void;
}

export const DiseasesScreen: React.FC<DiseasesScreenProps> = ({ onSpeakText }) => {
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [selectedSymptomTag, setSelectedSymptomTag] = useState<string>('all');

  const commonSymptomTags = [
    { id: 'all', label: 'সব লক্ষণ' },
    { id: 'spot', label: 'পাতায় দাগ বা ব্লাস্ট', keyword: 'দাগ' },
    { id: 'deadheart', label: 'মৃত ডিগ বা সাদা শীষ', keyword: 'শীষ' },
    { id: 'curl', label: 'পাতা কোঁকড়ানো ও ভাইরাস', keyword: 'কোকড়ানো' },
    { id: 'borer', label: 'ডগা ও ফলে ছিদ্র', keyword: 'ছিদ্র' },
    { id: 'blight', label: 'কুয়াশা ও পচে যাওয়া (ধসা)', keyword: 'ধসা' }
  ];

  const filteredDiseases = useMemo(() => {
    return DISEASES_DATA.filter((disease) => {
      const matchesCategory =
        selectedCropCategory === 'all' ||
        disease.cropCategory === selectedCropCategory ||
        disease.cropCategory === 'all';

      const matchesSearch =
        disease.diseaseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.symptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (disease.scientificOrPestName && disease.scientificOrPestName.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesTag = true;
      if (selectedSymptomTag !== 'all') {
        const tag = commonSymptomTags.find((t) => t.id === selectedSymptomTag);
        if (tag && tag.keyword) {
          matchesTag =
            disease.symptoms.some((s) => s.includes(tag.keyword!)) ||
            disease.diseaseName.includes(tag.keyword!);
        }
      }

      return matchesCategory && matchesSearch && matchesTag;
    });
  }, [selectedCropCategory, searchQuery, selectedSymptomTag]);

  const handleReadDisease = (disease: Disease) => {
    if (onSpeakText) {
      const text = `${disease.diseaseName}। প্রধান লক্ষণ: ${disease.symptoms[0]}। জৈব প্রতিকার: ${disease.organicRemedy[0]}। রাসায়নিক ঔষধ: ${disease.chemicalRemedy[0]}`;
      onSpeakText(text);
    }
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Top Banner & Symptom Checker Header */}
      <div className="bg-gradient-to-br from-rose-900 via-rose-950 to-stone-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-rose-800/40">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
            <Stethoscope className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
              শস্য ডাক্তার (রোগবালাই ও ক্ষতিকর পোকা ক্লিনিক)
            </h2>
            <p className="text-xs text-rose-200 mt-0.5">
              ফসলের লক্ষণ মিলিয়ে রোগ শনাক্ত করুন ও অনুমোদিত সঠিক প্রতিষেধক জানুন
            </p>
          </div>
        </div>

        {/* Symptom Tag Pills */}
        <div className="mt-4 pt-3 border-t border-rose-800/50">
          <span className="text-[11px] font-semibold text-rose-200 block mb-2">
            দ্রুত লক্ষণ মেলাতে ক্লিক করুন:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {commonSymptomTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedSymptomTag(tag.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedSymptomTag === tag.id
                    ? 'bg-rose-500 text-white font-bold shadow-xs'
                    : 'bg-rose-950/70 text-rose-200 hover:bg-rose-900 border border-rose-800/50'
                }`}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="রোগ বা পোকার নাম লিখুন (যেমন: ব্লাস্ট, মাজরা, লেট ব্লাইট, সাদামাছি)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-600 transition-all placeholder:text-stone-400"
          />
        </div>

        {/* Crop category toggle */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCropCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCropCategory === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            সব ফসল
          </button>
          <button
            onClick={() => setSelectedCropCategory('rice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCropCategory === 'rice'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            ধানের রোগবালাই
          </button>
          <button
            onClick={() => setSelectedCropCategory('vegetable')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCropCategory === 'vegetable'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            শাকসবজির রোগবালাই
          </button>
          <button
            onClick={() => setSelectedCropCategory('spices')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCropCategory === 'spices'
                ? 'bg-emerald-800 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            মরিচ ও মসলা
          </button>
        </div>
      </div>

      {/* Disease List */}
      <div className="space-y-3">
        {filteredDiseases.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-stone-200 p-4">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">কোনো রোগ বা পোকা পাওয়া যায়নি</p>
            <p className="text-xs text-stone-500 mt-0.5">অন্য কোনো লক্ষণ বা নাম দিয়ে চেষ্টা করুন</p>
          </div>
        ) : (
          filteredDiseases.map((disease) => {
            const isHighSeverity = disease.severity === 'উচ্চ';

            return (
              <div
                key={disease.id}
                onClick={() => setSelectedDisease(disease)}
                className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs hover:shadow-md hover:border-rose-400 cursor-pointer transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                        <span className="font-bold text-stone-800">আক্রান্ত ফসল: {disease.cropName}</span>
                        <span>·</span>
                        <span className="text-stone-600">{disease.type}</span>
                        <span>·</span>
                        <span className={`font-semibold ${isHighSeverity ? 'text-rose-700' : 'text-amber-700'}`}>
                          ক্ষতিমাত্রা: {disease.severity}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-rose-800 transition-colors mt-0.5">
                        {disease.diseaseName}
                      </h3>
                      {disease.scientificOrPestName && (
                        <p className="text-[11px] font-mono text-stone-400">
                          {disease.scientificOrPestName}
                        </p>
                      )}
                    </div>

                    <span className="p-1 text-stone-400 group-hover:text-rose-700 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </div>

                  {/* Primary symptom preview */}
                  <div className="mt-2.5 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100 text-xs text-stone-700 space-y-1">
                    <span className="font-bold text-rose-950 text-[11px] block">
                      প্রধান লক্ষণ:
                    </span>
                    <p className="leading-relaxed line-clamp-2">
                      {disease.symptoms[0]}
                    </p>
                  </div>

                  {/* Quick Remedy Pills */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-emerald-50/70 rounded-lg border border-emerald-100 flex items-start gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-emerald-950 block">জৈব দমন:</span>
                        <p className="text-[11px] text-emerald-900 line-clamp-1">{disease.organicRemedy[0]}</p>
                      </div>
                    </div>
                    <div className="p-2 bg-sky-50/70 rounded-lg border border-sky-100 flex items-start gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-sky-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-bold text-sky-950 block">ঔষধ প্রয়োগ:</span>
                        <p className="text-[11px] text-sky-900 line-clamp-1">{disease.chemicalRemedy[0].split('(')[0]}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">সম্পূর্ণ সমাধান ও স্প্রে মাত্রা দেখুন</span>
                  <span className="text-rose-700 font-bold flex items-center gap-0.5">
                    চিকিৎসা পদ্ধতি →
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-900 to-stone-900 text-white flex items-start justify-between gap-3 shrink-0">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-rose-200 mb-1">
                  <span>ফসল: {selectedDisease.cropName}</span>
                  <span>·</span>
                  <span>{selectedDisease.type}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedDisease.diseaseName}
                </h3>
                {selectedDisease.scientificOrPestName && (
                  <p className="text-xs text-rose-300 font-mono mt-0.5">
                    {selectedDisease.scientificOrPestName}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1.5">
                {onSpeakText && (
                  <button
                    onClick={() => handleReadDisease(selectedDisease)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                    title="পড়ে শোনান"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setSelectedDisease(null)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-700 flex-1">
              {/* Symptoms */}
              <div>
                <h4 className="text-xs font-bold text-rose-950 flex items-center gap-1.5 mb-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  লক্ষণ ও ক্ষতির ধরন:
                </h4>
                <ul className="space-y-1.5">
                  {selectedDisease.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                      <span className="text-stone-800 leading-relaxed">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Organic Remedies */}
              <div>
                <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 mb-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  জৈব ও প্রাকৃতিক প্রতিকার (বিষমুক্ত সমাধান):
                </h4>
                <ul className="space-y-1.5">
                  {selectedDisease.organicRemedy.map((remedy, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-stone-800 leading-relaxed">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment & Dilution */}
              <div>
                <h4 className="text-xs font-bold text-sky-950 flex items-center gap-1.5 mb-2">
                  <FlaskConical className="w-4 h-4 text-sky-700" />
                  অনুমোদিত রাসায়নিক কীটনাশক / ছত্রাকনাশক ও স্প্রে মাত্রা:
                </h4>
                <ul className="space-y-1.5">
                  {selectedDisease.chemicalRemedy.map((chemical, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-sky-50/70 p-2.5 rounded-xl border border-sky-200 text-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-700 shrink-0 mt-1.5" />
                      <span className="text-stone-800 leading-relaxed font-medium">{chemical}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div>
                <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  আগাম প্রতিরোধমূলক ব্যবস্থা:
                </h4>
                <ul className="space-y-1">
                  {selectedDisease.prevention.map((prev, idx) => (
                    <li key={idx} className="text-xs text-stone-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-stone-400">
                      {prev}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Bottom Close */}
            <div className="p-3.5 bg-stone-100 border-t border-stone-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedDisease(null)}
                className="py-2 px-5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                ঠিক আছে, বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
