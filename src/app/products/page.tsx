'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { products } = useProducts();
  
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  useEffect(() => {
    if (categoryParam) {
      // Decode URI component to handle spaces and special chars
      const formatted = decodeURIComponent(categoryParam);
      // Case insensitive match
      const foundCategory = categories.find(c => c.toLowerCase() === formatted.toLowerCase());
      
      if (foundCategory) {
        setActiveCategory(foundCategory);
      } else {
        setActiveCategory('Todos');
      }
    }
  }, [categoryParam]);

  const categories = ['Todos', 'Jeans', 'Bragas', 'Falda short', 'Short', 'Conjunto 1 (Chaqueta y jeans)', 'Conjunto 2 (Chaqueta y Short)'];

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-pink-50 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestra Colección</h1>
          <p className="text-gray-600">Encuentra el fit perfecto para tu estilo</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 text-gray-500 mr-4">
            <Filter size={20} />
            <span className="font-medium">Filtrar por:</span>
          </div>
          
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-pink-500 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-pink-300 hover:text-pink-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No encontramos productos en esta categoría.</p>
            <button 
              onClick={() => setActiveCategory('Todos')}
              className="mt-4 text-pink-500 font-medium hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
