export default function ContactPage() {
  return (
    <div className="container-app py-10">
      <h1 className="mb-6 text-xl font-bold text-gray-800">تماس با ما</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <form className="card space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm text-gray-600">نام</label>
            <input className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">ایمیل یا شماره تماس</label>
            <input className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-600">پیام شما</label>
            <textarea rows={4} className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-brand-teal" />
          </div>
          <button className="btn-primary w-full">ارسال پیام</button>
        </form>

        <div className="card space-y-3 p-6 text-sm text-gray-600">
          <div>📍 آدرس: ایران</div>
          <div>📞 تلفن: 021 1234 5678</div>
          <div>✉️ ایمیل: info@nazmkala.com</div>
          <div>📱 اینستاگرام: nazmkala@</div>
        </div>
      </div>
    </div>
  );
}
