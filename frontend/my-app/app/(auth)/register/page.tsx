"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex flex-col p-2 font-['Noto_Kufi_Arabic']">
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0px_16px_32px_rgba(19,27,46,0.04)] border border-slate-100">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-black mb-2">
                إنشاء حساب جديد
              </h1>
              <p className="text-slate-500 font-medium">
                ابدأ رحلتك نحو التميز المالي اليوم
              </p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  الاسم الكامل
                </label>
                <div className="relative group">
                  
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium placeholder:text-slate-300"
                    placeholder="أدخل اسمك بالكامل"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  البريد الإلكتروني
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium text-right placeholder:text-slate-300"
                   
                    placeholder="example@domain.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  كلمة المرور
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium text-right placeholder:text-slate-300"
                   
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-black transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  تأكيد كلمة المرور
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium text-right placeholder:text-slate-300"
                   
                    placeholder="••••••••"
                    type="password"
                  />
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 flex-row-reverse">
                <div className="mt-1">
                  <input
                    className="w-5 h-5 rounded-lg border-slate-200 text-[#006c49] focus:ring-[#6cf8bb] transition-all cursor-pointer"
                    id="terms"
                    type="checkbox"
                  />
                </div>
                <label
                  className="text-[11px] font-bold text-slate-500 cursor-pointer text-right leading-relaxed"
                  htmlFor="terms"
                >
                  أوافق على{" "}
                  <Link className="text-[#006c49] hover:underline" href="#">
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link className="text-[#006c49] hover:underline" href="#">
                    سياسة الخصوصية
                  </Link>{" "}
                  الخاصة بـ Sadeed Finance.
                </label>
              </div>

              <button
                className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all active:scale-[0.98] shadow-xl shadow-black/10 mt-2"
                type="submit"
              >
                إنشاء حساب
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
              <p className="text-sm font-bold text-slate-400">
                لديك حساب بالفعل؟
                <Link
                  className="text-black font-black hover:underline mr-2"
                  href="/login"
                >
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </div>

        </div>
      </main>
    </main>
  );
}
