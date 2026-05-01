"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("شهري");
  const [spendingTrend, setSpendingTrend] = useState<{ [key: string]: number }>({});
  const [distribution, setDistribution] = useState<{ [key: string]: number }>({});
  const [savingsGoals, setSavingsGoals] = useState<any[]>([]);
  const [smartTip, setSmartTip] = useState("");
  const [metrics, setMetrics] = useState({
    avgDailySpending: 0,
    topCategory: "",
    budgetStatus: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Colors for categories
  const categoryColors: { [key: string]: string } = {
    "Housing & Bills": "bg-[#006c49]",
    "Food & Entertainment": "bg-[#131b2e]",
    "Subscriptions & Luxuries": "bg-[#dec29a]",
    "Transport": "bg-[#f59e0b]",
    "Shopping": "bg-[#ef4444]",
    "Health": "bg-[#8b5cf6]",
    "Education": "bg-[#06b6d4]",
    "Salary": "bg-[#10b981]",
    "Others": "bg-slate-300",
  };

  useEffect(() => {
    // Check if user is logged in
    if (!api.isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchAnalyticsData();
  }, [period]);

  const fetchAnalyticsData = async () => {
  const userId = api.getCurrentUserId();
    setLoading(true);
    
    try {
      const [distributionData, trendData, goalsData, insightsData] = await Promise.all([
        api.getSpendingDistribution(userId),
        api.getSpendingTrend(userId),
        api.getSavingsGoals(userId),
        api.getInsights(userId),
      ]);
      
      setDistribution(distributionData as { [key: string]: number });
      setSpendingTrend(trendData as { [key: string]: number });
      const insights = insightsData as { tip?: string; message?: string };
      setSmartTip(insights.tip || insights.message || "");
      
      // Process savings goals
      const goalsArray = Object.entries(goalsData as { [key: string]: any }).map(([name, data]: [string, any]) => ({
        name,
        progress: Math.round(data.progress || 0),
        currentAmount: data.currentAmount || 0,
        targetAmount: data.targetAmount || 0,
      }));
      setSavingsGoals(goalsArray);
      
      // Calculate metrics
      calculateMetrics(distributionData, trendData);
      
    } catch (error) {
      console.error("Failed to fetch analytics data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = (distData: any, trendData: any) => {
    // Calculate average daily spending
    const trendValues = Object.values(trendData) as number[];
    const avgSpending = trendValues.reduce((a, b) => a + b, 0) / trendValues.length;
    setMetrics(prev => ({ ...prev, avgDailySpending: Math.round(avgSpending) }));
    
    // Find top spending category
    if (Object.keys(distData).length > 0) {
      const topCategory = Object.entries(distData).reduce((a, b) => 
        ((b[1] as number) > (a[1] as number) ? b : a)
      );
      setMetrics(prev => ({ ...prev, topCategory: topCategory[0] }));
    }
    
    // Calculate budget status (example logic)
    const totalSpending = trendValues.reduce((a, b) => a + b, 0);
    setMetrics(prev => ({ 
      ...prev, 
      budgetStatus: totalSpending > 10000 ? "مرتفع" : totalSpending > 5000 ? "متوسط" : "جيد" 
    }));
  };

  // Get day names in Arabic
  const dayNames: { [key: string]: string } = {
    "MON": "إثنين",
    "TUE": "ثلاثاء", 
    "WED": "أربعاء",
    "THU": "خميس",
    "FRI": "جمعة",
    "SAT": "سبت",
    "SUN": "أحد",
  };

  // Get spending trend data as array
  const getTrendDataArray = () => {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    return days.map(day => ({
      day: dayNames[day] || day,
      amount: spendingTrend[day] || 0,
    }));
  };

  // Calculate total percentage for distribution
  const getTotalPercentage = () => {
    const values = Object.values(distribution);
    return Math.round(values.reduce((a, b) => a + b, 0));
  };

  // Get top 3 categories for display
  const getTopCategories = () => {
    return Object.entries(distribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, percentage]) => ({
        name: name === "Food & Entertainment" ? "الغذاء" :
              name === "Housing & Bills" ? "السكن" :
              name === "Subscriptions & Luxuries" ? "الرفاهية" : name,
        percentage: Math.round(percentage),
        color: categoryColors[name] || "bg-slate-300",
      }));
  };

  const getMaxTrendValue = () => {
    const values = Object.values(spendingTrend);
    return Math.max(...values, 1);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto pb-24 lg:pb-10">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006c49] mx-auto mb-4"></div>
            <p className="text-slate-600">جاري تحميل التحليلات...</p>
          </div>
        </div>
      </div>
    );
  }

  const trendDataArray = getTrendDataArray();
  const topCategories = getTopCategories();
  const maxTrendValue = getMaxTrendValue();

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
          {["شهري", "أسبوعي", "سنوي"].map((p, idx) => (
            <button
              key={idx}
              onClick={() => setPeriod(p)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all active:scale-95
                ${period === p ? "bg-white shadow-sm text-black" : "text-slate-500 hover:text-slate-700"}`}
            >
              {p}
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
                {period === "شهري" ? "الأسبوع الحالي" : period === "أسبوعي" ? "الأيام الماضية" : "الشهر الحالي"}
              </span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 px-2 border-b border-slate-50">
            {trendDataArray.map((item, i) => {
              const heightPercent = (item.amount / maxTrendValue) * 100;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center group cursor-pointer"
                >
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 group-hover:scale-x-105
                      ${item.amount > 0 ? "bg-[#006c49]" : "bg-slate-100"}`}
                    style={{ height: `${heightPercent || 5}%`, minHeight: "4px" }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity -mt-6 text-center">
                      <span className="text-xs font-bold text-[#006c49] bg-white px-1 rounded">
                        {item.amount} ر.س
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] mt-3 font-bold text-slate-400">
                    {item.day}
                  </span>
                </div>
              );
            })}
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
            {topCategories.length > 0 && (
              <div 
                className="absolute inset-0 rounded-full border-[14px] border-[#006c49]"
                style={{
                  background: `conic-gradient(${topCategories.map((cat, i) => 
                    `${cat.percentage}% ${i === 0 ? '0' : topCategories.slice(0, i).reduce((a, b) => a + b.percentage, 0)}%`
                  ).join(', ')})`
                }}
              ></div>
            )}
            <div className="text-center bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-sm">
              <span className="block text-2xl font-black text-slate-900">
                {getTotalPercentage()}%
              </span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                الإجمالي
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {topCategories.map((cat, i) => (
              <div
                key={i}
                className="flex justify-between items-center group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`}></span>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-black transition-colors">
                    {cat.name}
                  </span>
                </div>
                <span className="text-sm font-black text-slate-900">
                  {cat.percentage}%
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
              {smartTip || "قم بتسجيل معاملاتك للحصول على نصائح مخصصة لتحسين صحتك المالية"}
            </p>
          </div>
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
            {savingsGoals.length > 0 ? (
              savingsGoals.map((goal, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between mb-3">
                    <span className="font-bold text-slate-700 group-hover:text-black transition-colors">
                      {goal.name === "Emergency Fund" ? "صندوق الطوارئ" :
                       goal.name === "Summer Trip" ? "رحلة الصيف" : goal.name}
                    </span>
                    <span className="font-black text-slate-900">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="h-3.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        goal.name === "Emergency Fund" ? "bg-[#006c49]" : "bg-[#dec29a]"
                      }`}
                      style={{ width: `${Math.min(goal.progress, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-400">
                    <span>{goal.currentAmount?.toLocaleString()} ر.س</span>
                    <span>هدف: {goal.targetAmount?.toLocaleString()} ر.س</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-500 py-8">
                لا توجد أهداف ادخار حالياً
              </div>
            )}
          </div>
        </div>

        {/* Health Indicators */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {[
            {
              label: "متوسط الإنفاق اليومي",
              value: `${metrics.avgDailySpending.toLocaleString()} ر.س`,
              icon: "trending_down",
              color: "border-[#006c49]",
            },
            {
              label: "أعلى فئة صرف",
              value: metrics.topCategory === "Food & Entertainment" ? "الطعام" :
                     metrics.topCategory === "Housing & Bills" ? "السكن" :
                     metrics.topCategory === "Shopping" ? "التسوق" : metrics.topCategory || "غير محدد",
              icon: "category",
              color: "border-[#dec29a]",
            },
            {
              label: "حالة الميزانية",
              value: metrics.budgetStatus === "جيد" ? "مستقر" :
                      metrics.budgetStatus === "متوسط" ? "بحاجة للتحسين" : "عالي الإنفاق",
              icon: metrics.budgetStatus === "جيد" ? "check_circle" : "warning",
              color: metrics.budgetStatus === "جيد" ? "border-[#006c49]" : "border-[#f59e0b]",
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