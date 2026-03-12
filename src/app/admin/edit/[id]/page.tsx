'use client';

import { useProducts } from '@/context/ProductContext';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { products, updateProduct } = useProducts();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    wholesalePrice: '',
    description: '',
    category: 'Mom',
    image: '',
    video: '',
    sizes: [] as string[],
    colors: [] as string[],
  });

  useEffect(() => {
    if (id) {
      const product = products.find((p) => p.id === id);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          wholesalePrice: (product.wholesalePrice || product.price).toString(),
          description: product.description,
          category: product.category,
          image: product.image,
          video: product.video || '',
          sizes: product.sizes,
          colors: product.colors,
        });
      }
    }
  }, [id, products]);

  const categories = ['Jeans', 'Bragas', 'Falda short', 'Short', 'Conjunto 1 (Chaqueta y jeans)', 'Conjunto 2 (Chaqueta y Short)'];
  const availableSizes = ['4', '6', '8', '10', '12', '14', '16'];
  const availableColors = ['Azul Claro', 'Azul Medio', 'Azul Oscuro', 'Negro', 'Blanco', 'Beige', 'Gris'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Default image if none provided
    const imageToUse = formData.image || 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=60';

    updateProduct(id as string, {
      name: formData.name,
      price: Number(formData.price),
      wholesalePrice: Number(formData.wholesalePrice) || Number(formData.price),
      description: formData.description,
      category: formData.category as any,
      image: imageToUse,
      video: formData.video,
      sizes: formData.sizes,
      colors: formData.colors,
    });

    router.push('/admin');
  };

  const toggleSize = (size: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/admin" className="text-gray-500 hover:text-gray-900 flex items-center mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Volver al Panel
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm p-8 space-y-8">
          {/* Basic Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Información Básica</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Nombre del Producto</label>
                <input 
                  type="text" 
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Ej: Mom Jeans Vintage"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Precio (Detal)</label>
                <input 
                  type="number" 
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  placeholder="Ej: 89900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Precio Mayorista (x15)</label>
                <input 
                  type="number" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.wholesalePrice}
                  onChange={e => setFormData({...formData, wholesalePrice: e.target.value})}
                  placeholder="Ej: 65000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Descripción</label>
              <textarea 
                required
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Describe el producto..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Categoría</label>
              <select 
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all bg-white"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Multimedia</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">URL de la Imagen</label>
                <input 
                  type="url" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  placeholder="https://ejemplo.com/imagen.jpg o /images/foto.jpg"
                />
                <p className="text-xs text-gray-500">Usa una URL externa o una ruta local (ej: /images/mi-foto.jpg)</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">URL del Video (Opcional)</label>
                <input 
                  type="url" 
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  value={formData.video || ''}
                  onChange={e => setFormData({...formData, video: e.target.value})}
                  placeholder="https://ejemplo.com/video.mp4"
                />
                <p className="text-xs text-gray-500">Enlace directo al video para mostrar el icono de video</p>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2">Variantes</h2>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Tallas Disponibles</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      formData.sizes.includes(size)
                        ? 'bg-purple-100 border-purple-500 text-purple-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Colores Disponibles</label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                      formData.colors.includes(color)
                        ? 'bg-purple-100 border-purple-500 text-purple-700'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2"
            >
              <Save size={20} />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
