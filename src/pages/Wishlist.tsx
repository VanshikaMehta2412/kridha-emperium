import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useWishlistStore, useCartStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore();
  const addToCart = useCartStore(state => state.addItem);

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1);
    removeItem(product.id);
  };

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Wishlist" description="View items saved to your Kridha Imperial Homes wishlist." />
        <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-6">
            <Heart size={40} strokeWidth={1} />
          </div>
          <h1 className="font-serif text-3xl text-stone-900 mb-4">Your Wishlist is Empty</h1>
          <p className="text-stone-600 mb-8 max-w-md mx-auto">
            Create your dream space by saving your favorite items. Click the heart icon on any product to add it here.
          </p>
          <Link to="/products" className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-800 transition-colors">
            Explore Collections
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Your Wishlist" description="View items saved to your Kridha Imperial Homes wishlist." />
      
      <div className="bg-stone-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4">Your Wishlist</h1>
          <p className="text-stone-600">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {items.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
              
              <div className="mt-4 flex flex-col gap-2">
                <button 
                  onClick={() => handleMoveToCart(product)}
                  className="w-full bg-stone-900 text-white py-3 uppercase tracking-wider text-xs font-medium hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
                  disabled={product.availability === 'Out of Stock'}
                >
                  <ShoppingBag size={14} /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
