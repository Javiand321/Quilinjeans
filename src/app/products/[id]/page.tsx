import { Metadata } from 'next';
import { products } from '@/data/products';
import ProductClient from './ProductClient';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Producto no encontrado | Quilin Jeans',
      description: 'El producto que buscas no está disponible.',
    };
  }

  return {
    title: `${product.name} | Quilin Jeans`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function Page({ params }: Props) {
  // We don't strictly need to pass ID since useParams handles it in client,
  // but just rendering the client component is enough.
  // However, awaiting params here ensures the route is resolved.
  await params; 
  return <ProductClient />;
}
