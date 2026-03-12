'use client';

import { useProducts } from '@/context/ProductContext';
import Link from 'next/link';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

export default function AdminDashboard() {
  const { products, deleteProduct } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-500 mt-2">Gestiona tu catálogo de productos</p>
          </div>
          <Link 
            href="/admin/new" 
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nuevo Producto</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Categoría</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio Detal</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Precio Mayorista</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                          {/* Usamos img normal para evitar errores de Next.js con rutas locales o inválidas */}
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium text-purple-600">
                      ${(product.wholesalePrice || product.price).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <Link 
                          href={`/admin/edit/${product.id}`}
                          className="text-blue-400 hover:text-blue-600 transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay productos en el catálogo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
