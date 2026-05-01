"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate full name
    if (!fullName.trim()) {
      setError("الرجاء إدخال الاسم الكامل");
      setLoading(false);
      return;
    }

    // Validate email
    if (!email.trim()) {
      setError("الرجاء إدخال البريد الإلكتروني");
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("كلمة المرور غير متطابقة");
      setLoading(false);
      return;
    }

    // Check terms acceptance
    if (!termsAccepted) {
      setError("الرجاء الموافقة على الشروط والأحكام");
      setLoading(false);
      return;
    }

    try {
      // Call backend API
      await api.register(fullName, email, password);
      
      // Redirect to login page on success
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col p-2 font-['Noto_Kufi_Arabic']">
      <div className="flex-grow flex items-center justify-center px-6 py-12">
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

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  الاسم الكامل
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium placeholder:text-slate-300 text-right"
                    placeholder="أدخل اسمك بالكامل"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  البريد الإلكتروني
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium placeholder:text-slate-300 text-right"
                    placeholder="example@domain.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  كلمة المرور
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium placeholder:text-slate-300 text-right"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 block px-1 text-right">
                  تأكيد كلمة المرور
                </label>
                <div className="relative group">
                  <input
                    className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-black focus:border-transparent focus:bg-white transition-all outline-none text-sm font-medium placeholder:text-slate-300 text-right"
                    placeholder="••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-black transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start gap-3 py-2 flex-row-reverse">
                <div className="mt-1">
                  <input
                    className="w-5 h-5 rounded-lg border-slate-200 text-[#006c49] focus:ring-[#6cf8bb] transition-all cursor-pointer"
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
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
                className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-slate-900 transition-all active:scale-[0.98] shadow-xl shadow-black/10 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
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
      </div>
    </main>
  );
}