export type CropCategory = 'all' | 'rice' | 'vegetable' | 'spices';

export interface FertilizerSchedule {
  urea: string;
  tsp: string;
  dap: string;
  mop: string;
  gypsum: string;
  zinc: string;
  organic: string;
  instructions: string[];
}

export interface Crop {
  id: string;
  name: string;
  banglaName: string;
  category: 'rice' | 'vegetable' | 'spices';
  categoryBangla: string;
  variety: string;
  season: string;
  durationDays: string;
  yieldPerAcre: string;
  imageUrl: string;
  shortDesc: string;
  landPreparation: string;
  sowingTime: string;
  seedRate: string;
  transplanting: string;
  fertilizer: FertilizerSchedule;
  irrigation: string[];
  weeding: string;
  harvesting: string;
  keyPests: string[];
}

export type DiseaseType = 'ছত্রাকজনিত' | 'ব্যাকটেরিয়াজনিত' | 'ভাইরাসজনিত' | 'ক্ষতিকর পোকা';

export interface Disease {
  id: string;
  cropCategory: 'rice' | 'vegetable' | 'spices' | 'all';
  cropName: string;
  diseaseName: string;
  scientificOrPestName?: string;
  type: DiseaseType;
  severity: 'উচ্চ' | 'মাঝারি' | 'সাধারণ';
  symptoms: string[];
  organicRemedy: string[];
  chemicalRemedy: string[];
  prevention: string[];
  imageUrl?: string;
}

export interface FarmingTip {
  id: string;
  title: string;
  category: string;
  season: 'রবি' | 'খরিপ-১' | 'খরিপ-২' | 'সারাবছর';
  description: string;
  steps: string[];
  importance: string;
}

export interface WeatherDayForecast {
  dayBangla: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  conditionBangla: string;
  rainChance: number;
  humidity: number;
  icon: string;
}

export interface DivisionWeather {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  currentTemp: number;
  feelsLike: number;
  conditionBangla: string;
  conditionEnglish: string;
  humidity: number;
  rainChance: number;
  windSpeedKm: number;
  spraySuitability: 'উপযুক্ত' | 'সতর্কতা' | 'অনুপযুক্ত';
  sprayAdvice: string;
  irrigationAdvice: string;
  harvestAdvice: string;
  forecast: WeatherDayForecast[];
}

export interface MarketItem {
  id: string;
  name: string;
  category: string;
  wholesalePrice: string;
  retailPrice: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  changeText: string;
  marketLocation: string;
}
