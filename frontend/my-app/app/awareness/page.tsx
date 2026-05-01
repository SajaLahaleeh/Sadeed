"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AwarenessPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [result, setResult] = useState<null | {
    itemPrice: number;
    hourlyRate: number;
    workHoursNeeded: number;
    workDaysNeeded: number;
    impulseIndex: string;
    message: string;
    suggestion: string;
  }>(null);
  const [tips, setTips] = useState<any[]>([]);
  const [randomTip, setRandomTip] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!api.isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchTips();
    loadUserData();
  }, []);

  const fetchTips = async () => {
    try {
      const [allTips, random] = await Promise.all([
        api.getAwarenessTips(),
        api.getRandomTip(),
      ]);
      setTips(allTips);
      setRandomTip(random);
    } catch (error) {
      console.error("Failed to fetch tips:", error);
    }
  };

  const loadUserData = async () => {
    try {
      // Use getProfile from your API service
      const user = await api.getProfile();
      
      if (user.monthlyNetIncome) {
        setMonthlyIncome(user.monthlyNetIncome.toString());
      }
      if (user.workHoursPerMonth) {
        setWorkHours(user.workHoursPerMonth.toString());
      }
    } catch (error) {
      console.error("Failed to load user data:", error);
      // Set default values
      setMonthlyIncome("10000");
      setWorkHours("160");
    }
  };

  const calculateTimeValue = async () => {
    if (!itemPrice || parseFloat(itemPrice) <= 0) {
      alert("الرجاء إدخال سعر السلعة");
      return;
    }

    setCalculating(true);
    try {
      const response = await api.calculateTimeValue(
        undefined,
        parseFloat(itemPrice),
        monthlyIncome ? parseFloat(monthlyIncome) : undefined,
        workHours ? parseInt(workHours) : undefined
      );
      setResult(response);
    } catch (error) {
      console.error("Calculation failed:", error);
      alert("فشل في حساب التكلفة. يرجى المحاولة مرة أخرى");
    } finally {
      setCalculating(false);
    }
  };

  const getImpulseIndexColor = (index: string) => {
    if (index.includes("Low")) return "bg-green-100 text-green-700";
    if (index.includes("Moderate")) return "bg-yellow-100 text-yellow-700";
    if (index.includes("High")) return "bg-orange-100 text-orange-700";
    return "bg-red-100 text-red-700";
  };

  const getImpulseIndexArabic = (index: string) => {
    if (index.includes("Low")) return "مخاطرة منخفضة";
    if (index.includes("Moderate")) return "مخاطرة متوسطة";
    if (index.includes("High")) return "مخاطرة عالية";
    return "مخاطرة حرجة";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-black mb-2">
          أداة الوعي المالي: قيمة الوقت
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          هل فكرت يوماً في التكلفة الحقيقية لمشترياتك؟ ليست بالمال، بل بساعات
          حياتك التي قضيتها في العمل للحصول عليها.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Calculator Section */}
        <div className="md:col-span-7 bg-white p-8 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1 h-full bg-[#006c49]"></div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c49]">
              calculate
            </span>
            احسب قيمة مشترياتك بالوقت
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                دخلك الشهري الصافي (ريال)
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                  placeholder="مثال: 10,000"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ريال
                </span>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                ساعات العمل في الشهر
              </label>
              <input
                className="w-full p-4 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="مثال: 160"
                type="number"
                value={workHours}
                onChange={(e) => setWorkHours(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">
                سعر السلعة التي ترغب بشرائها
              </label>
              <div className="relative">
                <input
                  className="w-full p-4 bg-slate-50 border-none rounded-lg focus:ring-2 focus:ring-[#006c49] outline-none transition-all"
                  placeholder="مثال: 3,500"
                  type="number"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ريال
                </span>
              </div>
            </div>
            <button
              onClick={calculateTimeValue}
              disabled={calculating}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex justify-center items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {calculating ? "جاري التحليل..." : "تحليل التكلفة الحقيقية"}
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
        </div>

        {/* Result Section */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className={`bg-[#131b2e] p-8 rounded-xl text-white flex-1 relative overflow-hidden transition-transform hover:scale-[1.02] ${result ? 'border-2 border-[#6cf8bb]' : ''}`}>
            <div className="relative z-10">
              <p className="text-xs opacity-70 uppercase tracking-widest mb-2">
                التكلفة الحقيقية
              </p>
              {result ? (
                <>
                  <h2 className="text-6xl font-extrabold mb-2 text-white">
                    {Math.round(result.workHoursNeeded)}
                  </h2>
                  <p className="text-xl text-[#6cf8bb]">ساعة من حياتك</p>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm leading-relaxed opacity-90">
                      {result.message}
                    </p>
                    {result.suggestion && (
                      <p className="text-sm leading-relaxed opacity-80 mt-3 text-[#6cf8bb]">
                        💡 {result.suggestion}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center py-8">
                    <span className="material-symbols-outlined text-6xl opacity-50">
                      calculate
                    </span>
                    <p className="text-sm opacity-70 mt-4">
                      أدخل سعر السلعة واضغط على "تحليل التكلفة الحقيقية"
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#006c49]/10 rounded-full blur-3xl"></div>
          </div>

          {/* Impulse Index */}
          {result && (
            <div className={`bg-white p-6 rounded-xl border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md ${getImpulseIndexColor(result.impulseIndex)}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                result.impulseIndex.includes("Low") ? "bg-green-50" :
                result.impulseIndex.includes("Moderate") ? "bg-yellow-50" :
                result.impulseIndex.includes("High") ? "bg-orange-50" : "bg-red-50"
              }`}>
                <span className="material-symbols-outlined text-inherit">
                  {result.impulseIndex.includes("Low") ? "check_circle" :
                   result.impulseIndex.includes("Moderate") ? "warning" :
                   result.impulseIndex.includes("High") ? "priority_high" : "error"}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500">مؤشر الاندفاع</p>
                <p className="text-md font-bold text-black">
                  {getImpulseIndexArabic(result.impulseIndex)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Random Tip Card */}
      {randomTip && (
        <div className="mt-6 bg-[#6cf8bb]/10 p-8 rounded-xl border border-[#6cf8bb]/20 hover:bg-[#6cf8bb]/20 transition-colors">
          <span className="material-symbols-outlined text-[#006c49] text-4xl mb-4">
            {randomTip.category === "Savings" ? "savings" :
             randomTip.category === "Budgeting" ? "bar_chart" :
             randomTip.category === "Mindful Spending" ? "psychology" : "lightbulb"}
          </span>
          <h4 className="text-xl font-bold mb-2 text-black">{randomTip.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {randomTip.content}
          </p>
        </div>
      )}

      {/* Call to Action */}
      <section className="mt-12 bg-slate-100 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2 text-black">
            ابدأ رحلة الوعي المالي الكاملة
          </h3>
          <p className="text-sm text-slate-600">
            انضم إلى أكثر من 50,000 مستخدم يحسنون علاقتهم مع المال يومياً عبر
            تطبيق سديد.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-md">
            حمل التطبيق الآن
          </button>
          <button className="bg-white border border-slate-300 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all">
            تعرف علينا
          </button>
        </div>
      </section>
    </div>
  );
}