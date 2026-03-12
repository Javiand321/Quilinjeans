'use client';

import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductContext";
import Link from "next/link";
import { ArrowRight, Instagram, Video } from "lucide-react";

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-white">
      <Hero />
      
      {/* Featured Products */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4 sm:gap-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Lo Más Nuevo</h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">Recién llegado para ti</p>
          </div>
          <Link href="/products" className="text-pink-500 font-medium hover:text-pink-600 flex items-center space-x-1">
            <span>Ver todo</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Social Media Section */}
      <section className="bg-pink-50 py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-white px-4 py-1 rounded-full text-purple-500 text-sm font-bold mb-6 shadow-sm">
            @QUILIN
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 md:mb-8">
            Únete a la Comunidad
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">
            Síguenos en TikTok, Instagram y Facebook para ver los mejores outfits, 
            videos divertidos y enterarte de las promociones antes que nadie.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 flex-wrap">
            <a href="#" className="flex items-center space-x-3 bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 justify-center sm:justify-start">
              <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white p-2 rounded-lg">
                <Instagram size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium">Síguenos en</p>
                <p className="font-bold text-gray-900">Instagram</p>
              </div>
            </a>
            
            <a href="#" className="flex items-center space-x-3 bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="bg-black text-white p-2 rounded-lg">
                <Video size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium">Mira videos en</p>
                <p className="font-bold text-gray-900">TikTok</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      
      {/* Newsletter / CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Lista para estrenar?
            </h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">
              Compra tus jeans favoritos hoy y recíbelos en la puerta de tu casa.
              Envíos gratis por compras superiores a $150.000.
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-bold shadow-lg hover:bg-pink-500 hover:text-white transition-all"
            >
              Comprar Ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
