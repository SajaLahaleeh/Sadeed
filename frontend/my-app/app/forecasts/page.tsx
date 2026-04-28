export default function ForecastsPage() {
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
        <button className="px-6 py-3 bg-black text-white rounded-xl font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all">
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
                إجمالي المتوقع لسبتمبر
              </p>
              <p className="text-3xl font-black text-slate-900">
                4,250{" "}
                <span className="text-sm font-normal text-slate-500">ر.س</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">مدفوعة</p>
                <p className="text-xl font-bold text-[#006c49]">1,200</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-xs text-slate-500 mb-1">متبقية</p>
                <p className="text-xl font-bold text-slate-900">3,050</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">
                  lightbulb
                </span>
                نتوقع زيادة بنسبة{" "}
                <span className="text-red-600 font-bold">12%</span> في فاتورة
                الكهرباء بسبب موجة الحر القادمة.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Calendar View */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-black">
                calendar_today
              </span>
              <h3 className="font-bold text-lg">سبتمبر 2024</h3>
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
            {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map((day) => (
              <div
                key={day}
                className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-400"
              >
                {day}
              </div>
            ))}
            {/* Calendar Cells (Sample) */}
            {[...Array(21)].map((_, i) => (
              <div
                key={i}
                className="bg-white h-20 p-2 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer relative group"
              >
                {i + 1}
                {i === 2 && (
                  <div className="mt-1 p-1 bg-[#dae2fd] text-[#131b2e] rounded border-r-2 border-black text-[9px] truncate">
                    الإيجار السكني
                  </div>
                )}
                {i === 9 && (
                  <div className="mt-1 p-1 bg-[#6cf8bb]/20 text-[#00714d] rounded border-r-2 border-[#006c49] text-[9px] truncate">
                    فاتورة الكهرباء
                  </div>
                )}
                {i === 14 && (
                  <div className="mt-1 p-1 bg-red-50 text-red-700 rounded border-r-2 border-red-600 text-[9px] truncate">
                    أقساط السيارة
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bill List Section */}
        <div className="lg:col-span-12 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-lg">تفاصيل الفواتير القادمة</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>{" "}
                مدفوعة
              </span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> مستحقة
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">الفاتورة</th>
                  <th className="px-6 py-4">التاريخ</th>
                  <th className="px-6 py-4">الحالة</th>
                  <th className="px-6 py-4">المبلغ</th>
                  <th className="px-6 py-4 text-left">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600">
                          home
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">إيجار المنزل</p>
                        <p className="text-xs text-slate-500">
                          دفع آلي - مصرف الراجحي
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    3 سبتمبر
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#6cf8bb]/20 text-[#00714d] rounded-full text-[10px] font-bold">
                      تم الدفع
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    3,500 ر.س
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="material-symbols-outlined text-slate-400 hover:text-black">
                      more_vert
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-600">
                          bolt
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          فاتورة الكهرباء
                        </p>
                        <p className="text-xs text-slate-500">
                          شركة الكهرباء السعودية
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    10 سبتمبر
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold">
                      مستحقة
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    450 ر.س
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="px-4 py-1.5 bg-black text-white rounded-lg text-xs font-bold hover:opacity-80 transition-all">
                      ادفع الآن
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Insight Card */}
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
              بناءً على التزاماتك القادمة وتحليل أنماط صرفك، ننصح بتخصيص مبلغ{" "}
              <span className="text-white font-bold">1,500 ر.س</span> للطوارئ
              هذا الشهر لضمان استقرارك المالي.
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
      </div>
    </div>
  );
}
