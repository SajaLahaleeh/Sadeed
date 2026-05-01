"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AddTransactionPage() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState("BANK_CARD");
  const [categoryId, setCategoryId] = useState("");
  const [transactionType, setTransactionType] = useState("EXPENSE");
  const [categories, setCategories] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [smartTip, setSmartTip] = useState("");
  const router = useRouter();

  // Category icons mapping
  const categoryIcons: { [key: string]: string } = {
    "Housing & Bills": "home",
    "Food & Entertainment": "restaurant",
    "Subscriptions & Luxuries": "subscriptions",
    "Transport": "directions_car",
    "Shopping": "shopping_bag",
    "Health": "health_and_safety",
    "Education": "school",
    "Others": "add",
    "Salary": "payments",
    "Freelance": "work",
    "Investment": "trending_up",
    "Gift": "card_giftcard",
    "Refund": "currency_exchange",
  };

  useEffect(() => {
    // Check if user is logged in
    if (!api.isAuthenticated()) {
      router.push("/login");
      return;
    }
    fetchCategories();
    fetchSmartTip();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await api.getCategories();
      setCategories(data as any[]);
      // Set default category
      const expenseCategories = (data as any[]).filter((cat: any) => cat.type === "EXPENSE");
      if (expenseCategories.length > 0) {
        setCategoryId(expenseCategories[0].id.toString());
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchSmartTip = async () => {
    try {
      const insight = await api.getInsights(1) as any;
      setSmartTip(insight.tip || insight.message || "");
    } catch (err) {
      console.error("Failed to fetch tip", err);
    }
  };

  // Voice recognition
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        setError("متصفحك لا يدعم خاصية التعرف على الصوت");
        return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    
    recognition.onstart = () => {
        setIsListening(true);
        setError("");
    };
    
    recognition.onresult = async (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        await processVoiceInput(transcript);
    };
    
    recognition.onerror = () => {
        setIsListening(false);
        setError("لم نتمكن من التعرف على صوتك. يرجى المحاولة مرة أخرى");
    };
    
    recognition.start();
};

  const processVoiceInput = async (text: string) => {
    setLoading(true);
    try {
        // Remove the hardcoded 1 - pass undefined so it uses current user
        const response = await api.voiceTransaction(undefined, text);
        setSuccess("تم إضافة المعاملة بنجاح عن طريق الصوت!");
        setAmount("");
        setDescription("");
        // Redirect after 2 seconds
        setTimeout(() => {
            router.push("/");
        }, 2000);
    } catch (err: any) {
        setError(err.message || "فشل في معالجة الصوت");
    } finally {
        setLoading(false);
    }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!amount || parseFloat(amount) <= 0) {
        setError("يرجى إدخال مبلغ صحيح");
        setLoading(false);
        return;
    }

    if (!description.trim()) {
        setError("يرجى إدخال وصف للمعاملة");
        setLoading(false);
        return;
    }

    try {
        // Remove the hardcoded 1 - pass undefined so it uses current user
        await api.createTransaction(undefined, {
            amount: parseFloat(amount),
            description,
            transactionDate: new Date(date).toISOString(),
            paymentMethod,
            transactionType,
            categoryId: categoryId ? parseInt(categoryId) : null,
        });
        
        setSuccess("تم إضافة المعاملة بنجاح!");
        setAmount("");
        setDescription("");
        setDate(new Date().toISOString().split('T')[0]);
        
        // Refresh smart tip after adding transaction
        fetchSmartTip();
        
        // Redirect after 2 seconds
        setTimeout(() => {
            router.push("/");
        }, 2000);
    } catch (err: any) {
        setError(err.message || "فشل في إضافة المعاملة");
    } finally {
        setLoading(false);
    }
};

  const handleCancel = () => {
    router.push("/");
  };

  // Get category icon
  const getCategoryIcon = (categoryName: string) => {
    return categoryIcons[categoryName] || "receipt";
  };

  // Filter categories by type
  const filteredCategories = categories.filter(
    (cat) => cat.type === transactionType
  );

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
        <button
          onClick={startListening}
          disabled={isListening || loading}
          className="w-32 h-32 rounded-full bg-black flex items-center justify-center text-white relative group transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          <span className={`absolute inset-0 rounded-full bg-black/20 ${isListening ? 'animate-ping' : ''}`}></span>
          <span
            className="material-symbols-outlined text-5xl relative z-10"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isListening ? "mic" : "mic"}
          </span>
        </button>

        <div className="flex gap-2 items-center bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
          <span className={`w-2.5 h-2.5 bg-[#006c49] rounded-full ${isListening ? 'animate-pulse' : ''}`}></span>
          <span className="text-sm font-bold text-slate-600">
            {isListening ? "جارِ الاستماع..." : "اضغط على الميكروفون للتحدث"}
          </span>
        </div>
      </section>

      {/* Error and Success Messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm text-center">
          {success}
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Manual Form (Left) */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="space-y-6">
                {/* Transaction Type Toggle */}
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setTransactionType("EXPENSE");
                      const expenseCats = categories.filter((cat) => cat.type === "EXPENSE");
                      if (expenseCats.length > 0) setCategoryId(expenseCats[0].id.toString());
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition ${
                      transactionType === "EXPENSE"
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    مصروف
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTransactionType("INCOME");
                      const incomeCats = categories.filter((cat) => cat.type === "INCOME");
                      if (incomeCats.length > 0) setCategoryId(incomeCats[0].id.toString());
                    }}
                    className={`flex-1 py-3 rounded-xl font-semibold transition ${
                      transactionType === "INCOME"
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    دخل
                  </button>
                </div>

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
                    required
                    step="0.01"
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ماذا اشتريت؟"
                    className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:border-slate-200 focus:ring-0 font-medium transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 px-1">
                      التاريخ
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:ring-0 font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 px-1">
                      طريقة الدفع
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-transparent focus:ring-0 font-medium appearance-none"
                    >
                      <option value="BANK_CARD">البطاقة البنكية</option>
                      <option value="CASH">نقداً</option>
                      <option value="ONLINE_BANKING">تحويل بنكي</option>
                      <option value="AUTO_PAY">دفع آلي</option>
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
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoryId(cat.id.toString())}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all active:scale-95 group
                      ${
                        categoryId === cat.id.toString()
                          ? "bg-[#131b2e] border-[#131b2e] text-white shadow-md"
                          : "border-slate-50 bg-slate-50/50 hover:bg-slate-50 text-slate-600 hover:border-slate-200"
                      }`}
                  >
                    <span className="material-symbols-outlined mb-1">
                      {getCategoryIcon(cat.name)}
                    </span>
                    <span className="text-[10px] font-bold">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Smart Hint */}
      {smartTip && (
        <div className="mt-8 bg-[#6cf8bb]/10 rounded-2xl p-6 border border-[#6cf8bb]/20 flex items-center gap-5 hover:bg-[#6cf8bb]/20 transition-all cursor-pointer group">
          <div className="bg-[#6cf8bb] p-3 rounded-2xl text-[#00714d] group-hover:rotate-12 transition-transform">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
          <div>
            <h4 className="font-bold text-[#00714d] text-sm">
              تلميح ذكي من سديد
            </h4>
            <p className="text-xs text-[#00714d]/80 leading-relaxed">
              {smartTip}
            </p>
          </div>
        </div>
      )}

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 lg:right-64 bg-white/80 backdrop-blur-md border-t border-slate-100 p-4 z-40 flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-[2] bg-black text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all shadow-xl shadow-black/10 disabled:opacity-50"
        >
          {loading ? "جاري الحفظ..." : "حفظ العملية"}
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 active:scale-95 transition-all"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
}