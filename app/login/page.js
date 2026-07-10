"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStep("code");
      } else {
        setError(data.message || "خطایی رخ داد.");
      }
    } catch (e) {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/profile");
        router.refresh();
      } else {
        setError(data.message || "کد اشتباه است.");
      }
    } catch (e) {
      setError("ارتباط با سرور برقرار نشد.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-app flex min-h-[60vh] items-center justify-center py-10">
      <div className="card w-full max-w-sm p-6">
        <h1 className="mb-6 text-center text-lg font-bold text-gray-800">ورود / ثبت‌نام</h1>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        {step === "phone" ? (
          <form onSubmit={sendCode} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-600">شماره موبایل</label>
              <input
                required
                type="tel"
                dir="ltr"
                placeholder="09xxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? "در حال ارسال..." : "دریافت کد تایید"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="space-y-4">
            <p className="text-center text-sm text-gray-500">
              کد ارسال شده به {phone} را وارد کنید
            </p>
            <input
              required
              dir="ltr"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="- - - - -"
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-center text-lg tracking-widest outline-none focus:border-brand-teal"
            />
            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? "در حال بررسی..." : "ورود"}
            </button>
            <button
              type="button"
              onClick={() => setStep("phone")}
              className="w-full text-center text-xs text-gray-400 hover:text-brand-teal"
            >
              تغییر شماره موبایل
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
