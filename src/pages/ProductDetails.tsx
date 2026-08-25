import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { products, getRelatedProducts } from '../data/products';
import { useCartStore, useWishlistStore } from '../store/useStore';
import { formatINR, cn } from '../lib/utils';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight, Check } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === id);
  const relatedProducts = product ? getRelatedProducts(product.category, product.id) : [];

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const addToCart = useCartStore(state => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  useEffect(() => {
    // Reset state when product changes
    setQuantity(1);
    setActiveImage(0);
    setAddedToCart(false);
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <h2 className="font-serif text-3xl text-stone-900 mb-4">Product Not Found</h2>
        <p className="text-stone-600 mb-8">The item you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-sm">
          Back to Products
        </Link>
      </div>
    );
  }

  const allImages = [product.image, ...product.additionalImages];
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  return (
    <>
      <SEO title={product.name} description={product.shortDescription} />
      
      {/* Breadcrumbs */}
      <div className="bg-stone-50 border-b border-stone-200 py-4">
        <div className="container mx-auto px-4 max-w-7xl flex items-center text-sm text-stone-500">
          <Link to="/" className="hover:text-amber-700 transition-colors">Home</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to="/products" className="hover:text-amber-700 transition-colors">Products</Link>
          <ChevronRight size={14} className="mx-2" />
          <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-700 transition-colors">{product.category}</Link>
          <ChevronRight size={14} className="mx-2" />
          <span className="text-stone-900 truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar pb-2 md:pb-0">
                {allImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "w-20 h-24 flex-shrink-0 border-2 transition-all overflow-hidden",
                      activeImage === idx ? "border-amber-700" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Main Image */}
            <div className="flex-grow relative aspect-[4/5] bg-stone-100 overflow-hidden group">
              {product.discountPercentage && (
                <span className="absolute top-4 left-4 z-10 bg-amber-700 text-white text-sm font-bold px-3 py-1 uppercase tracking-wider">
                  {product.discountPercentage}% OFF
                </span>
              )}
              <img 
                src={allImages[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-amber-500">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className={product.rating >= 4.8 ? "fill-current" : ""} />
                <span className="text-sm text-stone-600 font-medium ml-2">{product.rating} <span className="text-stone-400 font-normal">({product.reviewCount} Reviews)</span></span>
              </div>
              <span className="text-stone-300">|</span>
              <span className="text-sm text-stone-500">SKU: {product.sku}</span>
            </div>

            <div className="flex items-end gap-3 mb-8">
              <span className="font-serif text-3xl text-stone-900">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-stone-400 line-through mb-1">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-stone-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Actions */}
            <div className="border-y border-stone-200 py-8 mb-8 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-stone-900 uppercase tracking-wider">Availability</span>
                <span className={cn(
                  "text-sm font-medium",
                  product.availability === 'In Stock' ? "text-green-600" : 
                  product.availability === 'Few Left' ? "text-amber-600" : "text-red-600"
                )}>
                  {product.availability}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 h-12 w-full sm:w-32">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 flex justify-center items-center text-stone-500 hover:text-stone-900 transition-colors"
                    disabled={product.availability === 'Out of Stock'}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium text-stone-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 flex justify-center items-center text-stone-500 hover:text-stone-900 transition-colors"
                    disabled={product.availability === 'Out of Stock'}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart / Buy Now */}
                <button 
                  onClick={handleAddToCart}
                  disabled={product.availability === 'Out of Stock'}
                  className={cn(
                    "flex-1 h-12 flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-medium transition-all",
                    addedToCart 
                      ? "bg-green-600 text-white border border-green-600" 
                      : "bg-stone-900 text-white hover:bg-amber-800 disabled:bg-stone-400 disabled:cursor-not-allowed"
                  )}
                >
                  {addedToCart ? (
                    <><Check size={18} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={18} /> Add to Cart</>
                  )}
                </button>
                
                <button 
                  onClick={handleWishlistToggle}
                  className="w-12 h-12 border border-stone-300 flex items-center justify-center text-stone-600 hover:text-amber-700 hover:border-amber-700 transition-colors"
                  aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={20} className={cn(inWishlist && "fill-amber-700 text-amber-700")} />
                </button>
              </div>

              <button 
                onClick={handleBuyNow}
                disabled={product.availability === 'Out of Stock'}
                className="w-full h-12 border border-stone-900 text-stone-900 uppercase tracking-wider text-sm font-medium hover:bg-stone-900 hover:text-white transition-colors disabled:border-stone-300 disabled:text-stone-400 disabled:cursor-not-allowed"
              >
                Buy It Now
              </button>
            </div>

            {/* Specifications */}
            <div className="space-y-4 text-sm">
              <div className="flex border-b border-stone-100 pb-3">
                <span className="w-32 font-medium text-stone-900 uppercase tracking-wide text-xs">Material</span>
                <span className="text-stone-600 flex-1">{product.material}</span>
              </div>
              <div className="flex border-b border-stone-100 pb-3">
                <span className="w-32 font-medium text-stone-900 uppercase tracking-wide text-xs">Dimensions</span>
                <span className="text-stone-600 flex-1">{product.dimensions}</span>
              </div>
              <div className="flex border-b border-stone-100 pb-3">
                <span className="w-32 font-medium text-stone-900 uppercase tracking-wide text-xs">Color</span>
                <span className="text-stone-600 flex-1">{product.color}</span>
              </div>
              <div className="flex pt-1">
                <span className="w-32 font-medium text-stone-900 uppercase tracking-wide text-xs">Care</span>
                <span className="text-stone-600 flex-1">{product.careInstructions}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="bg-stone-50 py-20 border-t border-stone-200">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="font-serif text-3xl text-stone-900 mb-12 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(rp => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
