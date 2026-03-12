'use client';

import { motion } from 'framer-motion';
import { Sparkles, Users, Scissors, Star, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-pink-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-purple-100/50 to-pink-100/50 rounded-bl-[100px] opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm text-purple-600 font-bold text-sm mb-6 border border-purple-100">
              <Sparkles size={16} />
              <span>Nuestra Historia</span>
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Más que Jeans, creamos <span className="text-purple-600">Estilo</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Somos fabricantes directos. Pasión por la moda, calidad insuperable y diseños que marcan tendencia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-gray-900">¿Quiénes Somos?</h2>
            <div className="w-20 h-1 bg-purple-500 rounded-full" />
            <p className="text-gray-600 text-lg leading-relaxed">
              En <span className="font-bold text-purple-600">QUILIN JEANS</span>, nos enorgullece ser una empresa líder en la confección y distribución mayorista de jeans en Colombia. No somos solo una tienda, somos <strong>fábrica directa</strong>, lo que nos permite garantizar la mejor calidad en cada costura y ofrecer precios competitivos sin intermediarios.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nuestra misión es empoderar a nuestros clientes con prendas que no solo visten, sino que expresan personalidad. Nos especializamos en diseños actualizados, siguiendo las últimas tendencias mundiales para que tu negocio siempre esté a la vanguardia.
            </p>
            
            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 mt-8">
              <h3 className="font-bold text-purple-800 mb-2 flex items-center">
                <Users className="mr-2" size={20} />
                Fundadores
              </h3>
              <p className="text-purple-700">
                Liderado con pasión y visión por <strong>Heidy Rodriguez</strong> y <strong>Brian Rodriguez</strong>, quienes han dedicado su experiencia a construir una marca sinónimo de confianza y estilo.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10 bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1542272617-08f08630329e?w=800&auto=format&fit=crop&q=60" 
                alt="Taller de confección Quilin Jeans" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542272617-08f08630329e?w=800&auto=format&fit=crop&q=60';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div className="text-white">
                  <p className="font-bold text-xl">Calidad de Exportación</p>
                  <p className="text-sm opacity-90">Hecho con amor en Colombia</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-50 z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-50 z-0" />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Por qué elegirnos</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Nos diferenciamos por nuestro compromiso con la excelencia y el servicio al cliente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600">
                <Scissors size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Somos Fabricantes</h3>
              <p className="text-gray-500">
                Controlamos todo el proceso de producción para asegurar acabados perfectos y durabilidad en cada prenda.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Diseños Exclusivos</h3>
              <p className="text-gray-500">
                Actualizamos nuestras colecciones constantemente inspirados en las pasarelas internacionales.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all text-center"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pasión por el Cliente</h3>
              <p className="text-gray-500">
                Brindamos asesoría personalizada para mayoristas, ayudándote a crecer tu negocio con nuestros productos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="bg-gray-900 rounded-3xl p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para emprender con nosotros?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Únete a nuestra red de distribuidores exitosos. Regístrate hoy y accede a precios especiales de fábrica.
            </p>
            <Link 
              href="/wholesale/register" 
              className="inline-block bg-white text-gray-900 px-10 py-4 rounded-full font-bold shadow-lg hover:bg-purple-500 hover:text-white transition-all transform hover:scale-105"
            >
              Quiero ser Mayorista
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
