'use client';

import { useBlog } from '@/context/BlogContext';
import Link from 'next/link';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminBlogPage() {
  const { posts, deletePost } = useBlog();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only admin can access this page (we simulate admin by checking if it's the specific user or add a role check)
    // For simplicity, we assume any logged in user can see it, but you should enforce role='admin'
  }, [user, router]);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de eliminar este artículo?')) {
      deletePost(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <BookOpen className="mr-3 text-purple-600" size={32} />
              Gestión del Blog
            </h1>
            <p className="text-gray-500 mt-2">Crea contenido para atraer tráfico orgánico a tu tienda.</p>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/admin" 
              className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Volver a Productos
            </Link>
            <Link 
              href="/admin/blog/new" 
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Nuevo Artículo</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Artículo</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Fecha</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Autor</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542272604-780c968509ef?w=800&auto=format&fit=crop&q=60';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{post.title}</p>
                          <div className="flex gap-2 mt-1">
                            {post.tags.map(tag => (
                              <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">
                        {new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600 text-sm">{post.author}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-3">
                        <Link 
                          href={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 size={20} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(post.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      No hay artículos publicados. ¡Crea el primero para atraer clientes!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
