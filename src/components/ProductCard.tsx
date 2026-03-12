'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Video } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hasVideo?: boolean;
  category: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {/* Usamos img estándar para mayor compatibilidad con URLs externas o locales manuales */}
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            onError={(e: any) => {
              e.target.src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';
            }}
          />
          
          {product.hasVideo && (
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-pink-500">
              <Video size={16} />
            </div>
          )}
          
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center">
            <button className="bg-white text-gray-900 font-medium py-2 px-6 rounded-full shadow-lg hover:bg-pink-500 hover:text-white transition-colors flex items-center space-x-2 text-sm">
              <ShoppingCart size={16} />
              <span>Ver Detalles</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-xs text-pink-500 font-medium mb-1 uppercase tracking-wider">{product.category}</p>
          <h3 className="text-gray-900 font-bold text-lg mb-1 truncate">{product.name}</h3>
          <p className="text-gray-500 text-sm font-medium">${product.price.toLocaleString()}</p>
        </div>
      </motion.div>
    </Link>
  );
}
