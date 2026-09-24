import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import { formatINR, cn } from '../lib/utils';

export interface ProductCardProps {
  product: Product;
}

/*
 * Safe fallback images by category.
 * These URLs are already used elsewhere in your products.ts,
 * so we don't introduce another random image source.
 */
const categoryFallbackImages: Record<string, string> = {
  Furniture:
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',

  Lighting:
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1000&auto=format&fit=crop',

  'Wall Décor':
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1000&auto=format&fit=crop',

  'Rugs & Carpets':
    'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=1000&auto=format&fit=crop',

  'Cushions & Textiles':
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop',

  'Vases & Decorative Objects':
    'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=1000&auto=format&fit=crop',

  'Bedroom Décor':
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',

  'Living Room Décor':
    'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=1000&auto=format&fit=crop',

  'Dining & Table Décor':
    'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1000&auto=format&fit=crop',
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addItem);

  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

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
  };

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const img = e.currentTarget;

    // Prevent infinite error loop
    img.onerror = null;

    // Use category-specific fallback instead of one common image
    img.src =
      categoryFallbackImages[product.category] ||
      categoryFallbackImages['Furniture'];
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
          aria-label={
            inWishlist ? 'Remove from wishlist' : 'Add to wishlist'
          }
        >
          <Heart
            size={18}
            className={cn(
              inWishlist && 'fill-amber-700 text-amber-700'
            )}
          />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />

        {/* Quick Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-stone-900 font-medium py-3 px-4 shadow-lg hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center gap-2 uppercase text-sm tracking-wider"
            disabled={product.availability === 'Out of Stock'}
          >
            <ShoppingBag size={16} />

            {product.availability === 'Out of Stock'
              ? 'Out of Stock'
              : 'Quick Add'}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-col">

        {/* Rating */}
        <div className="flex items-center gap-1 mb-1 text-amber-500">
          <Star size={12} className="fill-current" />

          <span className="text-xs text-stone-600 font-medium">
            {product.rating}{' '}
            <span className="text-stone-400 font-normal">
              ({product.reviewCount})
            </span>
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-serif text-lg text-stone-900 mb-1 group-hover:text-amber-700 transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-stone-500 mb-2 line-clamp-1">
          {product.shortDescription}
        </p>

        {/* Price */}
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
          {product.availability === 'Out of Stock'
            ? 'Out of Stock'
            : 'Add to Cart'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;