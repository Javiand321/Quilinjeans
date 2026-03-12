'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] h-auto w-full bg-gradient-to-br from-purple-50 via-white to-pink-50 overflow-hidden flex items-center pt-24 md:pt-0 pb-12 md:pb-0">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-yellow-100/50 via-pink-100/50 to-purple-100/50 rounded-bl-[100px] z-0 opacity-60" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row items-center gap-8 md:gap-0">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm text-purple-500 font-medium text-xs md:text-sm mb-4 border border-purple-100">
              <Sparkles size={16} />
              <span>Arte & Estilo</span>
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Dale estilo a donde lo coloques
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto md:mx-0 pt-4">
              Descubre una fusión única de arte y moda. Piezas vibrantes y llenas de vida que transforman tu look y tu espacio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
          >
            <Link 
              href="/products" 
              className="bg-gray-900 text-white px-8 py-3 md:py-4 rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2 group text-sm md:text-base"
            >
              <span>Ver Colección</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="bg-white text-gray-900 px-8 py-3 md:py-4 rounded-full font-bold shadow-md hover:shadow-lg border border-gray-100 transition-all text-center text-sm md:text-base"
            >
              Conócenos
            </Link>
          </motion.div>
        </div>

        {/* Image Content */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative mt-8 md:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-xs md:max-w-md aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-pink-400 to-purple-500 rounded-full rotate-6 transform translate-x-4 translate-y-4 opacity-40 blur-2xl" />
            {/* User provided image placeholder */}
            <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl z-10 overflow-hidden flex items-center justify-center border-4 border-white">
                <img 
                 src="/hero-unicorn.jpg" 
                 alt="Unicorn Quilling Art Inspiration" 
                 className="w-full h-full object-contain bg-purple-50"
                 onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   target.src = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop";
                 }}
               />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-transparent transition-colors">
                  {/* Overlay text if needed, currently clean */}
              </div>
            </div>
            
            {/* Floating Badges Removed */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
