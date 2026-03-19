'use client';

import { useBlog } from '@/context/BlogContext';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PublicBlogPage() {
  const { posts } = useBlog();

  return (
    <div className="min-h-screen bg-gray-50 pt-12 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">El Blog de Quilin</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Noticias, tendencias, consejos de estilo y todo lo que necesitas saber sobre el mundo del denim y la moda.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Próximamente</h2>
            <p className="text-gray-500">Estamos preparando artículos increíbles para ti. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542272604-780c968509ef?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {new Date(post.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-purple-600 font-bold hover:text-purple-700 group/link mt-auto"
                  >
                    <span>Leer Artículo</span>
                    <ArrowRight size={18} className="ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
