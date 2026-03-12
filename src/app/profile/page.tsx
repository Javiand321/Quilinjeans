'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShoppingBag, Award, TrendingUp, Package, Calendar, MapPin, User, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) return null;

  const badges = [
    { id: 'Novato', name: 'Novato', icon: '🌱', description: 'Tu primera compra', color: 'bg-green-100 text-green-700 border-green-200' },
    { id: 'Fiel', name: 'Cliente Fiel', icon: '💙', description: '5 compras realizadas', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 'Experto', name: 'Experto', icon: '👔', description: '15 compras realizadas', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    { id: 'VIP', name: 'VIP', icon: '👑', description: 'Más de $1M en compras', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    { id: 'Leyenda', name: 'Leyenda', icon: '🦄', description: '50 compras realizadas', color: 'bg-pink-100 text-pink-700 border-pink-200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>
          <div className="px-8 pb-8 flex flex-col md:flex-row items-center md:items-end -mt-12 space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
              <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center text-3xl font-bold text-purple-600 border border-purple-200">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                  {user.role === 'wholesaler' ? 'Mayorista' : 'Cliente'}
                </span>
                {user.companyName && (
                  <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-bold rounded-full flex items-center">
                    <Store size={12} className="mr-1" />
                    {user.companyName}
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={() => { logout(); router.push('/'); }}
              className="px-6 py-2 bg-white border border-red-100 text-red-500 font-medium rounded-xl hover:bg-red-50 transition-colors flex items-center"
            >
              <LogOut size={16} className="mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="space-y-8">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp size={20} className="mr-2 text-purple-500" />
                Estadísticas
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-900">{user.purchases || 0}</p>
                  <p className="text-xs text-gray-500 font-medium">Compras</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gray-900">${((user.totalSpent || 0) / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-gray-500 font-medium">Invertido</p>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <User size={20} className="mr-2 text-purple-500" />
                Mis Datos
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Package size={18} className="text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400">Documento</p>
                    <p className="text-sm font-medium text-gray-700">{user.documentType} {user.documentNumber}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-start space-x-3">
                    <Calendar size={18} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400">Teléfono</p>
                      <p className="text-sm font-medium text-gray-700">{user.phone}</p>
                    </div>
                  </div>
                )}
                <div className="pt-4">
                  <button className="text-sm text-purple-600 font-medium hover:underline">
                    Editar Información
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Award size={20} className="mr-2 text-yellow-500" />
                Insignias y Logros
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.map((badge) => {
                  const isUnlocked = (user.badges || []).includes(badge.id);
                  return (
                    <div 
                      key={badge.id} 
                      className={`relative p-4 rounded-xl border-2 transition-all ${
                        isUnlocked 
                          ? `${badge.color} border-transparent shadow-sm` 
                          : 'bg-gray-50 border-dashed border-gray-200 opacity-60 grayscale'
                      }`}
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h3 className="font-bold text-sm">{badge.name}</h3>
                      <p className="text-xs opacity-80 mt-1">{badge.description}</p>
                      {!isUnlocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 backdrop-blur-[1px] rounded-xl">
                          <span className="text-xs font-bold bg-gray-200 text-gray-500 px-2 py-1 rounded">Bloqueado</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Orders (Mock) */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                  <ShoppingBag size={20} className="mr-2 text-purple-500" />
                  Historial de Compras
                </h2>
                <Link href="/products" className="text-sm text-purple-600 font-medium hover:underline">
                  Ver catálogo
                </Link>
              </div>

              {(user.purchases || 0) > 0 ? (
                <div className="space-y-4">
                  {/* Mock Purchase Item */}
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                        <ShoppingBag size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">Pedido #ORD-2024-{100 + (user.purchases || 0)}</p>
                        <p className="text-xs text-gray-500">Hace 2 días • {user.role === 'wholesaler' ? '15 Artículos' : '2 Artículos'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">$450.000</p>
                      <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium">Entregado</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">Aún no has realizado compras</p>
                  <p className="text-sm text-gray-400 mt-1">¡Explora nuestra colección y empieza a ganar insignias!</p>
                  <Link 
                    href="/products" 
                    className="inline-block mt-4 bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-gray-800 transition-all"
                  >
                    Ir a Comprar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Store({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
