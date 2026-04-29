import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#fcf8fa] text-[#1b1b1d] font-['Manrope']">
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-white border-b border-slate-200 shadow-sm">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              Sadeed
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
            >
              تسجيل الدخول
            </Link>

            <button className="p-2 hover:bg-slate-50 rounded-full">
              <span className="material-symbols-outlined text-slate-900">
                notifications
              </span>
            </button>
            <button className="p-2 hover:bg-slate-50 rounded-full">
              <span className="material-symbols-outlined text-slate-900">
                account_circle
              </span>
            </button>
          </div>
        </header>

        <aside className="hidden lg:flex flex-col fixed right-0 top-0 h-full w-64 p-4 gap-2 bg-white border-l border-slate-200 z-40">
          <div className="flex flex-col gap-1 mb-8 mt-16 px-2">
            <h1 className="text-xl font-extrabold text-slate-900">Sadeed</h1>
          </div>
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-900 rounded-lg font-semibold transition-colors"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">لوحة التحكم</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors border-t border-slate-50 mt-2"
            >
              <span className="material-symbols-outlined">login</span>
              <span className="text-sm font-semibold">تسجيل الدخول</span>
            </Link>

            <Link
              href="/forecasts"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">calendar_month</span>
              <span className="text-sm font-semibold">التوقعات</span>
            </Link>

            <Link
              href="/add-transaction"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">add_box</span>
              <span className="text-sm font-semibold">إضافة عملية</span>
            </Link>

            <Link
              href="/awareness"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">calculate</span>
              <span className="text-sm font-semibold">الوعي المالي</span>
            </Link>

            <Link
              href="/analytics"
              className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined">insights</span>
              <span className="text-sm font-semibold">التحليلات</span>
            </Link>
          </nav>
        </aside>

        <main className="lg:mr-64 pt-24 px-6 pb-20">{children}</main>

        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center h-16 z-50">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 text-slate-900"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-[10px] font-bold">الرئيسية</span>
          </Link>

          <Link
            href="/analytics"
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <span className="material-symbols-outlined">insights</span>
            <span className="text-[10px]">التحليلات</span>
          </Link>

          <div className="relative -top-4">
            <Link
              href="/add-transaction"
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined">add</span>
            </Link>
          </div>

          <Link
            href="/awareness"
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <span className="material-symbols-outlined">
              account_balance_wallet
            </span>
            <span className="text-[10px]">الميزانية</span>
          </Link>
        </nav>
      </body>
    </html>
  );
}
