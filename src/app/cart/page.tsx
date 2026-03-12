'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Tu carrito está vacío</h1>
        <p className="text-gray-500">¡Explora nuestra colección y añade algunos jeans increíbles!</p>
        <Link 
          href="/products" 
          className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all"
        >
          Ver Colección
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center p-4 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                </div>
                <div className="ml-6 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Talla: {item.size} | Color: {item.color}
                        {item.isWholesale && <span className="ml-2 text-purple-600 font-bold">(Mayorista)</span>}
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-gray-200 rounded-full">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-full"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-full"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-500 font-medium">Gratis</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              
              <Link 
                href="/checkout" 
                className="block w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Ir a Pagar</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
