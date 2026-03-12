'use client';

import { ProductProvider } from "@/context/ProductContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
