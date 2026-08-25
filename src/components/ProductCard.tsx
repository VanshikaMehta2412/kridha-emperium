import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import { formatINR, cn } from '../lib/utils';

export interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    // Optional: add a toast notification here
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 mb-4 rounded-sm">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {product.discountPercentage && (
            <span className="bg-amber-700 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.availability === 'Few Left' && (
            <span className="bg-stone-900 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider">
              Low Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full text-stone-600 hover:text-amber-700 transition-colors opacity-0 group-hover:opacity-100 sm:opacity-100 focus:opacity-100"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} className={cn(inWishlist && "fill-amber-700 text-amber-700")} />
        </button>

        {/* Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Quick Add to Cart (Desktop Hover) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-white text-stone-900 font-medium py-3 px-4 shadow-lg hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
            disabled={product.availability === 'Out of Stock'}
          >
            <ShoppingBag size={16} />
            {product.availability === 'Out of Stock' ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1 mb-1 text-amber-500">
          <Star size={12} className="fill-current" />
          <span className="text-xs text-stone-600 font-medium">{product.rating} <span className="text-stone-400 font-normal">({product.reviewCount})</span></span>
        </div>
        
        <h3 className="font-serif text-lg text-stone-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-stone-500 mb-2 line-clamp-1">
          {product.shortDescription}
        </p>
        
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-stone-900">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-stone-400 line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Mobile Add to Cart */}
        <button 
          onClick={handleAddToCart}
          className="mt-3 md:hidden w-full border border-stone-300 text-stone-800 py-2 text-sm uppercase tracking-wider font-medium active:bg-stone-100"
          disabled={product.availability === 'Out of Stock'}
        >
          {product.availability === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
