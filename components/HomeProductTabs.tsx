'use client';

import { useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
}

export default function HomeProductTabs({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState("همه");

  const tabs = ["همه", "پرفروش", "جدید", "فروش ویژه"];

  const filteredProducts = activeTab === "همه" 
    ? products 
    : activeTab === "فروش ویژه" 
    ? products.filter(p => p.oldPrice) 
    : products; // بعداً منطق پرفروش و جدید اضافه میشه

  return (
    <section className="container mx-auto px-6 py-12 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">ترین‌های رامش‌کالا</h2>
        
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition relative ${activeTab === tab 
                ? 'text-brand-teal border-b-2 border-brand-teal' 
                : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}