import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useCartStore } from '../store/useStore';
import { formatINR } from '../lib/utils';
import { CheckCircle } from 'lucide-react';

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'cod'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const total = getCartTotal();
  const shipping = total > 10000 ? 0 : 999;
  const finalTotal = total > 0 ? total + shipping : 0;

  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      navigate('/cart');
    }
  }, [items.length, navigate, orderComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      const generatedOrderNumber = `KDH-${Math.floor(Math.random() * 900000) + 100000}`;
      setOrderNumber(generatedOrderNumber);
      setOrderComplete(true);
      setIsSubmitting(false);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <>
        <SEO title="Order Complete" description="Your order has been placed successfully." />
        <div className="container mx-auto px-4 py-24 min-h-[70vh] flex flex-col justify-center items-center text-center max-w-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
            <CheckCircle size={40} />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-stone-600 mb-2 text-lg">Thank you for your purchase.</p>
          <p className="font-medium text-stone-900 mb-8">Order Number: {orderNumber}</p>
          
          <div className="bg-amber-50 border border-amber-200 p-6 mb-8 text-amber-900 w-full text-left">
            <h3 className="font-semibold mb-2">Demo Notice</h3>
            <p className="text-sm">This is a demonstration checkout. No real payment or transaction has been processed, and no items will be shipped.</p>
          </div>

          <Link to="/" className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-800 transition-colors">
            Return to Home
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Checkout" description="Secure demo checkout for Kridha Imperial Homes." />
      
      <div className="bg-stone-100 py-10 md:py-12 border-b border-stone-200">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-stone-900">Checkout</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row gap-12">
          
          {/* Checkout Form */}
          <div className="flex-grow">
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* Contact Info */}
              <section>
                <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-2">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">Email Address *</label>
                    <input 
                      type="email" id="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">Phone Number *</label>
                    <input 
                      type="tel" id="phone" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-2">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-stone-700 mb-1">First Name *</label>
                    <input 
                      type="text" id="firstName" name="firstName" required
                      value={formData.firstName} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-stone-700 mb-1">Last Name *</label>
                    <input 
                      type="text" id="lastName" name="lastName" required
                      value={formData.lastName} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1">Address *</label>
                  <input 
                    type="text" id="address" name="address" required
                    value={formData.address} onChange={handleChange}
                    className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-1">City *</label>
                    <input 
                      type="text" id="city" name="city" required
                      value={formData.city} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-stone-700 mb-1">State *</label>
                    <input 
                      type="text" id="state" name="state" required
                      value={formData.state} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-stone-700 mb-1">PIN Code *</label>
                    <input 
                      type="text" id="pincode" name="pincode" required
                      value={formData.pincode} onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 bg-white"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Method */}
              <section>
                <h2 className="font-serif text-2xl text-stone-900 mb-6 border-b border-stone-200 pb-2">Payment Method (Demo)</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border border-stone-300 cursor-pointer hover:bg-stone-50">
                    <input 
                      type="radio" name="paymentMethod" value="cod"
                      checked={formData.paymentMethod === 'cod'} onChange={handleChange}
                      className="w-4 h-4 text-amber-700 focus:ring-amber-700"
                    />
                    <span className="font-medium text-stone-900">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-stone-300 cursor-pointer hover:bg-stone-50">
                    <input 
                      type="radio" name="paymentMethod" value="card"
                      checked={formData.paymentMethod === 'card'} onChange={handleChange}
                      className="w-4 h-4 text-amber-700 focus:ring-amber-700"
                    />
                    <span className="font-medium text-stone-900">Demo Card Payment</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-stone-300 cursor-pointer hover:bg-stone-50">
                    <input 
                      type="radio" name="paymentMethod" value="upi"
                      checked={formData.paymentMethod === 'upi'} onChange={handleChange}
                      className="w-4 h-4 text-amber-700 focus:ring-amber-700"
                    />
                    <span className="font-medium text-stone-900">Demo UPI</span>
                  </label>
                </div>
              </section>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-stone-900 text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-800 transition-colors disabled:bg-stone-400 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="bg-stone-50 p-6 border border-stone-200 sticky top-24">
              <h2 className="font-serif text-xl text-stone-900 mb-6 border-b border-stone-200 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6 border-b border-stone-200 pb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 flex-shrink-0 bg-stone-200 relative">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className="absolute -top-2 -right-2 bg-stone-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <h4 className="text-sm font-medium text-stone-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-stone-500">{formatINR(item.price)}</p>
                    </div>
                    <div className="flex items-center text-sm font-medium text-stone-900">
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm mb-6 border-b border-stone-200 pb-6">
                <div className="flex justify-between">
                  <span className="text-stone-600">Subtotal</span>
                  <span className="font-medium text-stone-900">{formatINR(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Shipping</span>
                  <span className="font-medium text-stone-900">{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <span className="text-stone-900 font-medium uppercase tracking-wider text-sm">Total</span>
                <span className="font-serif text-3xl text-stone-900">{formatINR(finalTotal)}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
