'use client';

import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingBag, Share2, Facebook, Instagram, Video, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function WholesaleProductPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(15);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Producto no encontrado</div>;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla para el lote');
      return;
    }
    if (!selectedColor) {
      alert('Por favor selecciona un color para el lote');
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.wholesalePrice || product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
      isWholesale: true,
    });

    alert(`¡Agregado al pedido mayorista!\nProducto: ${product.name}\nTalla: ${selectedSize}\nColor: ${selectedColor}\nCantidad: ${quantity}\nTotal: $${((product.wholesalePrice || product.price) * quantity).toLocaleString()}`);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setQuantity(val);
  };

  const isValidQuantity = quantity >= 15;

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-purple-50 py-4 mb-8 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center text-purple-800 text-sm font-medium">
          <AlertCircle size={16} className="mr-2" />
          Modo Mayorista: Compra mínima de 15 unidades para acceder a estos precios.
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-lg border-2 border-purple-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';
                }}
              />
              <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                PRECIO MAYORISTA
              </div>
              
              {product.video && (
                <a 
                  href={product.video} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-purple-50 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  <Video size={16} className="text-purple-500" />
                  <span>Ver Video</span>
                </a>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <nav className="flex items-center text-sm text-gray-500 mb-6">
              <Link href="/" className="hover:text-purple-500">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/wholesale" className="hover:text-purple-500 font-medium text-purple-600">Mayoristas</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-end space-x-4 mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Precio por unidad (Mayorista)</p>
                <p className="text-3xl font-bold text-purple-600">${(product.wholesalePrice || product.price).toLocaleString()}</p>
              </div>
              <div className="pb-1">
                <p className="text-sm text-gray-400 line-through">${product.price.toLocaleString()}</p>
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
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-110'
                        : 'border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
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

            {/* Quantity & Actions */}
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <label className="font-medium text-gray-900">Cantidad (Mín. 15):</label>
                <div className="flex items-center bg-white rounded-lg border border-gray-200">
                  <button 
                    onClick={() => setQuantity(q => Math.max(15, q - 1))}
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="15"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-16 text-center py-2 focus:outline-none font-bold text-gray-900"
                  />
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm mb-6 pb-6 border-b border-gray-200">
                <span className="text-gray-500">Total estimado:</span>
                <span className="text-xl font-bold text-gray-900">${((product.wholesalePrice || product.price) * quantity).toLocaleString()}</span>
              </div>

              <div className="flex gap-4">
                <button 
                  disabled={!isValidQuantity}
                  onClick={handleAddToCart}
                  className={`flex-1 px-8 py-4 rounded-full font-bold shadow-lg flex items-center justify-center space-x-2 transition-all ${
                    isValidQuantity 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag size={20} />
                  <span>{isValidQuantity ? 'Comprar Lote' : 'Mínimo 15 Unidades'}</span>
                </button>
              </div>
              {!isValidQuantity && (
                <p className="text-red-500 text-xs mt-3 text-center">
                  Debes seleccionar al menos 15 unidades para acceder al precio mayorista.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
