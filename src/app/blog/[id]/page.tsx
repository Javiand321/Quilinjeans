'use client';

import { useBlog } from '@/context/BlogContext';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BlogPostPage() {
  const { id } = useParams();
  const { posts } = useBlog();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Wait for posts to load (if using localStorage it might be empty on first render)
  // For simplicity, we just find the post
  const post = posts.find(p => p.id === id);

  if (!post && posts.length > 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Artículo no encontrado</h1>
        <Link href="/blog" className="text-purple-600 hover:underline">Volver al blog</Link>
      </div>
    );
  }

  if (!post) return <div className="min-h-screen bg-white"></div>;

  const handleShare = (platform: 'facebook' | 'whatsapp') => {
    const text = `Te recomiendo este artículo: ${post.title}`;
    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + currentUrl)}`, '_blank');
    }
  };

  return (
    <article className="min-h-screen bg-white pb-24">
      {/* Hero Image */}
      <div className="relative w-full h-[40vh] md:h-[60vh] bg-gray-900">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover opacity-60"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542272604-780c968509ef?w=800&auto=format&fit=crop&q=60';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver al Blog
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center text-white/80 text-sm space-x-6">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(post.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Main Article */}
          <div className="md:w-3/4">
            <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10 italic border-l-4 border-purple-500 pl-6">
              {post.excerpt}
            </p>
            
            {/* The actual content (using dangerouslySetInnerHTML because it's an admin-controlled WYSIWYG concept) */}
            <div 
              className="prose prose-lg prose-purple max-w-none text-gray-700
                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-10 prose-headings:mb-4
                prose-p:mb-6 prose-p:leading-relaxed
                prose-a:text-purple-600 prose-a:font-bold hover:prose-a:text-purple-700
                prose-img:rounded-2xl prose-img:shadow-lg
                prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Sidebar / Actions */}
          <div className="md:w-1/4">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                Compartir
              </h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center w-full bg-[#1877F2] text-white py-3 rounded-xl font-medium hover:bg-[#1864D9] transition-colors"
                >
                  <Facebook size={18} className="mr-2" />
                  Facebook
                </button>
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center w-full bg-[#25D366] text-white py-3 rounded-xl font-medium hover:bg-[#20BD5A] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  WhatsApp
                </button>
              </div>

              <div className="mt-12 p-6 bg-purple-50 rounded-2xl border border-purple-100">
                <h3 className="font-bold text-gray-900 mb-2">¿Te gustó el artículo?</h3>
                <p className="text-sm text-gray-600 mb-4">Descubre la colección que inspiró este post.</p>
                <Link 
                  href="/products"
                  className="block text-center bg-gray-900 text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                >
                  Ver Colección
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
