"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface Bill {
  id: number;
  name: string;
  description: string;
  amount: number;
  dueDate: string;
  billType: string;
  paymentMethod: string;
  status: string;
  isPredicted: boolean;
  predictionConfidence?: number;
}

interface ForecastSummary {
  totalPredicted: number;
  totalPaid: number;
  totalRemaining: number;
  notes: string;
}

export default function ForecastsPage() {
  const [forecast, setForecast] = useState<ForecastSummary | null>(null);
  const [bills, setBills] = useState<Bill[]>([]);
  const [calendarBills, setCalendarBills] = useState<{ [key: number]: any[] }>({});
  const [loading, setLoading] = useState(true);
  const [payingBill, setPayingBill] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!api.isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchForecastData();
  }, []);

  const fetchForecastData = async () => {
const userId = api.getCurrentUserId();
    setLoading(true);
    
    try {
      const [forecastData, billsData, calendarData] = await Promise.all([
        api.getForecastSummary(userId),
        api.getBills(userId),
        api.getForecastCalendar(userId),
      ]) as [
        ForecastSummary,
        Bill[],
        { billsByDay?: { [key: number]: any[] } }
      ];
      
      setForecast(forecastData);
      setBills(billsData);
      setCalendarBills(calendarData.billsByDay || {});
      
    } catch (error) {
      console.error("Failed to fetch forecast data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayBill = async (billId: number) => {
    setPayingBill(billId);
    try {
      await api.markBillAsPaid(billId);
      // Refresh data
      await fetchForecastData();
    } catch (error) {
      console.error("Failed to pay bill:", error);
      alert("فشل في دفع الفاتورة. يرجى المحاولة مرة أخرى");
    } finally {
      setPayingBill(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PAID":
        return { bg: "bg-[#6cf8bb]/20", text: "text-[#00714d]", label: "تم الدفع" };
      case "PENDING":
        return { bg: "bg-yellow-50", text: "text-yellow-700", label: "مستحقة" };
      case "OVERDUE":
        return { bg: "bg-red-50", text: "text-red-600", label: "متأخرة" };
      case "PREDICTED":
        return { bg: "bg-blue-50", text: "text-blue-600", label: "متوقعة" };
      default:
        return { bg: "bg-slate-100", text: "text-slate-600", label: "غير معروفة" };
    }
  };

  const getBillIcon = (billType: string) => {
    switch (billType) {
      case "HOUSE_RENT":
        return "home";
      case "ELECTRICITY":
        return "bolt";
      case "WATER":
        return "water_drop";
      case "INTERNET":
        return "wifi";
      case "CAR_INSTALLMENT":
        return "directions_car";
      case "SUBSCRIPTION":
        return "subscriptions";
      default:
        return "receipt";
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case "BANK_CARD":
        return "بطاقة بنكية";
      case "CASH":
        return "نقداً";
      case "ONLINE_BANKING":
        return "تحويل بنكي";
      case "AUTO_PAY":
        return "دفع آلي";
      default:
        return method;
    }
  };

  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('ar-SA', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  // Generate calendar days for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday in JS, but we want Saturday = 0
    
    // Adjust for Arabic calendar where Saturday is first day
    const startOffset = (startingDayOfWeek + 1) % 7;
    
    return { daysInMonth, startOffset };
  };

  const { daysInMonth, startOffset } = getCalendarDays();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006c49] mx-auto mb-4"></div>
            <p className="text-slate-600">جاري تحميل الفواتير والتوقعات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            التوقعات والفواتير القادمة
          </h1>
          <p className="text-slate-600 max-w-2xl leading-relaxed">
            نظرة ذكية على التزاماتك المالية القادمة. يساعدك "سديد" على الاستعداد
            لمدفوعات الشهر الحالي والمستقبل بنموذج تنبؤي دقيق.
          </p>
        </div>
        <button 
          onClick={() => router.push("/add-transaction")}
          className="px-6 py-3 bg-black text-white rounded-xl font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all"
        >
          إضافة فاتورة جديدة
        </button>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Summary Prediction Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="material-symbols-outlined text-[#006c49]">
              analytics
            </span>
            <h3 className="font-bold text-lg text-slate-800">ملخص التوقعات</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border-r-4 border-[#006c49]">
              <p className="text-xs font-bold text-slate-500 mb-1">
                إجمالي المتوقع ل{currentMonth}
              </p>
              <p className="text-3xl font-black text-slate-900">
                {forecast?.totalPredicted?.toLocaleString() || 0}{" "}
                <span className="text-sm font-normal text-slate-500">ر.س</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">مدفوعة</p>
                <p className="text-xl font-bold text-[#006c49]">
                  {forecast?.totalPaid?.toLocaleString() || 0}
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">متبقية</p>
                <p className="text-xl font-bold text-slate-900">
                  {forecast?.totalRemaining?.toLocaleString() || 0}
                </p>
              </div>
            </div>
            {forecast?.notes && (
              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">
                    lightbulb
                  </span>
                  {forecast.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Calendar View */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-black">
                calendar_today
              </span>
              <h3 className="font-bold text-lg">
                {currentMonth} {currentYear}
              </h3>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
              <button className="px-4 py-1.5 bg-white text-slate-900 rounded-md shadow-sm text-xs font-bold transition-all">
                التقويم
              </button>
              <button className="px-4 py-1.5 text-slate-500 text-xs font-bold hover:bg-white/50 transition-all rounded-md">
                القائمة
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-px bg-slate-100 rounded-xl overflow-hidden border border-slate-100">
            {/* Day headers - Arabic order (Saturday first) */}
            {["س", "ح", "ن", "ث", "ر", "خ", "ج"].map((day) => (
              <div
                key={day}
                className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-400"
              >
                {day}
              </div>
            ))}
            
            {/* Empty cells for offset */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-white h-20 p-2 opacity-30"></div>
            ))}
            
            {/* Calendar Cells with bills */}
            {daysArray.map((day) => {
              const dayBills = calendarBills[day] || [];
              const hasPaidBill = dayBills.some(b => b.status === "PAID");
              const hasOverdueBill = dayBills.some(b => b.status === "OVERDUE");
              
              return (
                <div
                  key={day}
                  className={`bg-white h-24 p-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer relative group overflow-y-auto ${
                    hasOverdueBill ? 'bg-red-50/30' : ''
                  }`}
                >
                  <span className="text-sm">{day}</span>
                  <div className="mt-1 space-y-1">
                    {dayBills.slice(0, 2).map((bill, idx) => (
                      <div
                        key={idx}
                        className={`p-1 rounded border-r-2 text-[9px] truncate ${
                          bill.status === "PAID" 
                            ? "bg-[#6cf8bb]/20 border-[#006c49] text-[#00714d]"
                            : bill.status === "OVERDUE"
                            ? "bg-red-50 border-red-500 text-red-700"
                            : "bg-[#dae2fd] border-black text-[#131b2e]"
                        }`}
                      >
                        {bill.name}
                      </div>
                    ))}
                    {dayBills.length > 2 && (
                      <div className="text-[8px] text-slate-400">+{dayBills.length - 2} أخرى</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bill List Section */}
        <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-lg">تفاصيل الفواتير القادمة</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span> مدفوعة
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span> مستحقة
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> متأخرة
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> متوقعة
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">الفاتورة</th>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4">طريقة الدفع</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">المبلغ</th>
                  <th className="px-6 py-4 text-left">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bills.length > 0 ? (
                  bills.map((bill) => {
                    const statusBadge = getStatusBadge(bill.status);
                    return (
                      <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-600">
                                {getBillIcon(bill.billType)}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-slate-900">{bill.name}</p>
                              <p className="text-xs text-slate-500">
                                {bill.description || getPaymentMethodText(bill.paymentMethod)}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                          {new Date(bill.dueDate).toLocaleDateString('ar-SA', { day: 'numeric', month: 'numeric' })}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">
                          {getPaymentMethodText(bill.paymentMethod)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusBadge.bg} ${statusBadge.text}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">
                          {bill.amount.toLocaleString()} ر.س
                        </td>
                        <td className="px-6 py-4 text-left">
                          {bill.status === "PENDING" && (
                            <button
                              onClick={() => handlePayBill(bill.id)}
                              disabled={payingBill === bill.id}
                              className="px-4 py-1.5 bg-black text-white rounded-lg text-xs font-bold hover:opacity-80 transition-all disabled:opacity-50"
                            >
                              {payingBill === bill.id ? "جاري..." : "ادفع الآن"}
                            </button>
                          )}
                          {bill.status === "PREDICTED" && (
                            <span className="text-xs text-blue-600 font-bold">
                              توقع {Math.round((bill.predictionConfidence || 0) * 100)}%
                            </span>
                          )}
                          {(bill.status === "PAID" || bill.status === "OVERDUE") && (
                            <span className="text-xs text-slate-400">
                              {bill.status === "PAID" ? "✓ تم الدفع" : "⚠️ متأخرة"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      لا توجد فواتير حتى الآن
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Insight Card */}
        {forecast?.notes && (
          <div className="lg:col-span-12 bg-[#131b2e] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6cf8bb]/20 rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-[#6cf8bb] animate-pulse"></span>
                <span className="text-[10px] font-bold text-[#6cf8bb]">
                  نصيحة ذكية
                </span>
              </div>
              <h4 className="text-2xl font-bold mb-2">تنبيه الادخار الذكي</h4>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-xl">
                {forecast.notes}
              </p>
              <button className="text-sm font-bold border-b-2 border-[#6cf8bb] text-[#6cf8bb] hover:text-white transition-colors">
                عرض تفاصيل الخطة الكاملة
              </button>
            </div>
            <div className="relative z-10 w-28 h-28 shrink-0 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-5xl text-[#6cf8bb]">
                savings
              </span>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#006c49] rounded-full blur-[100px] opacity-20"></div>
          </div>
        )}
      </div>
    </div>
  );
}