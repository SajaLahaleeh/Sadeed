"use client";

import React from "react";

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto pb-24 lg:pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            تحليلات الإنفاق
          </h1>
          <p className="text-slate-500 font-medium">
            نظرة شاملة على أنماطك المالية للشهر الحالي
          </p>
        </div>

        <div className="flex gap-1 bg-slate-100 p-1.5 rounded-2xl">
          {["شهري", "أسبوعي", "سنوي"].map((period, idx) => (
            <button
              key={idx}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all active:scale-95
                ${idx === 0 ? "bg-white shadow-sm text-black" : "text-slate-500 hover:text-slate-700"}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Spending Trend (Bar Chart) */}
        <div className="md:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold text-slate-900">تطور المصاريف</h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#006c49]"></span>
              <span className="text-xs font-bold text-slate-500">
                الشهر الحالي
              </span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 px-2 border-b border-slate-50">
            {[40, 65, 85, 45, 55, 30, 20].map((height, i) => (
              <div
                key={i}
                className="flex-1 flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-full rounded-t-xl transition-all duration-500 group-hover:scale-x-105
                    ${i === 2 ? "bg-[#006c49]" : "bg-slate-100 group-hover:bg-[#6cf8bb]/40"}`}
                  style={{ height: `${height}%` }}
                ></div>
                <span
                  className={`text-[10px] mt-3 font-bold ${i === 2 ? "text-black" : "text-slate-400"}`}
                >
                  {
                    ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"][
                      i
                    ]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Distribution (Donut Visual) */}
        <div className="md:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-900 mb-8">
            توزيع الفئات
          </h3>

          <div className="relative w-44 h-44 mx-auto mb-8 flex items-center justify-center">
            {/* Simple CSS Donut representation */}
            <div className="absolute inset-0 rounded-full border-[14px] border-slate-50"></div>
            <div className="absolute inset-0 rounded-full border-[14px] border-[#006c49] border-l-transparent border-b-transparent rotate-45"></div>
            <div className="text-center">
              <span className="block text-3xl font-black text-slate-900">
                64%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                الأساسيات
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: "السكن", value: "45%", color: "bg-[#006c49]" },
              { label: "الغذاء", value: "19%", color: "bg-[#131b2e]" },
              { label: "ترفيه", value: "12%", color: "bg-slate-300" },
            ].map((cat, i) => (
              <div
                key={i}
                className="flex justify-between items-center group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${cat.color}`}
                  ></span>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-black transition-colors">
                    {cat.label}
                  </span>
                </div>
                <span className="text-sm font-black text-slate-900">
                  {cat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Insight Card */}
        <div className="md:col-span-4 bg-[#6cf8bb] p-8 rounded-3xl shadow-sm border border-[#006c49]/10 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="bg-white/40 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[#006c49]">
                lightbulb
              </span>
            </div>
            <h4 className="text-xl font-bold text-[#00714d] mb-3">
              نصيحة سديد
            </h4>
            <p className="text-[#00714d] font-medium leading-relaxed">
              لقد أنفقت أقل بنسبة 15% على "المطاعم" هذا الأسبوع مقارنة بالأسبوع
              الماضي. هذا يوفر لك حوالي 450 ريال شهرياً!
            </p>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
        </div>

        {/* Savings Goals */}
        <div className="md:col-span-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">أهداف الادخار</h3>
            <button className="text-[#006c49] font-bold text-sm hover:underline">
              إدارة الأهداف
            </button>
          </div>

          <div className="space-y-8">
            {[
              { name: "صندوق الطوارئ", progress: 82, color: "bg-[#006c49]" },
              { name: "رحلة الصيف", progress: 40, color: "bg-[#dec29a]" },
            ].map((goal, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex justify-between mb-3">
                  <span className="font-bold text-slate-700 group-hover:text-black transition-colors">
                    {goal.name}
                  </span>
                  <span className="font-black text-slate-900">
                    {goal.progress}%
                  </span>
                </div>
                <div className="h-3.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${goal.color}`}
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Indicators */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {[
            {
              label: "متوسط الإنفاق اليومي",
              value: "245 ر.س",
              icon: "trending_down",
              color: "border-[#006c49]",
            },
            {
              label: "أعلى فئة صرف",
              value: "الإيجار",
              icon: "home",
              color: "border-[#dec29a]",
            },
            {
              label: "حالة الميزانية",
              value: "في أمان",
              icon: "check_circle",
              color: "border-[#006c49]",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className={`bg-white p-6 rounded-3xl border-r-4 ${stat.color} shadow-sm hover:shadow-md transition-all cursor-default group`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-black text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-black transition-colors">
                  {stat.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
