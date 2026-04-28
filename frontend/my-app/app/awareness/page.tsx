export default function AwarenessPage() {
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
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  ريال
                </span>
              </div>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all flex justify-center items-center gap-2 shadow-sm">
              تحليل التكلفة الحقيقية
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="bg-[#131b2e] p-8 rounded-xl text-white flex-1 relative overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="relative z-10">
              <p className="text-xs opacity-70 uppercase tracking-widest mb-2">
                التكلفة الحقيقية
              </p>
              <h2 className="text-6xl font-extrabold mb-2 text-white">56</h2>
              <p className="text-xl text-[#6cf8bb]">ساعة من حياتك</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm leading-relaxed opacity-90">
                  هذا يعني أنك ستقضي{" "}
                  <span className="font-bold">أسبوع عمل كامل</span> لتغطية تكلفة
                  هذا المنتج فقط.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#006c49]/10 rounded-full blur-3xl"></div>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-100 flex items-center gap-4 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-red-600">
                priority_high
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500">مؤشر الاندفاع</p>
              <p className="text-md font-bold text-black">مخاطرة متوسطة</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-12 lg:col-span-4 bg-[#6cf8bb]/10 p-8 rounded-xl border border-[#6cf8bb]/20 hover:bg-[#6cf8bb]/20 transition-colors">
          <span className="material-symbols-outlined text-[#006c49] text-4xl mb-4">
            visibility
          </span>
          <h4 className="text-xl font-bold mb-2 text-black">
            قاعدة الـ 24 ساعة
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            انتظر يوماً كاملاً قبل إتمام أي عملية شراء غير ضرورية تزيد تكلفتها
            عن 5 ساعات عمل. غالباً ما يختفي الحماس للشراء وتكتشف أنك لا تحتاجها
            حقاً.
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-4 bg-white p-8 rounded-xl border border-slate-100 shadow-sm group hover:shadow-md transition-all">
          <div className="overflow-hidden rounded-lg mb-6 bg-slate-100 h-40 flex items-center justify-center">
            <span className="material-symbols-outlined text-slate-300 text-5xl">
              image
            </span>
          </div>
          <h4 className="text-xl font-bold mb-2 text-black">
            هل يستحق العناء؟
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            بمجرد أن تحول المال إلى ساعات، ستجد أن قرار الشراء أصبح أكثر منطقية
            وأقل عاطفية. فكر في الجهد المبذول مقابل المنفعة.
          </p>
        </div>

        <div className="md:col-span-6 lg:col-span-4 bg-white p-8 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#006c49]"></span>
              <span className="text-xs font-semibold text-slate-500">
                مقارنة سريعة
              </span>
            </div>
            <h4 className="text-xl font-bold mb-2 text-black">
              كم تكلفة قهوتك؟
            </h4>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              كوب القهوة اليومي (25 ريال) قد يكلفك 15 دقيقة من العمل. سنوياً،
              هذا يعني 60 ساعة عمل!
            </p>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#006c49] h-full w-2/3 transition-all duration-1000"></div>
          </div>
        </div>
      </div>

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
