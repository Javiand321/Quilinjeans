'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Store, User, FileText, Phone, Mail, MapPin } from 'lucide-react';

export default function WholesaleRegisterPage() {
  const router = useRouter();
  const { registerWholesaler } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    documentType: 'CC', // CC or NIT
    documentNumber: '',
    companyName: '',
    address: '',
    city: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send data to your backend
    // For now, we simulate a successful registration in local state
    registerWholesaler(formData);
    
    // Redirect to wholesale catalog
    router.push('/wholesale');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-purple-100">
        <div className="bg-purple-600 px-8 py-6 text-white text-center">
          <Store className="w-12 h-12 mx-auto mb-3 text-purple-200" />
          <h2 className="text-3xl font-bold">Registro de Mayorista</h2>
          <p className="text-purple-100 mt-2">Únete a nuestra red y accede a precios exclusivos</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal/Company Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center">
                <User size={18} className="mr-2 text-purple-500" />
                Datos Básicos
              </h3>
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Nombre Completo / Razón Social</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-900 font-medium bg-white"
                  placeholder="Ej: María Pérez / Boutique Moda"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-sm font-bold text-gray-900 mb-1">Tipo Doc.</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 focus:ring-2 focus:ring-purple-500 outline-none bg-white font-medium text-gray-900"
                    value={formData.documentType}
                    onChange={e => setFormData({...formData, documentType: e.target.value})}
                  >
                    <option value="CC">C.C.</option>
                    <option value="NIT">NIT</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-900 mb-1">Número</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 text-gray-900 font-medium bg-white"
                    placeholder="Ej: 1020304050"
                    value={formData.documentNumber}
                    onChange={e => setFormData({...formData, documentNumber: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Nombre del Negocio (Opcional)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 text-gray-900 font-medium bg-white"
                  placeholder="Ej: Tienda de Ropa Estilo"
                  value={formData.companyName}
                  onChange={e => setFormData({...formData, companyName: e.target.value})}
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center">
                <Phone size={18} className="mr-2 text-purple-500" />
                Contacto
              </h3>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 text-gray-900 font-medium bg-white"
                  placeholder="correo@ejemplo.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-1">Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 text-gray-900 font-medium bg-white"
                  placeholder="Ej: 300 123 4567"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Ciudad</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 text-gray-900 font-medium bg-white"
                    placeholder="Ej: Bogotá"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Dirección</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none placeholder-gray-400 text-gray-900 font-medium bg-white"
                    placeholder="Ej: Cra 15 # 85-10"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-all transform hover:scale-[1.01]"
            >
              Registrarme y Ver Precios Mayoristas
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              Al registrarte aceptas nuestros términos y condiciones para ventas al por mayor.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
