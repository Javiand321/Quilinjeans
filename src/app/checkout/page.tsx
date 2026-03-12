'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle, Truck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pago Exitoso!</h2>
          <p className="text-gray-500 mb-8">
            Tu pedido ha sido confirmado. Te enviaremos un correo con los detalles del envío.
          </p>
          <Link 
            href="/" 
            className="block w-full bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
          >
            Volver a la tienda
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Tu carrito está vacío</h1>
        <Link 
          href="/products" 
          className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all"
        >
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Order Items Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
               <h2 className="text-xl font-bold text-gray-900 mb-4">Tu Pedido</h2>
               <div className="space-y-4">
                 {cart.map((item) => (
                   <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-16 bg-gray-100 rounded-md overflow-hidden relative">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';
                            }}
                          />
                        </div>
                        <div>
                         <p className="font-bold text-gray-900">{item.name}</p>
                         <p className="text-sm text-gray-500">{item.quantity} x ${item.price.toLocaleString()}</p>
                         <p className="text-xs text-gray-400">Talla: {item.size} | Color: {item.color}</p>
                       </div>
                     </div>
                     <p className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Truck className="mr-2 text-pink-500" />
                Datos de Envío
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
                <input type="text" placeholder="Apellido" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
                <input type="email" placeholder="Email" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:col-span-2" />
                <input type="text" placeholder="Dirección" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:col-span-2" />
                <input type="text" placeholder="Ciudad" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
                <input type="text" placeholder="Código Postal" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CreditCard className="mr-2 text-pink-500" />
                Método de Pago
              </h2>
              <div className="space-y-4">
                <div className="border border-pink-500 bg-pink-50 rounded-xl p-4 flex items-center justify-between cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border-4 border-pink-500 mr-3"></div>
                    <span className="font-medium text-gray-900">Tarjeta de Crédito / Débito</span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4 flex items-center cursor-pointer hover:border-gray-300">
                  <div className="w-4 h-4 rounded-full border border-gray-300 mr-3"></div>
                  <span className="font-medium text-gray-900">PayPal</span>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="relative">
                    <input type="text" placeholder="Número de tarjeta" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full pl-10" />
                    <CreditCard className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <input type="text" placeholder="MM/YY" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
                    <input type="text" placeholder="CVC" className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumen del Pedido</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-500 font-medium">Gratis</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <span className="animate-pulse">Procesando...</span>
                ) : (
                  <>
                    <ShieldCheck size={20} className="mr-2" />
                    Pagar Ahora
                  </>
                )}
              </button>
              
              <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center">
                <ShieldCheck size={14} className="mr-1" />
                Pagos 100% seguros y encriptados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
