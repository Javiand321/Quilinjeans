'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'guest' | 'customer' | 'wholesaler';

interface User {
  name: string;
  email: string;
  role: UserRole;
  documentType?: 'CC' | 'NIT';
  documentNumber?: string;
  companyName?: string;
  phone?: string;
  purchases?: number;
  totalSpent?: number;
  badges?: string[];
}

interface AuthContextType {
  user: User | null;
  registerWholesaler: (data: any) => void;
  addPurchase: (amount: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('quilin_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const registerWholesaler = (data: any) => {
    const newUser: User = {
      name: data.name,
      email: data.email,
      role: 'wholesaler',
      documentType: data.documentType,
      documentNumber: data.documentNumber,
      companyName: data.companyName || data.name,
      phone: data.phone,
      purchases: 0,
      totalSpent: 0,
      badges: ['Novato'], // Initial badge
    };
    
    setUser(newUser);
    localStorage.setItem('quilin_user', JSON.stringify(newUser));
  };

  const addPurchase = (amount: number) => {
    if (!user) return;

    const newPurchases = (user.purchases || 0) + 1;
    const newTotalSpent = (user.totalSpent || 0) + amount;
    
    // Calculate badges
    let newBadges = [...(user.badges || [])];
    
    if (newPurchases >= 5 && !newBadges.includes('Fiel')) newBadges.push('Fiel');
    if (newPurchases >= 15 && !newBadges.includes('Experto')) newBadges.push('Experto');
    if (newTotalSpent >= 1000000 && !newBadges.includes('VIP')) newBadges.push('VIP');
    if (newPurchases >= 50 && !newBadges.includes('Leyenda')) newBadges.push('Leyenda');

    const updatedUser = {
      ...user,
      purchases: newPurchases,
      totalSpent: newTotalSpent,
      badges: newBadges
    };

    setUser(updatedUser);
    localStorage.setItem('quilin_user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('quilin_user');
  };

  return (
    <AuthContext.Provider value={{ user, registerWholesaler, addPurchase, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
