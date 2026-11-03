// Standard fertilizer recommendations per decimal (শতক) based on DAE / BARC Bangladesh guidelines

export interface CropFertilizerSpec {
  cropName: string;
  category: string;
  ureaPerDecimalKg: number;
  tspPerDecimalKg: number;
  dapOptionPerDecimalKg: number;
  mopPerDecimalKg: number;
  gypsumPerDecimalKg: number;
  zincPerDecimalKg: number;
  boronPerDecimalGram: number;
  organicPerDecimalKg: number;
  seedRatePerDecimalKg: number;
  recommendedSpacingCm: string;
  applicationSchedule: string[];
}

export const CROP_FERTILIZER_SPECS: Record<string, CropFertilizerSpec> = {
  'boro_rice': {
    cropName: 'বোরো ধান (উচ্চফলনশীল জাত)',
    category: 'ধান',
    ureaPerDecimalKg: 1.15,
    tspPerDecimalKg: 0.45,
    dapOptionPerDecimalKg: 0.50,
    mopPerDecimalKg: 0.60,
    gypsumPerDecimalKg: 0.30,
    zincPerDecimalKg: 0.05,
    boronPerDecimalGram: 5,
    organicPerDecimalKg: 20,
    seedRatePerDecimalKg: 0.15,
    recommendedSpacingCm: '২০ সেমি x ১৫ সেমি',
    applicationSchedule: [
      'শেষ চাষের সময়: সমুদয় জৈব সার, টিএসপি, জিপসাম, জিংক ও অর্ধেক পটাশ মাটির সাথে মিশিয়ে দিন।',
      '১ম কিস্তি ইউরিয়া: চারা রোপণের ১৫-২০ দিন পর (কুশি আসার সূচনায়)।',
      '২য় কিস্তি ইউরিয়া: রোপণের ৩৫-৪০ দিন পর (সর্বোচ্চ কুশি অবস্থায়)।',
      '৩য় কিস্তি ইউরিয়া ও বাকি অর্ধেক পটাশ: রোপণের ৫০-৫৫ দিন পর (কাইচ থোড় আসার ৫-৭ দিন আগে)।'
    ]
  },
  'aman_rice': {
    cropName: 'রোপা আমন ধান',
    category: 'ধান',
    ureaPerDecimalKg: 0.85,
    tspPerDecimalKg: 0.35,
    dapOptionPerDecimalKg: 0.40,
    mopPerDecimalKg: 0.40,
    gypsumPerDecimalKg: 0.25,
    zincPerDecimalKg: 0.04,
    boronPerDecimalGram: 3,
    organicPerDecimalKg: 15,
    seedRatePerDecimalKg: 0.12,
    recommendedSpacingCm: '২০ সেমি x ১৫ সেমি',
    applicationSchedule: [
      'শেষ চাষে সব টিএসপি, জিপসাম, জিংক ও অর্ধেক পটাশ দিন।',
      'ইউরিয়া সার সমান ৩ কিস্তিতে রোপণের ১৫ দিন, ৩০ দিন ও ৪৫ দিন পর ছিটান।'
    ]
  },
  'potato': {
    cropName: 'উচ্চফলনশীল গোল আলু',
    category: 'সবজি',
    ureaPerDecimalKg: 1.35,
    tspPerDecimalKg: 0.90,
    dapOptionPerDecimalKg: 0.80,
    mopPerDecimalKg: 1.10,
    gypsumPerDecimalKg: 0.45,
    zincPerDecimalKg: 0.06,
    boronPerDecimalGram: 10,
    organicPerDecimalKg: 45,
    seedRatePerDecimalKg: 6.5,
    recommendedSpacingCm: '৬০ সেমি x ২৫ সেমি',
    applicationSchedule: [
      'জমি তৈরির সময় সব গোবর সার, টিএসপি, জিপসাম, জিংক, বোরন এবং অর্ধেক ইউরিয়া ও অর্ধেক পটাশ দিন।',
      'বাকি অর্ধেক ইউরিয়া ও পটাশ রোপণের ৩০-৩৫ দিন পর ভেলিতে মাটি তোলার সময় গাছের দুই পাশে উপরিপ্রয়োগ করুন।'
    ]
  },
  'tomato': {
    cropName: 'টমেটো (শীতকালীন হাইব্রিড)',
    category: 'সবজি',
    ureaPerDecimalKg: 1.10,
    tspPerDecimalKg: 0.90,
    dapOptionPerDecimalKg: 0.75,
    mopPerDecimalKg: 0.90,
    gypsumPerDecimalKg: 0.45,
    zincPerDecimalKg: 0.05,
    boronPerDecimalGram: 8,
    organicPerDecimalKg: 40,
    seedRatePerDecimalKg: 0.003,
    recommendedSpacingCm: '৬০ সেমি x ৪০ সেমি',
    applicationSchedule: [
      'শেষ চাষে সব জৈব সার, টিএসপি, জিপসাম এবং অর্ধেক পটাশ প্রয়োগ করুন।',
      'ইউরিয়া ও বাকি পটাশ সমান তিন কিস্তিতে চারা লাগানোর ১৫, ৩৫ এবং ৫৫ দিন পর গাছের গোড়া থেকে ৫-৭ সেমি দূরে রিং পদ্ধতিতে দিন।'
    ]
  },
  'eggplant': {
    cropName: 'উন্নত জাতের বেগুন',
    category: 'সবজি',
    ureaPerDecimalKg: 1.05,
    tspPerDecimalKg: 0.75,
    dapOptionPerDecimalKg: 0.65,
    mopPerDecimalKg: 0.90,
    gypsumPerDecimalKg: 0.35,
    zincPerDecimalKg: 0.05,
    boronPerDecimalGram: 6,
    organicPerDecimalKg: 35,
    seedRatePerDecimalKg: 0.005,
    recommendedSpacingCm: '৭৫ সেমি x ৬০ সেমি',
    applicationSchedule: [
      'জমি তৈরিতে সব গোবর, টিএসপি, জিপসাম এবং অর্ধেক পটাশ দিন।',
      'ইউরিয়া ও বাকি পটাশ সমান চার কিস্তিতে রোপণের ২০, ৪০, ৬০ ও ৮০ দিন পর গাছের গোড়ায় দিয়ে মাটি তুলে দিন।'
    ]
  },
  'green_chili': {
    cropName: 'কাঁচা মরিচ',
    category: 'মসলা',
    ureaPerDecimalKg: 0.90,
    tspPerDecimalKg: 0.60,
    dapOptionPerDecimalKg: 0.50,
    mopPerDecimalKg: 0.75,
    gypsumPerDecimalKg: 0.30,
    zincPerDecimalKg: 0.03,
    boronPerDecimalGram: 5,
    organicPerDecimalKg: 25,
    seedRatePerDecimalKg: 0.006,
    recommendedSpacingCm: '৫০ সেমি x ৪৫ সেমি',
    applicationSchedule: [
      'শেষ চাষে সব জৈব সার, টিএসপি ও জিপসাম দিন।',
      'ইউরিয়া ও পটাশ সার তিন কিস্তিতে রোপণের ২৫, ৫০ এবং ৭৫ দিন পর প্রয়োগ করুন।'
    ]
  },
  'cauliflower_cabbage': {
    cropName: 'ফুলকপি ও বাঁধাকপি',
    category: 'সবজি',
    ureaPerDecimalKg: 1.15,
    tspPerDecimalKg: 0.85,
    dapOptionPerDecimalKg: 0.70,
    mopPerDecimalKg: 0.85,
    gypsumPerDecimalKg: 0.40,
    zincPerDecimalKg: 0.05,
    boronPerDecimalGram: 10,
    organicPerDecimalKg: 40,
    seedRatePerDecimalKg: 0.004,
    recommendedSpacingCm: '৬০ সেমি x ৪৫ সেমি',
    applicationSchedule: [
      'জমি তৈরির সময় সব কম্পোস্ট, টিএসপি, জিপসাম ও বোরন দিন (ফুলকপিতে বোরন অতীব জরুরি)।',
      'ইউরিয়া ও পটাশ দুই কিস্তিতে রোপণের ১৫ ও ৩৫ দিন পর উপরিপ্রয়োগ করুন।'
    ]
  },
  'mustard': {
    cropName: 'উচ্চফলনশীল সরিষা (বারি-১৪ ও ১৭)',
    category: 'তেলবীজ',
    ureaPerDecimalKg: 0.95,
    tspPerDecimalKg: 0.65,
    dapOptionPerDecimalKg: 0.55,
    mopPerDecimalKg: 0.35,
    gypsumPerDecimalKg: 0.60,
    zincPerDecimalKg: 0.04,
    boronPerDecimalGram: 6,
    organicPerDecimalKg: 20,
    seedRatePerDecimalKg: 0.035,
    recommendedSpacingCm: 'ছিটিয়ে বা ৩০ সেমি লাইনে',
    applicationSchedule: [
      'সরিষায় সালফার বা জিপসাম বিশেষ গুরুত্বপূর্ণ। শেষ চাষে অর্ধেক ইউরিয়া এবং সব টিএসপি, পটাশ, জিপসাম ও বোরন দিন।',
      'বাকি অর্ধেক ইউরিয়া গাছে ফুল আসার পূর্বে প্রথম সেচের সময় (বপনের ২৫-৩০ দিন পর) উপরিপ্রয়োগ করুন।'
    ]
  }
};

