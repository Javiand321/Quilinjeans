'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
}

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tendencias en Jeans para esta temporada',
    excerpt: 'Descubre los estilos que están marcando pauta en el mundo del denim. Desde cortes holgados hasta los clásicos reinventados.',
    content: '<p>El denim nunca pasa de moda, pero sus siluetas evolucionan. Esta temporada vemos un fuerte regreso a la comodidad sin perder el estilo.</p><br/><h3>1. El reinado de los cortes anchos</h3><p>Los pantalones holgados siguen dominando. Los Mom Jeans y los cortes Wide Leg son los favoritos por su versatilidad y confort.</p><br/><h3>2. Colores clásicos</h3><p>Aunque vemos variaciones, el azul clásico (tanto claro como oscuro) sigue siendo el rey indiscutible de los armarios.</p>',
    image: 'https://images.unsplash.com/photo-1542272604-780c968509ef?w=800&auto=format&fit=crop&q=60',
    date: new Date().toISOString(),
    author: 'Quilin Jeans',
    tags: ['Tendencias', 'Moda', 'Jeans']
  }
];

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('blog_posts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        console.error('Failed to parse blog posts', e);
        setPosts(initialPosts);
      }
    } else {
      setPosts(initialPosts);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever posts change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('blog_posts', JSON.stringify(posts));
    }
  }, [posts, isLoaded]);

  const addPost = (newPost: Omit<BlogPost, 'id' | 'date'>) => {
    const post: BlogPost = {
      ...newPost,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setPosts((prev) => [post, ...prev]);
  };

  const updatePost = (id: string, updatedFields: Partial<BlogPost>) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, ...updatedFields } : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
