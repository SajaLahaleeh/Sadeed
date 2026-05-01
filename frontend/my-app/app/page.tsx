"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalBalance: 0,
    monthlyExpenses: 0,
    totalDebt: 0,
    balanceStatus: "",
    expenseStatus: "",
  });
  const [indicators, setIndicators] = useState({
    "Housing & Bills": 0,
    "Food & Entertainment": 0,
    "Subscriptions & Luxuries": 0,
  });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check authentication first
    const checkAuth = async () => {
      const isAuthenticated = api.isAuthenticated();
      console.log("Is authenticated:", isAuthenticated);
      
      if (!isAuthenticated) {
        console.log("Not authenticated, redirecting to login...");
        router.push("/login");
        return;
      }
      setAuthChecked(true);
      fetchDashboardData();
    };
    
    checkAuth();
  }, []);

  const fetchDashboardData = async () => {
    const userId = api.getCurrentUserId(); // Demo user ID
    
    try {
      console.log("Fetching dashboard data...");
      
      const [summaryData, indicatorsData, transactionsData, insightsData] = await Promise.all([
        api.getDashboardSummary(userId).catch(err => {
          console.error("Summary error:", err);
          return {} as {
            totalBalance?: number;
            monthlyExpenses?: number;
            totalDebt?: number;
            balanceStatus?: string;
            expenseStatus?: string;
          };
        }),
        api.getDashboardIndicators(userId).catch(err => {
          console.error("Indicators error:", err);
          return {} as Record<string, number>;
        }),
        api.getRecentTransactions(userId).catch(err => {
          console.error("Transactions error:", err);
          return [] as any[];
        }),
        api.getInsights(userId).catch(err => {
          console.error("Insights error:", err);
          return { tip: "قم بتسجيل معاملاتك للحصول على نصائح مخصصة" };
        }),
      ]) as [
        {
          totalBalance?: number;
          monthlyExpenses?: number;
          totalDebt?: number;
          balanceStatus?: string;
          expenseStatus?: string;
        },
        Record<string, number>,
        any[],
        { tip?: string; message?: string }
      ];
      
      setSummary({
        totalBalance: summaryData.totalBalance || 0,
        monthlyExpenses: summaryData.monthlyExpenses || 0,
        totalDebt: summaryData.totalDebt || 0,
        balanceStatus: summaryData.balanceStatus || "وضع آمن",
        expenseStatus: summaryData.expenseStatus || "انتبه للمصروفات",
      });
      
      setIndicators({
        "Housing & Bills": (indicatorsData as Record<string, number>)["Housing & Bills"] || 0,
        "Food & Entertainment": (indicatorsData as Record<string, number>)["Food & Entertainment"] || 0,
        "Subscriptions & Luxuries": (indicatorsData as Record<string, number>)["Subscriptions & Luxuries"] || 0,
      });
      
      setTransactions(transactionsData || []);
      setInsight(insightsData.tip || insightsData.message || "قم بتسجيل معاملاتك للحصول على نصائح مخصصة");
      
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("ar-SA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getStatusColor = (status: string) => {
    if (status === "Safe Zone" || status === "وضع آمن") return "bg-[#006c49]";
    if (status === "Watch Spending" || status === "انتبه للمصروفات") return "bg-[#f59e0b]";
    return "bg-[#ba1a1a]";
  };

  const getIndicatorColor = (value: number) => {
    if (value <= 65) return "text-[#006c49]";
    if (value <= 80) return "text-[#f59e0b]";
    return "text-[#ba1a1a]";
  };

  const getProgressColor = (value: number) => {
    if (value <= 65) return "bg-[#006c49]";
    if (value <= 80) return "bg-[#f59e0b]";
    return "bg-[#ba1a1a]";
  };

  if (!authChecked || loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006c49] mx-auto mb-4"></div>
            <p className="text-slate-600">جاري تحميل بياناتك المالية...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <h2 className="text-4xl font-bold text-black">أهلاً بك، سديد</h2>
        <p className="text-lg text-slate-600">
          نظرة عامة على صحتك المالية اليوم.
        </p>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#6cf8bb] shadow-sm flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500">
            الرصيد الإجمالي
          </span>
          <span className="text-2xl font-bold text-black">
            {formatAmount(summary.totalBalance)} ر.س
          </span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${getStatusColor(summary.balanceStatus)}`}></span>
            <span className={`text-xs ${
              summary.balanceStatus === "Safe Zone" || summary.balanceStatus === "وضع آمن" 
                ? "text-[#006c49]" : "text-[#f59e0b]"
            }`}>
              {summary.balanceStatus === "Safe Zone" || summary.balanceStatus === "وضع آمن" 
                ? "وضع آمن" : "انتبه للمصروفات"}
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#dec29a] shadow-sm flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500">
            مصاريف الشهر
          </span>
          <span className="text-2xl font-bold text-black">
            {formatAmount(summary.monthlyExpenses)} ر.س
          </span>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${
              summary.expenseStatus === "Watch Spending" || summary.expenseStatus === "انتبه للمصروفات"
                ? "bg-[#f59e0b]" : "bg-[#ba1a1a]"
            }`}></span>
            <span className={`text-xs ${
              summary.expenseStatus === "Watch Spending" || summary.expenseStatus === "انتبه للمصروفات"
                ? "text-[#f59e0b]" : "text-[#ba1a1a]"
            }`}>
              {summary.expenseStatus === "Watch Spending" || summary.expenseStatus === "انتبه للمصروفات"
                ? "انتبه للمصروفات" : "متأخرات"}
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#ffdad6] shadow-sm flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500">
            الديون المستحقة
          </span>
          <span className="text-2xl font-bold text-black">
            {formatAmount(summary.totalDebt)} ر.س
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span className="text-xs text-[#ba1a1a]">متأخرات</span>
          </div>
        </div>
      </section>

      {/* Indicators and Quick Add */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 bg-white p-8 rounded-xl shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-black">
              مؤشرات المرور المالية
            </h3>
            <span className="material-symbols-outlined text-slate-400">
              info
            </span>
          </div>
          
          <div className="space-y-4">
            {/* Housing & Bills */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">السكن والفواتير</span>
                <span className={`text-xs font-bold ${getIndicatorColor(indicators["Housing & Bills"])}`}>
                  {Math.round(indicators["Housing & Bills"] || 0)}%
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(indicators["Housing & Bills"])}`}
                  style={{ width: `${Math.min(indicators["Housing & Bills"] || 0, 100)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Food & Entertainment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">الطعام والترفيه</span>
                <span className={`text-xs font-bold ${getIndicatorColor(indicators["Food & Entertainment"])}`}>
                  {Math.round(indicators["Food & Entertainment"] || 0)}%
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(indicators["Food & Entertainment"])}`}
                  style={{ width: `${Math.min(indicators["Food & Entertainment"] || 0, 100)}%` }}
                ></div>
              </div>
            </div>
            
            {/* Subscriptions & Luxuries */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">الاشتراكات والكماليات</span>
                <span className={`text-xs font-bold ${getIndicatorColor(indicators["Subscriptions & Luxuries"])}`}>
                  {Math.round(indicators["Subscriptions & Luxuries"] || 0)}%
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getProgressColor(indicators["Subscriptions & Luxuries"])}`}
                  style={{ width: `${Math.min(indicators["Subscriptions & Luxuries"] || 0, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Insight Tip */}
          {insight && (
            <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-4 border border-transparent hover:border-[#006c49] transition-all">
              <span className="material-symbols-outlined text-[#006c49]">
                smart_toy
              </span>
              <p className="text-sm text-slate-600">{insight}</p>
            </div>
          )}
        </div>

        {/* Quick Add Transaction */}
        <div className="md:col-span-4 bg-[#131b2e] p-8 rounded-xl shadow-lg space-y-4 text-white">
          <h3 className="text-xl font-bold">إضافة معاملة سريعة</h3>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">المبلغ</label>
              <input
                id="quickAmount"
                className="w-full bg-white/10 border-white/20 rounded-lg p-3 text-white outline-none focus:bg-white/20"
                placeholder="0.00 ر.س"
                type="number"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">الوصف</label>
              <input
                id="quickDesc"
                className="w-full bg-white/10 border-white/20 rounded-lg p-3 text-white outline-none focus:bg-white/20"
                placeholder="ماذا اشتريت؟"
                type="text"
              />
            </div>
            <Link href="/add-transaction">
              <button
                className="w-full bg-[#6cf8bb] text-[#00714d] font-bold py-3 rounded-xl hover:brightness-105"
                type="button"
              >
                إضافة الآن
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">المعاملات الأخيرة</h3>
          <Link href="/transactions">
            <button className="text-[#006c49] font-semibold hover:underline">
              عرض الكل
            </button>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden border border-slate-100">
          {transactions.length > 0 ? (
            transactions.slice(0, 5).map((item, index) => (
              <div
                key={item.id || index}
                className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-600">
                      {item.transactionType === "INCOME" ? "payments" : 
                       item.categoryName === "Food & Entertainment" ? "restaurant" :
                       item.categoryName === "Shopping" ? "shopping_bag" : 
                       item.categoryName === "Housing & Bills" ? "home" : "receipt"}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-black">{item.description || "معاملة"}</h4>
                    <p className="text-xs text-slate-500">
                      {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString("ar-SA") : "تاريخ غير محدد"}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <span
                    className={`font-bold ${
                      item.transactionType === "INCOME" ? "text-[#006c49]" : "text-black"
                    }`}
                  >
                    {item.transactionType === "INCOME" ? "+" : "-"} {formatAmount(item.amount)} ر.س
                  </span>
                  <p className="text-xs text-slate-400">{item.categoryName || "بدون تصنيف"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500">
              لا توجد معاملات حتى الآن
            </div>
          )}
        </div>
      </section>
    </div>
  );
}