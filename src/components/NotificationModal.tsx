import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'বোরো বীজতলায় কুয়াশা সতর্কতা',
      category: 'আবহাওয়া ও রোগ',
      date: 'আজ সকাল ৮:০০',
      text: 'উত্তরাঞ্চল ও মধ্যাঞ্চলে ভোরের ঘন কুয়াশার কারণে কোল্ড ইনজুরির ঝুঁকি রয়েছে। বীজতলা সকাল ১০টা পর্যন্ত পলিথিন দিয়ে ঢেকে রাখুন এবং রোদ উঠলে উন্মুক্ত করে দিন।',
      type: 'warning'
    },
    {
      id: 'notif-2',
      title: 'আলু ক্ষেতে লেট ব্লাইট প্রতিরোধ স্প্রে',
      category: 'রোগবালাই দমন',
      date: 'গতকাল বিকাল ৫:১৫',
      text: 'কুয়াশাচ্ছন্ন ভেজা আবহাওয়া শুরুর আগেই আলু গাছে মেনকোজেব জাতীয় ছত্রাকনাশক (ডাইথেন এম-৪৫) প্রতি লিটার পানিতে ২ গ্রাম হারে প্রতিরোধক হিসেবে স্প্রে করুন।',
      type: 'urgent'
    },
    {
      id: 'notif-3',
      title: 'নতুন বোরো ধান জাত: ব্রি ধান ৮৯ ও ৯২',
      category: 'জাত বার্তা',
      date: '১ নভেম্বর',
      text: 'ব্রি ধান ২৮ ও ২৯ এর বিকল্প হিসেবে ব্রি ধান ৮৯ ও ৯২ চাষে কৃষকদের উদ্বুদ্ধ করা হচ্ছে। এর ফলন বিঘায় ৩০ মণ পর্যন্ত পাওয়া যায় এবং ব্লাস্ট রোগ প্রতিরোধে সক্ষম।',
      type: 'info'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-md w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95"
      >
        <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-300" />
            <h3 className="text-sm font-bold">কৃষি বুলেটিন ও জরুরি নোটিফিকেশন</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1 text-xs">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl border ${
                item.type === 'warning'
                  ? 'bg-amber-50/70 border-amber-200 text-stone-800'
                  : item.type === 'urgent'
                  ? 'bg-rose-50/70 border-rose-200 text-stone-800'
                  : 'bg-emerald-50/70 border-emerald-200 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-stone-900">{item.category}</span>
                <span className="text-stone-400">{item.date}</span>
              </div>
              <h4 className="font-bold text-stone-900 text-xs mb-1">
                {item.title}
              </h4>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-1.5 px-4 bg-emerald-800 text-white font-semibold text-xs rounded-xl hover:bg-emerald-900 transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
