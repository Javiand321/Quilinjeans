'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { Filter, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

function WholesaleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  const { products } = useProducts();
  const { user } = useAuth();
  
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  // Protect route - redirect to register if not a wholesaler
  useEffect(() => {
    // Small delay to allow hydration
    const timer = setTimeout(() => {
      if (!user || user.role !== 'wholesaler') {
        router.push('/wholesale/register');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [user, router]);

  if (!user || user.role !== 'wholesaler') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <Lock className="w-16 h-16 text-purple-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Restringido</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Esta sección es exclusiva para mayoristas registrados.
        </p>
        <Link 
          href="/wholesale/register"
          className="bg-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all"
        >
          Registrarme como Mayorista
        </Link>
      </div>
    );
  }

  useEffect(() => {
    if (categoryParam) {
      const formatted = decodeURIComponent(categoryParam);
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
      <div className="bg-purple-50 py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo Mayorista</h1>
          <p className="text-gray-600">Precios exclusivos para compras al por mayor (Mínimo 15 unidades)</p>
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
                  ? 'bg-purple-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                <Link href={`/wholesale/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-gray-100">
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
                  <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                    MAYORISTA
                  </div>
                </Link>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{product.category}</span>
                    <Link href={`/wholesale/${product.id}`}>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mt-1">
                        {product.name}
                      </h3>
                    </Link>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">${product.price.toLocaleString()}</span>
                        <span className="text-xl font-bold text-purple-600">${(product.wholesalePrice || product.price).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No encontramos productos en esta categoría.</p>
            <button 
              onClick={() => setActiveCategory('Todos')}
              className="mt-4 text-purple-600 font-medium hover:underline"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WholesalePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando catálogo mayorista...</div>}>
      <WholesaleContent />
    </Suspense>
  );
}
