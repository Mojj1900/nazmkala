export default function WhatsappButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const href = number ? `https://wa.me/${number}` : "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition hover:scale-105"
      aria-label="گفتگو در واتساپ"
    >
      💬
    </a>
  );
}
