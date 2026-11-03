/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabKey } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { CropsScreen } from './components/CropsScreen';
import { DiseasesScreen } from './components/DiseasesScreen';
import { WeatherScreen } from './components/WeatherScreen';
import { ToolsScreen } from './components/ToolsScreen';
import { CropDetailModal } from './components/CropDetailModal';
import { TipDetailModal } from './components/TipDetailModal';
import { NotificationModal } from './components/NotificationModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Crop, FarmingTip } from './types';
import { CROPS_DATA } from './data/cropsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);
  const [selectedCityId, setSelectedCityId] = useState<string>('dhaka');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [selectedTip, setSelectedTip] = useState<FarmingTip | null>(null);
  const [calculatorCropId, setCalculatorCropId] = useState<string | undefined>(undefined);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);
  const [isAndroidInstallOpen, setIsAndroidInstallOpen] = useState<boolean>(false);
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false);

  // LocalStorage Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sadekul_agro_bookmarks');
      return saved ? JSON.parse(saved) : ['brri-28', 'tomato-bari'];
    } catch {
      return ['brri-28', 'tomato-bari'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sadekul_agro_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [bookmarks]);

  const toggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSpeakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.92;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error', e);
    }
  };

  const toggleAudio = () => {
    const nextState = !isAudioActive;
    setIsAudioActive(nextState);
    if (nextState) {
      handleSpeakText('সাদেকুল এগ্রো বাংলা ভয়েস সহায়িকা চালু হয়েছে।');
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  const handleOpenCalculatorWithCrop = (cropId: string) => {
    setCalculatorCropId(cropId);
    setActiveTab('tools');
  };

  const tabTitles: Record<TabKey, string> = {
    home: 'হোম ও কৃষি সংবাদ',
    crops: 'ধান ও সবজি চাষ',
    diseases: 'শস্য রোগ ডাক্তার',
    weather: 'আবহাওয়া ও পূর্বাভাস',
    tools: 'সার পরিমাপক ও বাজার দর'
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-start text-stone-900 font-sans selection:bg-emerald-200">
      {/* Wrapper: supports either Android Simulator Frame or Full Responsive layout */}
      <div
        className={`w-full transition-all duration-300 ${
          isMobileFrame
            ? 'max-w-[430px] my-4 rounded-[40px] shadow-2xl border-[10px] border-stone-800 overflow-hidden bg-stone-50 min-h-[850px] relative'
            : 'max-w-4xl min-h-screen bg-stone-50 shadow-sm relative'
        }`}
      >
        {/* Android top speaker slot if in mobile frame */}
        {isMobileFrame && (
          <div className="bg-stone-800 h-5 w-full flex items-center justify-center">
            <div className="w-14 h-1.5 rounded-full bg-stone-700" />
          </div>
        )}

        {/* Top Header */}
        <Header
          isMobileFrame={isMobileFrame}
          setIsMobileFrame={setIsMobileFrame}
          onOpenNotifications={() => setIsNotificationOpen(true)}
          onOpenAndroidInstall={() => setIsAndroidInstallOpen(true)}
          isAudioActive={isAudioActive}
          toggleAudio={toggleAudio}
          activeTabTitle={tabTitles[activeTab]}
        />

        {/* Content Viewports */}
        <main className="p-3 sm:p-5">
          {activeTab === 'home' && (
            <HomeScreen
              onNavigateTab={setActiveTab}
              onSelectCrop={setSelectedCrop}
              onSelectTip={setSelectedTip}
              selectedCityId={selectedCityId}
              onSpeakText={isAudioActive ? handleSpeakText : undefined}
              onOpenAndroidInstall={() => setIsAndroidInstallOpen(true)}
            />
          )}

          {activeTab === 'crops' && (
            <CropsScreen
              onSelectCrop={setSelectedCrop}
              bookmarks={bookmarks}
              onToggleBookmark={toggleBookmark}
              onSpeakText={isAudioActive ? handleSpeakText : undefined}
            />
          )}

          {activeTab === 'diseases' && (
            <DiseasesScreen
              onSpeakText={isAudioActive ? handleSpeakText : undefined}
            />
          )}

          {activeTab === 'weather' && (
            <WeatherScreen
              selectedCityId={selectedCityId}
              onSelectCityId={setSelectedCityId}
              onSpeakText={isAudioActive ? handleSpeakText : undefined}
            />
          )}

          {activeTab === 'tools' && (
            <ToolsScreen initialCropId={calculatorCropId} />
          )}
        </main>

        {/* Fixed or Sticky Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isMobileFrame={isMobileFrame}
        />
      </div>

      {/* Detail Modals */}
      <CropDetailModal
        crop={selectedCrop}
        onClose={() => setSelectedCrop(null)}
        onOpenCalculatorWithCrop={handleOpenCalculatorWithCrop}
        isBookmarked={selectedCrop ? bookmarks.includes(selectedCrop.id) : false}
        onToggleBookmark={toggleBookmark}
        onSpeakText={isAudioActive ? handleSpeakText : undefined}
      />

      <TipDetailModal
        tip={selectedTip}
        onClose={() => setSelectedTip(null)}
        onSpeakText={isAudioActive ? handleSpeakText : undefined}
      />

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Android PWA Install Modal */}
      <AndroidInstallModal
        isOpen={isAndroidInstallOpen}
        onClose={() => setIsAndroidInstallOpen(false)}
      />

      {/* Connectivity & Offline Mode Indicator */}
      <OfflineIndicator />
    </div>
  );
}
