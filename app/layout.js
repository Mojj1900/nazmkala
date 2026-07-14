import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import { getSettings } from "@/lib/queries";

export async function generateMetadata() {
  const settings = await getSettings();
  return {
    title: `${settings.storeName} | فروشگاه لوازم خانگی و نظم‌دهنده‌ها`,
    description: settings.tagline,
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <Header storeName={settings.storeName} />
          <main className="min-h-[70vh]">{children}</main>
          <Footer storeName={settings.storeName} tagline={settings.tagline} />
          <WhatsappButton />
        </CartProvider>
      </body>
    </html>
  );
}
