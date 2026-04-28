export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="space-y-2">
        <h2 className="text-4xl font-bold text-black">أهلاً بك، سديد</h2>
        <p className="text-lg text-slate-600">
          نظرة عامة على صحتك المالية اليوم.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#6cf8bb] shadow-sm flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500">
            الرصيد الإجمالي
          </span>
          <span className="text-2xl font-bold text-black">45,200.00 ر.س</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span className="text-xs text-[#006c49]">وضع آمن</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#dec29a] shadow-sm flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500">
            مصاريف الشهر
          </span>
          <span className="text-2xl font-bold text-black">12,450.00 ر.س</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b]"></span>
            <span className="text-xs text-[#f59e0b]">انتبه للمصروفات</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border-r-4 border-[#ffdad6] shadow-sm flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-500">
            الديون المستحقة
          </span>
          <span className="text-2xl font-bold text-black">3,100.00 ر.س</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span className="text-xs text-[#ba1a1a]">متأخرات</span>
          </div>
        </div>
      </section>

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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">السكن والفواتير</span>
                <span className="text-xs font-bold text-[#006c49]">65%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#006c49]"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">الطعام والترفيه</span>
                <span className="text-xs font-bold text-[#f59e0b]">82%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#f59e0b]"
                  style={{ width: "82%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  الاشتراكات والكماليات
                </span>
                <span className="text-xs font-bold text-[#ba1a1a]">95%</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ba1a1a]"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-4 border border-transparent hover:border-[#006c49] transition-all">
            <span className="material-symbols-outlined text-[#006c49]">
              smart_toy
            </span>
            <p className="text-sm text-slate-600">
              نصيحة سديد: لقد وفرت 400 ر.س هذا الشهر مقارنة بالشهر الماضي في فئة
              "التسوق". استمر في هذا الأداء!
            </p>
          </div>
        </div>

        <div className="md:col-span-4 bg-[#131b2e] p-8 rounded-xl shadow-lg space-y-4 text-white">
          <h3 className="text-xl font-bold">إضافة معاملة سريعة</h3>
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">المبلغ</label>
              <input
                className="w-full bg-white/10 border-white/20 rounded-lg p-3 text-white outline-none focus:bg-white/20"
                placeholder="0.00 ر.س"
                type="number"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">الفئة</label>
              <select className="w-full bg-white/10 border-white/20 rounded-lg p-3 text-white outline-none focus:bg-white/20">
                <option className="text-black">طعام</option>
                <option className="text-black">مواصلات</option>
                <option className="text-black">تسلية</option>
              </select>
            </div>
            <button
              className="w-full bg-[#6cf8bb] text-[#00714d] font-bold py-3 rounded-xl hover:brightness-105"
              type="button"
            >
              إضافة الآن
            </button>
          </form>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-black">المعاملات الأخيرة</h3>
          <button className="text-[#006c49] font-semibold hover:underline">
            عرض الكل
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden border border-slate-100">
          {[
            {
              title: "سوبر ماركت الرياض",
              time: "اليوم، 10:30 صباحاً",
              amount: "- 150.00",
              cat: "احتياجات منزلية",
              icon: "shopping_bag",
              color: "text-slate-700",
            },
            {
              title: "مطعم النخبة",
              time: "أمس، 08:45 مساءً",
              amount: "- 240.00",
              cat: "ترفيه",
              icon: "restaurant",
              color: "text-slate-700",
            },
            {
              title: "تحويل راتب",
              time: "25 أكتوبر",
              amount: "+ 18,000.00",
              cat: "دخل",
              icon: "payments",
              color: "text-[#006c49]",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-black">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
              <div className="text-left">
                <span
                  className={`font-bold ${item.amount.includes("+") ? "text-[#006c49]" : "text-black"}`}
                >
                  {item.amount} ر.س
                </span>
                <p className="text-xs text-slate-400">{item.cat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
