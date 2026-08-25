import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 shrink-0 px-4 md:px-10 py-10">
      <div className="border-b md:border-b-0 lg:border-r border-stone-100 pb-8 md:pb-0 md:pr-10 flex flex-col mb-8 lg:mb-0">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">Signature Product</h4>
        <div className="flex gap-4 items-center group cursor-pointer mb-8">
          <div className="w-16 h-16 bg-stone-100 flex-shrink-0">
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1578500484748-48f12839bbad?auto=format&fit=crop&q=80&w=200')] bg-cover"></div>
          </div>
          <div>
            <p className="text-sm font-serif group-hover:text-amber-700 duration-200">Crystal Pendant Light</p>
            <p className="text-xs text-stone-400 mt-1">₹8,999</p>
          </div>
        </div>
        <div className="mt-auto text-[9px] text-stone-300 leading-tight italic">
          *Fictional demonstration website created for educational purposes. No real transactions processed.
        </div>
      </div>

      <div className="lg:px-10 border-b md:border-b-0 md:border-l lg:border-l-0 lg:border-r border-stone-100 md:pl-10 lg:pl-10 pb-8 md:pb-0 mb-8 lg:mb-0">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">Imperial Categories</h4>
        <ul className="text-[11px] space-y-3 uppercase tracking-widest text-stone-600">
          <li><Link to="/products?category=Lighting" className="hover:text-amber-700">Lighting & Chandeliers</Link></li>
          <li><Link to="/products?category=Furniture" className="hover:text-amber-700">Bespoke Furniture</Link></li>
          <li><Link to="/products?category=Wall Decor" className="hover:text-amber-700">Wall Décor & Art</Link></li>
          <li><Link to="/products" className="hover:text-amber-700">All Products</Link></li>
        </ul>
      </div>

      <div className="lg:px-10 border-b md:border-b-0 lg:border-r border-stone-100 pb-8 md:pb-0 mb-8 lg:mb-0">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">Customer Service</h4>
        <ul className="text-[11px] space-y-3 uppercase tracking-widest text-stone-600">
          <li><Link to="/shipping-returns" className="hover:text-amber-700">Shipping & Returns</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-amber-700">Privacy Policy</Link></li>
          <li><Link to="/faq" className="hover:text-amber-700">FAQ & Support</Link></li>
          <li><Link to="/contact" className="hover:text-amber-700">Contact Us</Link></li>
        </ul>
      </div>

      <div className="md:pl-10 flex flex-col">
        <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-stone-400">The Imperial Circle</h4>
        <p className="text-xs text-stone-500 mb-4">Join for exclusive design updates.</p>
        <div className="flex border-b border-stone-300 pb-2">
          <input type="email" placeholder="Email address" className="bg-transparent text-[11px] w-full focus:outline-none placeholder:text-stone-300 text-stone-800" />
          <button className="text-[10px] uppercase tracking-widest font-bold ml-2 text-stone-800 hover:text-amber-700">Join</button>
        </div>
        
        <div className="flex gap-4 mt-8">
          <a href="#" className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-amber-600 hover:border-amber-600 cursor-pointer text-xs transition-colors">IG</a>
          <a href="#" className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-amber-600 hover:border-amber-600 cursor-pointer text-xs transition-colors">FB</a>
          <a href="#" className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-amber-600 hover:border-amber-600 cursor-pointer text-xs transition-colors">PI</a>
        </div>
      </div>
    </footer>
  );
}
