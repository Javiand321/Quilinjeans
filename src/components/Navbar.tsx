'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X, Facebook, Instagram, Youtube, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

// Custom TikTok icon since Lucide doesn't have it yet (or verify if it does, assuming it doesn't for safety)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img 
                  src="/logo-unicorn.jpg" 
                  alt="QUILLIN Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Fallback to a colorful placeholder if image not found
                    target.style.display = 'none';
                    target.parentElement!.style.background = 'linear-gradient(to right, #a855f7, #ec4899, #eab308)';
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text text-transparent">
                QUILIN
              </span>
              <span className="text-xs font-bold text-gray-400 tracking-[0.2em] ml-0.5">
                JEANS
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              Inicio
            </Link>
            <Link href="/products" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              Colección
            </Link>
            <Link href="/wholesale" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              Mayoristas
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-pink-500 transition-colors font-medium">
              Nosotros
            </Link>
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-4 border-r border-gray-200 pr-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </a>
            </div>
            
            {user ? (
              <div className="relative group">
                <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold border border-purple-200">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-sm max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </Link>
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-xs text-gray-500 font-medium">Hola,</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full uppercase">
                      {user.role === 'wholesaler' ? 'Mayorista' : 'Cliente'}
                    </span>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors">
                    Mi Perfil
                  </Link>
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors rounded-b-xl flex items-center"
                  >
                    <LogOut size={14} className="mr-2" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/wholesale/register" className="text-gray-600 hover:text-purple-600 transition-colors" title="Ingresar / Registrarse">
                <UserIcon size={24} />
              </Link>
            )}

            <Link href="/cart" className="relative text-gray-600 hover:text-pink-500 transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-pink-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-pink-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/products" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                onClick={() => setIsOpen(false)}
              >
                Colección
              </Link>
              <Link 
                href="/wholesale" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                onClick={() => setIsOpen(false)}
              >
                Mayoristas
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 hover:bg-pink-50"
                onClick={() => setIsOpen(false)}
              >
                Nosotros
              </Link>
              <div className="flex space-x-6 px-3 pt-4 border-t border-gray-100">
                <a href="#" className="text-gray-400 hover:text-pink-600">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-black">
                  <TikTokIcon className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-600">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
