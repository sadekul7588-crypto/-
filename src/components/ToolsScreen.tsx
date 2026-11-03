import React, { useState, useId } from 'react';
import { 
  calculateFertilizer, 
  CROP_FERTILIZER_SPECS, 
  LAND_UNIT_CONVERSIONS, 
  LandUnit 
} from '../utils/calculator';
import { MARKET_PRICES_DATA, HELPLINE_CONTACTS } from '../data/marketPricesData';
import { 
  Calculator, 
  TrendingUp, 
  PhoneCall, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  MessageSquare, 
  Send,
  HelpCircle,
  Wheat,
  Scale
} from 'lucide-react';

interface ToolsScreenProps {
  initialCropId?: string;
}

export const ToolsScreen: React.FC<ToolsScreenProps> = ({ initialCropId }) => {
  const [activeSubTab, setActiveSubTab] = useState<'calculator' | 'market' | 'helpline'>('calculator');

  // Calculator State
  const defaultCropKey = initialCropId && CROP_FERTILIZER_SPECS[initialCropId] ? initialCropId : 'boro_rice';
  const [selectedCropKey, setSelectedCropKey] = useState<string>(defaultCropKey);
  const [landAmount, setLandAmount] = useState<number>(33); // default 33 decimal (1 bigha)
  const [landUnit, setLandUnit] = useState<LandUnit>('decimal');
  const [copiedSchedule, setCopiedSchedule] = useState(false);

  // Farmer Question Note State
  const [farmerNotes, setFarmerNotes] = useState<Array<{ id: string; question: string; date: string }>>([
    {
      id: 'note-1',
      question: 'বোরো ধানে শেষ কিস্তি ইউরিয়ার সাথে পটাশ সার মেশানোর সঠিক নিয়ম কী?',
      date: 'আজ সকাল ১০:২০'
    }
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  // Calculate results dynamically
  const calcResult = calculateFertilizer(selectedCropKey, landAmount, landUnit);
  const currentCropSpec = CROP_FERTILIZER_SPECS[selectedCropKey] || CROP_FERTILIZER_SPECS['boro_rice'];

  const handleCopyFertilizerResult = () => {
    const textToCopy = `সাদেকুল এগ্রো সার পরিমাপক হিসাব:
ফসল: ${currentCropSpec.cropName}
জমির পরিমাণ: ${landAmount} ${LAND_UNIT_CONVERSIONS[landUnit].nameBangla} (${calcResult.totalDecimals} শতাংশ)
-------------------------------
১. ইউরিয়া: ${calcResult.ureaKg} কেজি
২. টিএসপি: ${calcResult.tspKg} কেজি (অথবা ডিএপি: ${calcResult.dapKg} কেজি)
৩. পটাশ (এমওপি): ${calcResult.mopKg} কেজি
৪. জিপসাম: ${calcResult.gypsumKg} কেজি
৫. জিংক সালফেট: ${calcResult.zincKg} কেজি
৬. বোরন: ${calcResult.boronGram} গ্রাম
৭. জৈব সার: ${calcResult.organicKg} কেজি
প্রয়োজনীয় বীজ: ${calcResult.seedRequiredKg} কেজি`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedSchedule(true);
    setTimeout(() => setCopiedSchedule(false), 2000);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;

    setFarmerNotes([
      {
        id: Date.now().toString(),
        question: newQuestionText.trim(),
        date: 'আজ ' + new Date().toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
      },
      ...farmerNotes
    ]);
    setNewQuestionText('');
  };

  return (
    <div className="space-y-4 pb-20">
      {/* Subtab Segmented Control */}
      <div className="bg-white rounded-2xl p-1.5 border border-stone-200 shadow-xs grid grid-cols-3 gap-1">
        <button
          onClick={() => setActiveSubTab('calculator')}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'calculator'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>সার পরিমাপক</span>
        </button>
        <button
          onClick={() => setActiveSubTab('market')}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'market'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>বাজার দর</span>
        </button>
        <button
          onClick={() => setActiveSubTab('helpline')}
          className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'helpline'
              ? 'bg-emerald-800 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>কৃষি হেল্পলাইন</span>
        </button>
      </div>

      {/* 1. DIGITAL FERTILIZER CALCULATOR TAB */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-4">
          {/* Input Controls Card */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-emerald-700" />
                  ডিজিটাল সার ও বীজ পরিমাপক
                </h3>
                <p className="text-[11px] text-stone-500">
                  বাংলাদেশ কৃষি গবেষণা কাউন্সিল (BARC) ও DAE অনুমোদিত সুপারিশ
                </p>
              </div>
            </div>

            {/* Crop Selector */}
            <div>
              <label className="text-xs font-bold text-stone-800 block mb-1.5">
                ১. ফসল নির্বাচন করুন:
              </label>
              <select
                value={selectedCropKey}
                onChange={(e) => setSelectedCropKey(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
              >
                {Object.entries(CROP_FERTILIZER_SPECS).map(([key, spec]) => (
                  <option key={key} value={key}>
                    {spec.cropName} ({spec.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Land Area & Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  ২. জমির পরিমাণ লিখুন:
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={landAmount}
                  onChange={(e) => setLandAmount(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full text-sm font-bold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-800 block mb-1.5">
                  ৩. জমির একক নির্বাচন:
                </label>
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value as LandUnit)}
                  className="w-full text-xs sm:text-sm font-semibold bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
                >
                  <option value="decimal">শতাংশ / শতক (১ শতক = ৪৩৫.৬ বর্গফুট)</option>
                  <option value="bigha">বিঘা (৩৩ শতাংশ)</option>
                  <option value="katha">কাঠা (১.৬৫ শতাংশ)</option>
                  <option value="acre">একর (১০০ শতাংশ)</option>
                </select>
              </div>
            </div>

            {/* Land calculation banner */}
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs flex items-center justify-between">
              <span className="text-emerald-900 font-semibold">
                হিসাবকৃত মোট জমি: <strong className="text-emerald-950 font-bold tabular-nums">{calcResult.totalDecimals}</strong> শতাংশ (শতক)
              </span>
              <span className="text-[11px] text-emerald-800">
                চারা রোপণ দূরত্ব: {currentCropSpec.recommendedSpacingCm}
              </span>
            </div>
          </div>

          {/* Results Display Grid */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                আপনার জমির জন্য প্রয়োজনীয় সারের সঠিক পরিমাণ
              </h4>
              <button
                onClick={handleCopyFertilizerResult}
                className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition-colors"
              >
                {copiedSchedule ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>কপি সম্পন্ন!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>হিসাব কপি করুন</span>
                  </>
                )}
              </button>
            </div>

            {/* Fertilizer dosage cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">ইউরিয়া সার (Urea)</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.ureaKg}</span>
                <span className="text-xs text-stone-600 ml-1">কেজি</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">টিএসপি সার (TSP)</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.tspKg}</span>
                <span className="text-xs text-stone-600 ml-1">কেজি</span>
                <p className="text-[10px] text-stone-400 mt-0.5">(বা ডিএপি: {calcResult.dapKg} কেজি)</p>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">এমওপি / পটাশ (MoP)</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.mopKg}</span>
                <span className="text-xs text-stone-600 ml-1">কেজি</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">জিপসাম সার (সালফার)</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.gypsumKg}</span>
                <span className="text-xs text-stone-600 ml-1">কেজি</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">জিংক সালফেট (দস্তা)</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.zincKg}</span>
                <span className="text-xs text-stone-600 ml-1">কেজি</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">বোরন সার</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.boronGram}</span>
                <span className="text-xs text-stone-600 ml-1">গ্রাম</span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-[10px] text-stone-500 block">পচা গোবর / কম্পোস্ট</span>
                <span className="text-lg font-bold text-emerald-900 tabular-nums">{calcResult.organicKg}</span>
                <span className="text-xs text-stone-600 ml-1">কেজি</span>
              </div>

              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-800 block font-semibold">প্রয়োজনীয় বীজ</span>
                <span className="text-lg font-bold text-amber-950 tabular-nums">{calcResult.seedRequiredKg}</span>
                <span className="text-xs text-amber-900 ml-1">কেজি</span>
              </div>
            </div>

            {/* Application steps */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <h5 className="text-xs font-bold text-stone-900 mb-2">
                সারের প্রয়োগ পদ্ধতি ও কিস্তির সময়সূচী:
              </h5>
              <div className="space-y-2">
                {calcResult.applicationSchedule.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-stone-700 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. MARKET PRICE BULLETIN TAB */}
      {activeSubTab === 'market' && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  কৃষি পণ্যের পাইকারি ও খুচরা বাজার দর
                </h3>
                <p className="text-[11px] text-stone-500">
                  দেশের প্রধান মোকাম ও পাইকারি আড়তের দৈনিক হালনাগাদ দর
                </p>
              </div>
              <span className="text-[11px] text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
                আজকের বাজার
              </span>
            </div>
          </div>

          <div className="space-y-2.5">
            {MARKET_PRICES_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs hover:border-emerald-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      মোকাম: {item.marketLocation}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs sm:text-sm font-extrabold text-stone-900 tabular-nums">
                      পাইকারি: <span className="text-emerald-800">{item.wholesalePrice}</span>
                    </div>
                    <div className="text-[11px] text-stone-600 mt-0.5">
                      খুচরা: {item.retailPrice}
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      {item.unit}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500">গতির ট্রেন্ড:</span>
                  <span className={`font-semibold ${
                    item.trend === 'up' ? 'text-rose-700' : item.trend === 'down' ? 'text-emerald-700' : 'text-stone-600'
                  }`}>
                    {item.changeText}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. HELPLINE & ADVICE TAB */}
      {activeSubTab === 'helpline' && (
        <div className="space-y-4">
          {/* Direct Emergency Cards */}
          <div className="bg-emerald-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-stone-950 flex items-center justify-center font-extrabold text-xl shadow-xs">
                <PhoneCall className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold leading-tight">
                  কৃষি কল সেন্টার ১৬১২৩
                </h3>
                <p className="text-xs text-emerald-200 mt-0.5">
                  সরাসরি কৃষি বিশেষজ্ঞ ও কর্মকর্তাদের পরামর্শ নিন
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between">
              <span className="text-xs text-emerald-100">
                যেকোনো সিম থেকে কল করুন (নামমাত্র ২৫ পয়সা/মিনিট)
              </span>
              <a
                href="tel:16123"
                className="py-1.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs rounded-xl transition-colors shadow-xs"
              >
                কল করুন
              </a>
            </div>
          </div>

          {/* Directory List */}
          <div className="space-y-2.5">
            {HELPLINE_CONTACTS.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-xl p-4 border border-stone-200 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900">
                      {contact.serviceName}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {contact.organization}
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-lg">
                    {contact.number}
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {contact.description}
                </p>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
                  <span className="text-stone-400">{contact.availability}</span>
                  <a
                    href={`tel:${contact.number}`}
                    className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                  >
                    <PhoneCall className="w-3 h-3" />
                    {contact.actionText}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Farmer's Notebook / Ask Question Box */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              কৃষকের নিজস্ব নোট ও প্রশ্নের ডায়েরি
            </h4>
            <p className="text-[11px] text-stone-500">
              মাঠের যে কোনো প্রশ্ন বা সমাধান নিজের ফোনে লিখে রাখুন:
            </p>

            <form onSubmit={handleAddQuestion} className="flex gap-2">
              <input
                type="text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="নতুন কোনো কৃষি প্রশ্ন বা মন্তব্য লিখুন..."
                className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600"
              />
              <button
                type="submit"
                className="py-2 px-3.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-xl flex items-center gap-1 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>সংরক্ষণ</span>
              </button>
            </form>

            <div className="space-y-2 mt-2">
              {farmerNotes.map((note) => (
                <div key={note.id} className="p-2.5 bg-stone-50 rounded-xl border border-stone-200/60 text-xs">
                  <p className="text-stone-800 font-medium">{note.question}</p>
                  <span className="text-[10px] text-stone-400 mt-1 block">{note.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
