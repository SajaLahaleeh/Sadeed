"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 p-4 bg-white rounded-[2.5rem] overflow-hidden shadow-[0px_20px_60px_rgba(0,0,0,0.05)] border border-slate-100">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <div className="mb-10">
              <h1 className="text-3xl font-black text-slate-900 mb-3 text-right">
                تسجيل الدخول
              </h1>
              <p className="text-slate-500 font-medium text-right">
                أهلاً بك مجدداً في سديد. يرجى إدخال بياناتك للمتابعة.
              </p>
            </div>

            <form className="space-y-5 p-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4 my-4">
                <label className="text-xs mt-4 font-bold text-slate-400 block px-1 text-right">
                  البريد الإلكتروني
                </label>
                <input
                  className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none font-medium"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div className="space-y-4 my-4">
                <div className="flex justify-between items-center px-1 my-4 flex-row-reverse">
                  <label className="text-xs font-bold mt-4 text-slate-400 block text-right">
                    كلمة المرور
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-bold text-[#006c49] hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>
                <div className="relative text-start">
                  <input
                    className="w-full px-5 py-4 rounded-2xl mb-8 border border-slate-100 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none font-medium"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black transition-colors"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </button>
                </div>
              </div>

              <button className="w-full bg-black text-white py-8 rounded-2xl font-bold text-lg active:scale-[0.98] transition-all mt-4 shadow-xl shadow-black/10">
                تسجيل الدخول
              </button>
            </form>


            <p className="mt-10 text-center font-bold text-sm text-slate-500">
              ليس لديك حساب؟{" "}
              <Link className="text-[#006c49] hover:underline" href="/register">
                أنشئ حساباً جديداً
              </Link>
            </p>
          </div>

          <div className="hidden md:flex relative bg-[#131b2e] p-16 flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6cf8bb] opacity-10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#006c49] opacity-20 rounded-full -ml-48 -mb-48 blur-3xl"></div>

            <div className="relative z-10 text-right">
              <div className="w-14 h-14 bg-[#6cf8bb] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#6cf8bb]/20 mr-auto md:mr-0 md:ml-auto">
                <span
                  className="material-symbols-outlined text-[#00714d] text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_balance_wallet
                </span>
              </div>
              <h2 className="text-4xl font-black text-white mb-6 leading-[1.2]">
                استثمر في مستقبلك بذكاء وأمان.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm ml-auto">
                سديد يوفر لك الأدوات اللازمة لإدارة ثروتك بكل وضوح، مع تقارير
                ذكية وتنبيهات فورية لصحتك المالية.
              </p>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem]">
              <div className="flex items-center gap-4 flex-row-reverse">
                <div className="flex -space-x-3 space-x-reverse">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-[#131b2e] bg-slate-400 overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/150?img=${i + 10}`}
                        alt="user avatar"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-white text-right">
                  <p className="text-sm font-bold">انضم إلى +50,000 مستخدم</p>
                  <div className="flex items-center text-[#6cf8bb] gap-0.5 flex-row-reverse">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="ml-2 text-white/60 text-[10px] font-bold">
                      4.9/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
