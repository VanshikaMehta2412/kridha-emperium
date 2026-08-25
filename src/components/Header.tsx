import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../store/useStore';
import { getCategories } from '../data/products';
import { cn } from '../lib/utils';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const cartCount = useCartStore((state) => state.getCartCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const categories = getCategories();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-amber-700',
      isActive ? 'text-amber-700' : 'text-stone-800'
    );

  return (
    <>
      <header className="h-20 border-b border-stone-200 flex items-center justify-between px-4 md:px-10 shrink-0 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="w-full flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 -ml-2 text-stone-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/products" className={navLinkClasses}>Products</NavLink>
            
            <div 
              className="relative group"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] font-medium transition-colors hover:text-amber-700 text-stone-800">
                Categories <ChevronDown size={14} className={cn("transition-transform", isCategoryDropdownOpen && "rotate-180")} />
              </button>
              
              {/* Dropdown */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 pt-4 w-[600px]">
                  <div className="bg-white shadow-xl rounded-sm border border-stone-100 p-6 grid grid-cols-3 gap-6">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id} 
                        to={`/products?category=${encodeURIComponent(cat.name)}`}
                        className="group/cat flex flex-col items-center text-center gap-3"
                        onClick={() => setIsCategoryDropdownOpen(false)}
                      >
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-stone-100">
                          <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="text-[11px] uppercase tracking-widest font-medium text-stone-800 group-hover/cat:text-amber-700 transition-colors">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
          </nav>

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center justify-center group flex-shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 text-xl font-serif hidden md:inline">✧</span>
              <h1 className="font-serif text-lg md:text-xl tracking-[0.25em] uppercase font-light text-stone-900 text-center">
                Kridha Imperial Homes
              </h1>
              <span className="text-amber-600 text-xl font-serif hidden md:inline">✧</span>
            </div>
            <p className="text-[7px] md:text-[9px] uppercase tracking-[0.3em] text-stone-400 mt-1">
              Timeless Elegance Meets Your Home
            </p>
          </Link>

          {/* Icons */}
          <div className="flex items-center justify-end gap-4 md:gap-6 flex-1 flex-shrink-0">
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-stone-300 rounded-full pl-4 pr-1 py-1 w-[200px] md:w-[250px] shadow-sm">
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-full text-xs outline-none bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <button type="submit" className="p-1.5 text-stone-500 hover:text-stone-900"><Search size={14} /></button>
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="p-1.5 text-stone-400 hover:text-stone-900"><X size={14} /></button>
                </form>
              ) : (
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:scale-110 duration-200 text-stone-800"
                  aria-label="Search"
                >
                  <Search size={18} strokeWidth={1.5} />
                </button>
              )}
            </div>
            
            <Link to="/wishlist" className="relative hover:scale-110 duration-200 text-stone-800 hidden md:block" aria-label="Wishlist">
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative hover:scale-110 duration-200 text-stone-800" aria-label="Cart">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-stone-800 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex items-center border-b border-stone-300 pb-2">
              <Search size={20} className="text-stone-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full text-lg outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <nav className="flex flex-col gap-6 text-xl font-serif">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)}>All Products</Link>
            
            <div className="border-y border-stone-100 py-4 my-2">
              <span className="text-sm font-sans font-semibold text-stone-400 uppercase tracking-wider mb-4 block">Categories</span>
              <div className="flex flex-col gap-4 pl-4 text-lg">
                {categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-stone-600 hover:text-stone-900"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
            <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          </nav>
        </div>
      )}
    </>
  );
}
