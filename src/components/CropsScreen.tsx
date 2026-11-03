import React, { useState, useMemo } from 'react';
import { CROPS_DATA } from '../data/cropsData';
import { Crop, CropCategory } from '../types';
import { Search, Wheat, Carrot, Sparkles, Droplets, Calendar, Scale, ChevronRight, Bookmark, BookmarkCheck, Volume2 } from 'lucide-react';

interface CropsScreenProps {
  onSelectCrop: (crop: Crop) => void;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onSpeakText?: (text: string) => void;
}

export const CropsScreen: React.FC<CropsScreenProps> = ({
  onSelectCrop,
  bookmarks,
  onToggleBookmark,
  onSpeakText
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CropCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = useMemo(() => {
    return CROPS_DATA.filter((crop) => {
      const matchesCategory = selectedCategory === 'all' || crop.category === selectedCategory;
      const matchesSearch =
        crop.banglaName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.variety.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-4 pb-20">
      {/* Page Title & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900">
              ফসল চাষ নির্দেশিকা (ধান ও শাকসবজি)
            </h2>
            <p className="text-xs text-stone-500">
              উন্নত জাত নির্বাচন, জমি প্রস্তুতি, রোপণ ও সারের সম্পূর্ণ সময়সূচী
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ফসলের নাম বা জাত লিখুন (যেমন: ব্রি ২৮, আলু, টমেটো, লাউ)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition-all placeholder:text-stone-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 px-1"
            >
              মুছুন
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar pt-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            সব ফসল ({CROPS_DATA.length})
          </button>
          <button
            onClick={() => setSelectedCategory('rice')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              selectedCategory === 'rice'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Wheat className="w-3.5 h-3.5" />
            উন্নত ধান জাত
          </button>
          <button
            onClick={() => setSelectedCategory('vegetable')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              selectedCategory === 'vegetable'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Carrot className="w-3.5 h-3.5" />
            শাকসবজি
          </button>
        </div>
      </div>

      {/* Crops Cards List */}
      {filteredCrops.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
          <p className="text-sm font-semibold text-stone-700">কোনো ফসল পাওয়া যায়নি</p>
          <p className="text-xs text-stone-500 mt-1">অন্য কোনো নাম দিয়ে অনুসন্ধান করে দেখুন</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredCrops.map((crop) => {
            const isBookmarked = bookmarks.includes(crop.id);

            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-600 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image & Quick Badge */}
                  <div className="relative h-40 sm:h-44 overflow-hidden bg-stone-100">
                    <img
                      src={crop.imageUrl}
                      alt={crop.banglaName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="bg-emerald-900/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                        {crop.categoryBangla}
                      </span>
                      <span className="bg-stone-900/80 backdrop-blur-xs text-amber-200 text-[11px] font-medium px-2 py-0.5 rounded-md">
                        {crop.variety.split(' ')[0]}
                      </span>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(crop.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xs text-white transition-colors"
                      title={isBookmarked ? 'বুকমার্ক মুছুন' : 'সংরক্ষণ করুন'}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                        {crop.banglaName}
                      </h3>
                      {onSpeakText && (
                        <button
                          onClick={() => onSpeakText(`${crop.banglaName}। ${crop.shortDesc}`)}
                          className="p-1 text-stone-400 hover:text-emerald-700 transition-colors"
                          title="বিবরণ শুনুন"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed">
                      {crop.shortDesc}
                    </p>

                    {/* Meta Specifications */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                      <div>
                        <span className="text-stone-400 block">জীবনকাল:</span>
                        <span className="font-semibold text-stone-800">{crop.durationDays}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block">ফলন ক্ষমতা:</span>
                        <span className="font-semibold text-emerald-800">{crop.yieldPerAcre.split('(')[0]}</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-stone-200/60">
                        <span className="text-stone-400 block">বপন / রোপণ সময়:</span>
                        <span className="font-medium text-stone-700">{crop.sowingTime.split('.')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trigger Action */}
                <div className="px-3.5 pb-3.5 pt-1">
                  <button
                    onClick={() => onSelectCrop(crop)}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-colors shadow-xs"
                  >
                    সম্পূর্ণ চাষ পদ্ধতি ও সারের হিসাব দেখুন <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
