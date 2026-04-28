"use client";

import React, { useState } from "react";

export default function AddTransactionPage() {
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-4xl mx-auto pb-24 lg:pb-12">
      {/* Voice Input Section */}
      <section className="bg-white rounded-3xl p-8 mb-8 shadow-sm border border-slate-100 text-center flex flex-col items-center gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">
            تحدث لإضافة المصروف
          </h3>
          <p className="text-slate-500 italic">
            "اشتريت قهوة من ستاربكس بـ ٢٥ ريال"
          </p>
        </div>

        {/* Animated Mic Button */}
        <button className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white relative group transition-all hover:scale-105 active:scale-95">
          {/* Ripple Effect (Pulse) */}
          <span className="absolute inset-0 rounded-full bg-black/20 animate-ping"></span>
          <span
            className="material-symbols-outlined text-5xl relative z-10"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            mic
          </span>
        </button>

        <div className="flex gap-2 items-center bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
          <span className="w-2.5 h-2.5 bg-[#006c49] rounded-full animate-pulse"></span>
          <span className="text-sm font-bold text-slate-600">
            جارِ الاستماع بذكاء...
          </span>
        </div>
      </section>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Manual Form (Left) */}
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="space-y-6">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 px-1">
                  المبلغ (ريال)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full text-5xl font-black border-none p-0 focus:ring-0 text-black placeholder:text-slate-100 dir-ltr"
                />
              </div>

              <div className="h-px bg-slate-50 w-full"></div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 px-1">
                  بيان العملية
                </label>
                <input
                  type="text"
                  placeholder="ماذا اشتريت؟"
                  className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-slate-200 focus:ring-0 font-medium transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 px-1">
                    التاريخ
                  </label>
                  <input
                    type="date"
                    className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:ring-0 font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 px-1">
                    طريقة الدفع
                  </label>
                  <select className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:ring-0 font-medium appearance-none">
                    <option>البطاقة البنكية</option>
                    <option>Apple Pay</option>
                    <option>نقداً</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories (Right) */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full">
            <label className="text-xs font-bold text-slate-400 block mb-4 px-1">
              التصنيف
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "restaurant", label: "طعام", active: false },
                { icon: "shopping_bag", label: "تسوق", active: true },
                { icon: "directions_car", label: "مواصلات", active: false },
                { icon: "home", label: "منزل", active: false },
                { icon: "health_and_safety", label: "صحة", active: false },
                { icon: "add", label: "أخرى", active: false, dashed: true },
              ].map((cat, idx) => (
                <button
                  key={idx}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95 group
                    ${
                      cat.active
                        ? "bg-[#131b2e] border-[#131b2e] text-white shadow-md"
                        : cat.dashed
                          ? "border-dashed border-slate-200 text-slate-400"
                          : "border-slate-50 bg-slate-50/50 hover:bg-slate-50 text-slate-600 hover:border-slate-200"
                    }`}
                >
                  <span
                    className={`material-symbols-outlined mb-1 ${cat.active ? "fill-1" : ""}`}
                  >
                    {cat.icon}
                  </span>
                  <span className="text-[10px] font-bold">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Hint */}
      <div className="mt-8 bg-[#6cf8bb]/10 rounded-2xl p-6 border border-[#6cf8bb]/20 flex items-center gap-5 hover:bg-[#6cf8bb]/20 transition-all cursor-pointer group">
        <div className="bg-[#6cf8bb] p-3 rounded-2xl text-[#00714d] group-hover:rotate-12 transition-transform">
          <span className="material-symbols-outlined">auto_awesome</span>
        </div>
        <div>
          <h4 className="font-bold text-[#00714d] text-sm">
            تلميح ذكي من سديد
          </h4>
          <p className="text-xs text-[#00714d]/80 leading-relaxed">
            لقد صرفت ٣٠٪ أكثر في تصنيف "التسوق" هذا الأسبوع مقارنة بمتوسط صرفك
            المعتاد. هل تود مراجعة ميزانية التسوق؟
          </p>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 lg:right-64 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 z-40 flex gap-4">
        <button className="flex-[2] bg-black text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-black/10">
          حفظ العملية
        </button>
        <button className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 active:scale-95 transition-all">
          إلغاء
        </button>
      </div>
    </div>
  );
}
