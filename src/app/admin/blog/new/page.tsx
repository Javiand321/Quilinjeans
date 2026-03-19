'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBlog } from '@/context/BlogContext';
import Link from 'next/link';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function NewBlogPostPage() {
  const router = useRouter();
  const { addPost } = useBlog();
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Quilin Jeans',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addPost({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      image: formData.image || 'https://images.unsplash.com/photo-1542272604-780c968509ef?w=800&auto=format&fit=crop&q=60',
      author: formData.author,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    });

    alert('Artículo publicado exitosamente');
    router.push('/admin/blog');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/blog" className="text-gray-400 hover:text-gray-900 transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Nuevo Artículo</h1>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Título del Artículo</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Ej: Las 5 tendencias en jeans para este año"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Resumen (Excerpt)</label>
              <textarea
                required
                rows={2}
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="Un breve resumen de 2 líneas para mostrar en la lista de artículos..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Contenido (Admite HTML básico)</label>
              <textarea
                required
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                placeholder="<p>Escribe el contenido aquí. Puedes usar etiquetas HTML como <h3> para subtítulos o <br/> para saltos de línea.</p>"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">URL de la Imagen Principal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <ImageIcon size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Etiquetas (separadas por coma)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  placeholder="Tendencias, Moda, 2026"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Save size={20} />
                <span>Publicar Artículo</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
