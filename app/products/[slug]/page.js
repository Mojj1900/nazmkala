import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlugDb } from "@/lib/queries";
import { formatToman } from "@/lib/data";
import AddToCartBox from "./AddToCartBox";

export default async function ProductDetailPage({ params }) {
  const product = await getProductBySlugDb(params.slug);
  if (!product) return notFound();

  return (
    <div className="container-app py-10">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-mint">
          <Image src={product.image} alt={product.title} fill className="object-cover" />
        </div>

        <div>
          <h1 className="mb-2 text-xl font-bold text-gray-800">{product.title}</h1>
          <div className="mb-4 flex items-center gap-1 text-sm text-amber-500">
            {"★".repeat(Math.round(product.rating))}
            <span className="text-gray-400">({product.rating})</span>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            {product.oldPrice && (
              <span className="text-gray-400 line-through">{formatToman(product.oldPrice)}</span>
            )}
            <span className="text-2xl font-bold text-brand-tealDark">{formatToman(product.price)}</span>
          </div>

          <p className="mb-6 leading-7 text-gray-500">{product.description}</p>

          <div className="mb-6 text-sm text-gray-500">
            موجودی انبار: <span className="font-medium text-gray-700">{product.stock} عدد</span>
          </div>

          <AddToCartBox product={product} />
        </div>
      </div>
    </div>
  );
}
