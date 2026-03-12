import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

// Reusing TikTok icon
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

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-100 pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              JeansTeen
            </span>
            <p className="text-gray-500 text-sm leading-relaxed">
              Moda increíble para chicas increíbles. Encuentra tu estilo perfecto con nuestros jeans diseñados para ti.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 hover:bg-pink-500 hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-black hover:bg-black hover:text-white transition-all">
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Explorar</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/products" className="hover:text-pink-500 transition-colors">Nuevos Ingresos</Link></li>
              <li><Link href="/products?category=Jeans" className="hover:text-pink-500 transition-colors">Jeans</Link></li>
              <li><Link href="/products?category=Short" className="hover:text-pink-500 transition-colors">Shorts</Link></li>
              <li><Link href="/products?category=Falda%20short" className="hover:text-pink-500 transition-colors">Falda Short</Link></li>
              <li><Link href="/products?category=Bragas" className="hover:text-pink-500 transition-colors">Bragas</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Ayuda</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><Link href="/shipping" className="hover:text-pink-500 transition-colors">Envíos</Link></li>
              <li><Link href="/returns" className="hover:text-pink-500 transition-colors">Cambios y Devoluciones</Link></li>
              <li><Link href="/size-guide" className="hover:text-pink-500 transition-colors">Guía de Tallas</Link></li>
              <li><Link href="/contact" className="hover:text-pink-500 transition-colors">Contáctanos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-pink-500 mt-0.5" />
                <span>CC Centrolandia<br />Calle 11 #11 - 30<br />Puesto 34 y 35</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-pink-500" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-pink-500" />
                <span>hola@jeansteen.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} QUILIN JEANS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
