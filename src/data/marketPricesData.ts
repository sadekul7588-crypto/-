import { MarketItem } from '../types';

export const MARKET_PRICES_DATA: MarketItem[] = [
  {
    id: 'paddy-boro',
    name: 'বোরো ধান (ব্রি-২৮ শুকনো পুষ্ট)',
    category: 'খাদ্যশস্য',
    wholesalePrice: '১,২৮০ - ১,৩২০',
    retailPrice: '১,৩৫০ - ১,৪০০',
    unit: 'টাকা / মণ (৪০ কেজি)',
    trend: 'stable',
    changeText: 'স্থিতিশীল চাহিদা',
    marketLocation: 'বগুড়া মহাস্থান হাট ও নওগাঁ মোকাম'
  },
  {
    id: 'paddy-aman',
    name: 'আমন ধান (স্বর্ণা ও ব্রি-৪৯)',
    category: 'খাদ্যশস্য',
    wholesalePrice: '১,২০০ - ১,২৪০',
    retailPrice: '১,২৭০ - ১,৩০০',
    unit: 'টাকা / মণ',
    trend: 'up',
    changeText: '+২০ টাকা বৃদ্ধি',
    marketLocation: 'কুষ্টিয়া ও রাজশাহী বানেশ্বর মোকাম'
  },
  {
    id: 'potato-diamond',
    name: 'গোল আলু (ডায়মন্ড ও কার্ডিনাল)',
    category: 'সবজি',
    wholesalePrice: '৩৮ - ৪২',
    retailPrice: '৫০ - ৫৫',
    unit: 'টাকা / কেজি',
    trend: 'down',
    changeText: '-২ টাকা হ্রাস',
    marketLocation: 'মুন্সীগঞ্জ ও রংপুর মোকাম'
  },
  {
    id: 'onion-desi',
    name: 'দেশি পেঁয়াজ (মেহেরপুর ও পাবনা)',
    category: 'মসলা',
    wholesalePrice: '৮৫ - ৯০',
    retailPrice: '১০৫ - ১১৫',
    unit: 'টাকা / কেজি',
    trend: 'up',
    changeText: '+৫ টাকা বৃদ্ধি',
    marketLocation: 'পাবনা ও কাওরান বাজার'
  },
  {
    id: 'green-chili',
    name: 'কাঁচা মরিচ (তাজা ঝাল)',
    category: 'মসলা',
    wholesalePrice: '৭০ - ৮০',
    retailPrice: '১০০ - ১২০',
    unit: 'টাকা / কেজি',
    trend: 'down',
    changeText: '-১০ টাকা হ্রাস',
    marketLocation: 'বগুড়া ও কাওরান বাজার'
  },
  {
    id: 'tomato-fresh',
    name: 'পাকা টমেটো (লাল টুকটুকে)',
    category: 'সবজি',
    wholesalePrice: '৬৫ - ৭৫',
    retailPrice: '৯০ - ১০০',
    unit: 'টাকা / কেজি',
    trend: 'down',
    changeText: '-৫ টাকা হ্রাস (আগাম জোগান)',
    marketLocation: 'যশোর ও রাজশাহী হাট'
  },
  {
    id: 'eggplant-round',
    name: 'বেগুন (গোল ইসলামপুরী)',
    category: 'সবজি',
    wholesalePrice: '৪৫ - ৫০',
    retailPrice: '৬৫ - ৭০',
    unit: 'টাকা / কেজি',
    trend: 'stable',
    changeText: 'চাহিদা স্বাভাবিক',
    marketLocation: 'ময়মনসিংহ ও কাওরান বাজার'
  },
  {
    id: 'cauliflower',
    name: 'ফুলকপি (মাঝারি সাইজ)',
    category: 'সবজি',
    wholesalePrice: '২৫ - ৩০',
    retailPrice: '৪০ - ৪৫',
    unit: 'টাকা / পিস',
    trend: 'stable',
    changeText: 'নতুন আগমন',
    marketLocation: 'সাভার ও নরসিংদী পাইকারি বাজার'
  }
];

export interface HelplineContact {
  id: string;
  serviceName: string;
  number: string;
  organization: string;
  availability: string;
  description: string;
  actionText: string;
}

export const HELPLINE_CONTACTS: HelplineContact[] = [
  {
    id: 'dae-call-center',
    serviceName: 'কৃষি কল সেন্টার (জাতীয় কৃষি সেবা)',
    number: '16123',
    organization: 'কৃষি তথ্য সার্ভিস (AIS), কৃষি মন্ত্রণালয়',
    availability: 'সকাল ৯:০০ - বিকেল ৫:০০ (শুক্রবার ও ছুটির দিন ব্যতীত)',
    description: 'যে কোনো মোবাইল অপারেটর থেকে মাত্র ২৫ পয়সা/মিনিটে সরাসরি কৃষি কর্মকর্তা ও বিশেষজ্ঞদের সাথে কথা বলে ফসলের সমস্যা ও সমাধান জানুন।',
    actionText: 'কল করুন ১৬১২৩'
  },
  {
    id: 'govt-citizen-service',
    serviceName: 'জাতীয় তথ্য ও জরুরি সেবা',
    number: '333',
    organization: 'এটুআই (a2i) ও বাংলাদেশ সরকার',
    availability: '২৪ ঘণ্টা সপ্তাহে ৭ দিন উন্মুক্ত',
    description: 'টোল ফ্রি নম্বরে ৩ চেপে কৃষি বিষয়ক পরামর্শ ও উপজেলা কৃষি কর্মকর্তার যোগাযোগ নম্বর জেনে নিন।',
    actionText: 'কল করুন ৩৩৩'
  },
  {
    id: 'brri-help',
    serviceName: 'বাংলাদেশ ধান গবেষণা ইনস্টিটিউট (BRRI)',
    number: '01711986422',
    organization: 'ব্রি প্রধান কার্যালয়, গাজীপুর',
    availability: 'অফিস চলাকালীন',
    description: 'ধানের নতুন উন্নত জাত নির্বাচন, উচ্চফলনশীল বীজ প্রাপ্তি এবং রোগবালাই দমন পরামর্শ।',
    actionText: 'যোগাযোগ করুন'
  },
  {
    id: 'bari-help',
    serviceName: 'বাংলাদেশ কৃষি গবেষণা ইনস্টিটিউট (BARI)',
    number: '01712048455',
    organization: 'বারি সবজি ও ফল বিভাগ, জয়দেবপুর',
    availability: 'অফিস চলাকালীন',
    description: 'উন্নত শাকসবজি, ফলমূল ও মসলা জাতীয় ফসলের রোগবালাই ও জাত সম্পর্কিত পরামর্শ।',
    actionText: 'যোগাযোগ করুন'
  }
];