export type LandUnit = 'decimal' | 'bigha' | 'katha' | 'acre';

export const LAND_UNIT_CONVERSIONS: Record<LandUnit, { nameBangla: string; decimalsPerUnit: number }> = {
  decimal: { nameBangla: 'শতাংশ / শতক', decimalsPerUnit: 1 },
  bigha: { nameBangla: 'বিঘা (৩৩ শতাংশ)', decimalsPerUnit: 33 },
  katha: { nameBangla: 'কাঠা (১.৬৫ শতাংশ)', decimalsPerUnit: 1.65 },
  acre: { nameBangla: 'একর (১০০ শতাংশ)', decimalsPerUnit: 100 }
};

export interface FertilizerCalculationResult {
  totalDecimals: number;
  ureaKg: number;
  tspKg: number;
  dapKg: number;
  mopKg: number;
  gypsumKg: number;
  zincKg: number;
  boronGram: number;
  organicKg: number;
  seedRequiredKg: number;
  estimatedPlants: number;
  applicationSchedule: string[];
}

export function calculateFertilizer(cropKey: string, amount: number, unit: LandUnit): FertilizerCalculationResult {
  const spec = CROP_FERTILIZER_SPECS[cropKey] || CROP_FERTILIZER_SPECS['boro_rice'];
  const unitFactor = LAND_UNIT_CONVERSIONS[unit].decimalsPerUnit;
  const totalDecimals = Math.max(0.1, amount * unitFactor);

  // 1 decimal = approx 40.46 sq meters = 435.6 sq ft
  // Plant count estimation based on 40.46 sq meter per decimal
  const plantDensityEst = Math.round(totalDecimals * 120);

  return {
    totalDecimals: Number(totalDecimals.toFixed(2)),
    ureaKg: Number((spec.ureaPerDecimalKg * totalDecimals).toFixed(1)),
    tspKg: Number((spec.tspPerDecimalKg * totalDecimals).toFixed(1)),
    dapKg: Number((spec.dapOptionPerDecimalKg * totalDecimals).toFixed(1)),
    mopKg: Number((spec.mopPerDecimalKg * totalDecimals).toFixed(1)),
    gypsumKg: Number((spec.gypsumPerDecimalKg * totalDecimals).toFixed(1)),
    zincKg: Number((spec.zincPerDecimalKg * totalDecimals).toFixed(2)),
    boronGram: Math.round(spec.boronPerDecimalGram * totalDecimals),
    organicKg: Math.round(spec.organicPerDecimalKg * totalDecimals),
    seedRequiredKg: Number((spec.seedRatePerDecimalKg * totalDecimals).toFixed(2)),
    estimatedPlants: plantDensityEst,
    applicationSchedule: spec.applicationSchedule
  };
}
