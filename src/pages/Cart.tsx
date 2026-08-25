import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCartStore } from '../store/useStore';
import { formatINR } from '../lib/utils';
import { Minus, Plus, X, ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, getCartTotal } = useCartStore();
  const navigate = useNavigate();

  const total = getCartTotal();
  const shipping = total > 10000 ? 0 : 999;
  const finalTotal = total > 0 ? total + shipping : 0;

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Cart" description="View items in your Kridha Imperial Homes cart." />
        <div className="container mx-auto px-4 py-24 text-center min-h-[60vh] flex flex-col justify-center items-center">
          <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 mb-6">
            <ShoppingBag size={40} strokeWidth={1} />
          </div>
          <h1 className="font-serif text-3xl text-stone-900 mb-4">Your Cart is Empty</h1>
          <p className="text-stone-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Discover our premium collections and find something you love.
          </p>
          <Link to="/products" className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-800 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Your Cart" description="View items in your Kridha Imperial Homes cart." />
      
      <div className="bg-stone-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4">Your Cart</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-stone-200 text-sm font-medium uppercase tracking-wider text-stone-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-stone-200">
              {items.map(item => (
                <div key={item.id} className="py-6 md:py-8 flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center relative">
                  
                  {/* Mobile Remove Button */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="md:hidden absolute top-6 right-0 text-stone-400 hover:text-red-600"
                  >
                    <X size={20} />
                  </button>

                  <div className="col-span-6 flex gap-4">
                    <Link to={`/product/${item.id}`} className="w-24 h-32 flex-shrink-0 bg-stone-100 block">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex flex-col justify-center pr-6 md:pr-0">
                      <Link to={`/product/${item.id}`} className="font-serif text-lg text-stone-900 hover:text-amber-700 transition-colors mb-1 line-clamp-2">
                        {item.name}
                      </Link>
                      <span className="text-sm text-stone-500 mb-2">{item.category}</span>
                      <span className="md:hidden font-medium text-stone-900">{formatINR(item.price)}</span>
                    </div>
                  </div>

                  <div className="col-span-2 text-center hidden md:block text-stone-900">
                    {formatINR(item.price)}
                  </div>

                  <div className="col-span-2 flex justify-start md:justify-center mt-4 md:mt-0">
                    <div className="flex items-center border border-stone-300 h-10 w-28">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex-1 flex justify-center items-center text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-medium text-stone-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex-1 flex justify-center items-center text-stone-500 hover:text-stone-900 transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 flex justify-between md:justify-end items-center mt-4 md:mt-0">
                    <span className="md:hidden text-sm text-stone-500 uppercase tracking-wider">Subtotal:</span>
                    <span className="font-medium text-stone-900">{formatINR(item.price * item.quantity)}</span>
                    {/* Desktop Remove */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="hidden md:flex ml-4 text-stone-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-stone-200">
              <Link to="/products" className="text-stone-900 font-medium uppercase tracking-wider text-sm hover:text-amber-700 transition-colors">
                Continue Shopping
              </Link>
              <button 
                onClick={clearCart}
                className="text-stone-500 hover:text-red-600 font-medium uppercase tracking-wider text-sm transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-stone-50 p-6 md:p-8 border border-stone-200 sticky top-24">
              <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 border-b border-stone-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-medium text-stone-900">{formatINR(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-medium text-stone-900">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-700 text-right mt-1">Free shipping on orders over ₹10,000</p>
                )}
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-stone-900 font-medium uppercase tracking-wider">Total</span>
                <span className="font-serif text-3xl text-stone-900">{formatINR(finalTotal)}</span>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-800 transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <p className="text-xs text-stone-500 text-center mt-4 flex items-center justify-center gap-1">
                Demo checkout. No real payments processed.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
