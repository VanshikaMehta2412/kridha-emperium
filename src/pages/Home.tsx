import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { getCategories, getFeaturedProducts } from '../data/products';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

 const handleSubscribe = (e: React.FormEvent) => {
  e.preventDefault();

  if (email) {
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  }
};

  return (
    <>
      <SEO
         title="Luxury Home Decor & Modern Home Decor"
         description="Discover luxury home decor and modern home decor pieces at Kridha Imperial Homes. Explore elegant furniture, decorative lighting, wall decor and premium home decor for stylish living spaces."/>
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[85vh]">
        <div className="lg:col-span-7 flex flex-col justify-center px-8 md:px-16 relative bg-[#F9F7F2] py-20 lg:py-0">
          <div className="max-w-xl z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-amber-600"></div>
              <span className="text-xs uppercase tracking-[0.4em] text-amber-700 font-semibold">Exclusive Collection 2024</span>
            </div>
            <h1 className="font-serif text-5xl lg:text-6xl leading-[1.1] mb-8 text-stone-900">
  Luxury Home Decor<br/>For Modern Homes
</h1>
            <p className="text-stone-500 text-lg mb-10 leading-relaxed max-w-lg">
  Discover luxury home decor and modern home decor pieces designed to bring sophistication, warmth, and character to every corner of your home.
</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/products" 
                className="bg-stone-900 text-white px-10 py-4 text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors text-center"
              >
                Shop Collection
              </Link>
              <Link 
                to="/products?category=Furniture" 
                className="border border-stone-300 text-stone-900 px-10 py-4 text-xs uppercase tracking-widest hover:border-stone-900 transition-colors text-center"
              >
                Explore Décor
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:flex absolute bottom-10 left-16 gap-12 z-10">
            <div className="flex flex-col">
              <span className="text-xl font-serif text-stone-900">01</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">Curated Design</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif text-stone-900">02</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">Premium Materials</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-serif text-stone-900">03</span>
              <span className="text-[10px] uppercase tracking-widest text-stone-400 mt-1">Global Shipping</span>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-5 relative flex items-center justify-center bg-stone-200 overflow-hidden min-h-[400px] lg:min-h-full">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-stone-900/10"></div>
          
          <div className="relative z-10 w-full h-full flex items-end p-8 lg:p-12">
            <div className="bg-white/90 backdrop-blur-md p-6 lg:p-8 w-full border-l-4 border-amber-600 shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold mb-2 block">Spotlight</span>
              <h3 className="font-serif text-xl lg:text-2xl mb-4 italic text-stone-900">The Velvet Royal Accent Chair</h3>
              <p className="text-stone-600 text-sm mb-6">Hand-crafted with heritage wood and premium Italian velvet for unparalleled comfort and class.</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-stone-900">₹24,999</span>
                <Link to="/products" className="text-[10px] uppercase tracking-tighter font-bold border-b border-stone-800 pb-1 text-stone-900 hover:text-amber-700">
                  View Product Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 md:py-28 container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">Curated Categories</h2>
          <div className="w-16 h-px bg-amber-700 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.slice(0, 6).map((category) => (
            <Link 
              key={category.id} 
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="group relative h-[400px] overflow-hidden flex flex-col justify-end p-8"
            >
              <div className="absolute inset-0 z-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-[0.6]"
                />
              </div>
              <div className="relative z-10">
                <h3 className="font-serif text-2xl text-white mb-2">{category.name}</h3>
                <p className="text-stone-300 text-sm mb-4 line-clamp-1">{category.description}</p>
                <span className="inline-flex items-center text-amber-500 text-sm font-medium uppercase tracking-wider group-hover:text-amber-400 transition-colors">
                  View Collection <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/products" className="inline-block border-b border-stone-900 pb-1 text-stone-900 font-medium uppercase tracking-wider hover:text-amber-700 hover:border-amber-700 transition-colors">
            View All Categories
          </Link>
        </div>
      </section>

      {/* Imperial Collection Promo */}
      <section className="bg-stone-900 text-white">
        <div className="grid md:grid-cols-2">
          <div className="h-[500px] md:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop" 
              alt="Luxury home decor Imperial Collection" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-20 lg:p-28">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-widest mb-4 block">Premium Selection</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">The Imperial Collection</h2>
            <p className="text-stone-400 leading-relaxed mb-10 max-w-md">
  A meticulously curated selection of luxury home decor pieces, featuring hand-crafted furniture, decorative lighting, artisanal wall decor, and exclusive designs for modern homes.
</p>
            <Link 
              to="/products" 
              className="self-start border border-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-stone-900 transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">Featured Pieces</h2>
            <div className="w-16 h-px bg-amber-700"></div>
          </div>
          <Link to="/products" className="hidden md:inline-flex items-center text-stone-900 hover:text-amber-700 font-medium text-sm uppercase tracking-wider transition-colors">
            View All <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link to="/products" className="inline-flex items-center text-stone-900 border-b border-stone-900 pb-1 font-medium text-sm uppercase tracking-wider">
            View All Products
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-50 py-20 border-y border-stone-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100 mb-4 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h4 className="font-serif text-stone-900 text-lg mb-2">Timeless Designs</h4>
              <p className="text-xs text-stone-500 leading-relaxed">Aesthetics that outlast fleeting trends.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100 mb-4 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </div>
              <h4 className="font-serif text-stone-900 text-lg mb-2">Carefully Curated</h4>
              <p className="text-xs text-stone-500 leading-relaxed">Handpicked pieces for perfect cohesion.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100 mb-4 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h4 className="font-serif text-stone-900 text-lg mb-2">Premium Aesthetic</h4>
              <p className="text-xs text-stone-500 leading-relaxed">Uncompromising visual quality.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100 mb-4 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
              <h4 className="font-serif text-stone-900 text-lg mb-2">Elegant Materials</h4>
              <p className="text-xs text-stone-500 leading-relaxed">Marble, brass, velvet and mahogany.</p>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-stone-100 mb-4 text-amber-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              </div>
              <h4 className="font-serif text-stone-900 text-lg mb-2">Easy Shopping</h4>
              <p className="text-xs text-stone-500 leading-relaxed">Seamless demonstration experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 md:py-28 container mx-auto px-4 max-w-4xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4">Join the Imperial Circle</h2>
        <p className="text-stone-600 mb-10 max-w-xl mx-auto">
          Subscribe to our newsletter to receive updates on new arrivals, exclusive design tips, and early access to curated collections.
        </p>
        
        {subscribed ? (
          <div className="bg-green-50 text-green-800 p-4 border border-green-200 rounded-sm inline-block">
            Thank you for joining the Imperial Circle!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">
            <input 
              type="email" 
              required
              placeholder="Enter your email address" 
              className="flex-grow border border-stone-300 px-6 py-4 focus:outline-none focus:border-amber-700 text-stone-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-800 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </>
  );
}
