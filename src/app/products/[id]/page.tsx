'use client';

import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingBag, Share2, Facebook, Instagram, Video } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    if (!selectedColor) {
      alert('Por favor selecciona un color');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
      isWholesale: false,
    });

    alert(`¡Añadido al carrito!\nProducto: ${product.name}\nTalla: ${selectedSize}\nColor: ${selectedColor}\nPrecio: $${product.price.toLocaleString()}`);
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
              {/* Usamos img estándar para evitar crasheos con rutas locales copiadas erróneamente */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';
                }}
              />
              {/* Video Badge if applicable */}
              {product.video && (
                <a 
                  href={product.video} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
                >
                  <Video size={16} className="text-pink-500" />
                  <span>Ver Video</span>
                </a>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-pink-500">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-pink-500">Jeans</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <p className="text-2xl font-bold text-pink-500">${product.price.toLocaleString()}</p>
              <div className="flex items-center text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} className={i < Math.floor(product.rating) ? "" : "text-gray-300"} />
                ))}
                <span className="text-gray-400 ml-2">({product.rating})</span>
              </div>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Talla: <span className="text-purple-600 font-bold">{selectedSize}</span></h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all font-medium ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-110'
                        : 'border-gray-200 text-gray-600 hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <Link href="/size-guide" className="text-xs text-gray-400 mt-2 hover:text-pink-500 underline block">
                Guía de tallas
              </Link>
            </div>

            {/* Colors */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Color: <span className="text-purple-600 font-bold">{selectedColor}</span></h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                      selectedColor === color 
                        ? 'border-purple-600 ring-2 ring-purple-600 ring-offset-2' 
                        : 'border-gray-200 hover:border-purple-500'
                    }`}
                    title={color}
                  >
                    <span 
                      className="w-8 h-8 rounded-full border border-gray-100 shadow-sm"
                      style={{
                        backgroundColor: 
                          color === 'Negro' ? '#000000' :
                          color === 'Blanco' ? '#ffffff' :
                          color === 'Azul Claro' ? '#a4dbf3' :
                          color === 'Azul Medio' ? '#60a5fa' :
                          color === 'Azul Oscuro' ? '#1e3a8a' :
                          color === 'Beige' ? '#f5f5dc' :
                          color === 'Gris' ? '#9ca3af' :
                          color === 'Verde Militar' ? '#4b5320' :
                          color === 'Azul Hielo' ? '#e0f2fe' :
                          '#e5e7eb' // Default gray
                      }}
                    />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingBag size={20} />
                <span>Añadir al Carrito</span>
              </button>
              <button className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-pink-500 hover:border-pink-500 transition-all">
                <Share2 size={20} />
              </button>
            </div>

            {/* Social Share */}
            <div className="border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-500 mb-4 font-medium">Compartir este look:</p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Facebook size={24} />
                </button>
                <button className="text-gray-400 hover:text-pink-600 transition-colors">
                  <Instagram size={24} />
                </button>
                {/* TikTok mock */}
                <button className="text-gray-400 hover:text-black transition-colors">
                   <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
