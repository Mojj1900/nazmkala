import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";

export const metadata = {
  title: "رامش‌کالا | فروشگاه لوازم خانگی و نظم‌دهنده‌ها",
  description: "هر خانه‌ای، شایسته آرامش و نظم است.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <WhatsappButton />
        </CartProvider>
      </body>
    </html>
  );
}
