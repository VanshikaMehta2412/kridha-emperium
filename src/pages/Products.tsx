import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ProductCard from '../components/ProductCard';
import { products, getCategories, Category } from '../data/products';
import { Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

type SortOption = 'price-low-high' | 'price-high-low' | 'newest' | 'rating' | 'popularity';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<SortOption>('popularity');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');

  // Sync state with URL params
  useEffect(() => {
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (searchParam !== searchQuery) {
      setSearchQuery(searchParam || '');
    }
  }, [searchParam]);

  const categories = getCategories();

  const handleCategoryChange = (categoryName: string | null) => {
    setSelectedCategory(categoryName);
    if (categoryName) {
      searchParams.set('category', categoryName);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
    setIsMobileFiltersOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 100000]);
    setMinRating(0);
    setSearchQuery('');
    setSearchParams({});
    setIsMobileFiltersOpen(false);
  };

  // Filter and Sort Logic
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'popularity':
        default:
          return b.reviewCount - a.reviewCount;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, priceRange, minRating, sortOption]);

  const pageTitle = selectedCategory ? `${selectedCategory} | Kridha Imperial Homes` : 'All Products | Kridha Imperial Homes';

  return (
    <>
      <SEO title={selectedCategory || "All Products"} description="Browse our complete collection of luxury home décor." />
      
      {/* Page Header */}
      <div className="bg-stone-100 py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4">
            {selectedCategory ? selectedCategory : searchParam ? `Search Results for "${searchParam}"` : 'All Collections'}
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover timeless home décor pieces designed to bring sophistication, warmth and character to every corner of your home.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        
        {/* Mobile Filter Toggle & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 md:hidden">
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="w-full flex items-center justify-center gap-2 border border-stone-300 py-3 font-medium uppercase tracking-wider text-sm bg-white"
          >
            <Filter size={18} /> Filters & Categories
          </button>
          
          <div className="w-full relative">
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="w-full appearance-none border border-stone-300 py-3 pl-4 pr-10 text-sm font-medium uppercase tracking-wider bg-white rounded-none focus:outline-none"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low-high">Sort by Price: Low to High</option>
              <option value="price-high-low">Sort by Price: High to Low</option>
              <option value="newest">Sort by Newest</option>
              <option value="rating">Sort by Rating</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          
          {/* Desktop Filters Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Search */}
              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Search</h3>
                <form onSubmit={handleSearchSubmit} className="flex items-center border border-stone-300 rounded-sm overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full px-3 py-2 text-sm focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Categories</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={() => handleCategoryChange(null)}
                      className={cn("text-sm hover:text-amber-700 transition-colors text-left w-full", selectedCategory === null ? "text-amber-700 font-medium" : "text-stone-600")}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => handleCategoryChange(cat.name)}
                        className={cn("text-sm hover:text-amber-700 transition-colors text-left w-full", selectedCategory === cat.name ? "text-amber-700 font-medium" : "text-stone-600")}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Price Range</h3>
                <div className="space-y-3">
                  {[
                    { label: 'All Prices', range: [0, 100000] },
                    { label: 'Under ₹5,000', range: [0, 5000] },
                    { label: '₹5,000 - ₹15,000', range: [5000, 15000] },
                    { label: '₹15,000 - ₹30,000', range: [15000, 30000] },
                    { label: 'Over ₹30,000', range: [30000, 100000] },
                  ].map((filter, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="price" 
                        checked={priceRange[0] === filter.range[0] && priceRange[1] === filter.range[1]}
                        onChange={() => setPriceRange(filter.range as [number, number])}
                        className="text-amber-700 focus:ring-amber-700 border-stone-300"
                      />
                      <span className="text-sm text-stone-600">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Minimum Rating</h3>
                <div className="space-y-3">
                  {[4.5, 4.0, 3.0, 0].map((rating, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating" 
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="text-amber-700 focus:ring-amber-700 border-stone-300"
                      />
                      <span className="text-sm text-stone-600">
                        {rating === 0 ? 'All Ratings' : `${rating} Stars & Up`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button 
                onClick={clearFilters}
                className="w-full border border-stone-900 text-stone-900 py-2 text-sm uppercase tracking-wider hover:bg-stone-900 hover:text-white transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-grow">
            
            {/* Desktop Sort */}
            <div className="hidden md:flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
              <span className="text-sm text-stone-500">Showing {filteredAndSortedProducts.length} results</span>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-stone-600 font-medium">Sort by:</span>
                <div className="relative">
                  <select 
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="appearance-none border-none py-1 pl-2 pr-8 text-sm font-medium focus:outline-none bg-transparent cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="rating">Average Rating</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredAndSortedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-stone-200 bg-stone-50">
                <h3 className="font-serif text-2xl text-stone-900 mb-2">No products found.</h3>
                <p className="text-stone-500 mb-6">We couldn't find any items matching your current filters.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-stone-900 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-stone-200 p-4 flex items-center justify-between z-10">
            <h2 className="font-serif text-xl text-stone-900">Filters</h2>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2"><X size={24} /></button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Same filter content as desktop sidebar, styled for mobile */}
             <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Search</h3>
                <form onSubmit={handleSearchSubmit} className="flex items-center border border-stone-300 rounded-sm overflow-hidden">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full px-3 py-3 text-base focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Categories</h3>
                <ul className="space-y-4">
                  <li>
                    <button 
                      onClick={() => handleCategoryChange(null)}
                      className={cn("text-base w-full text-left", selectedCategory === null ? "text-amber-700 font-medium" : "text-stone-600")}
                    >
                      All Products
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        onClick={() => handleCategoryChange(cat.name)}
                        className={cn("text-base w-full text-left", selectedCategory === cat.name ? "text-amber-700 font-medium" : "text-stone-600")}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Price Range</h3>
                <div className="space-y-4">
                  {[
                    { label: 'All Prices', range: [0, 100000] },
                    { label: 'Under ₹5,000', range: [0, 5000] },
                    { label: '₹5,000 - ₹15,000', range: [5000, 15000] },
                    { label: '₹15,000 - ₹30,000', range: [15000, 30000] },
                    { label: 'Over ₹30,000', range: [30000, 100000] },
                  ].map((filter, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="price-mobile" 
                        checked={priceRange[0] === filter.range[0] && priceRange[1] === filter.range[1]}
                        onChange={() => setPriceRange(filter.range as [number, number])}
                        className="w-5 h-5 text-amber-700 focus:ring-amber-700 border-stone-300"
                      />
                      <span className="text-base text-stone-600">{filter.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">Minimum Rating</h3>
                <div className="space-y-4">
                  {[4.5, 4.0, 3.0, 0].map((rating, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="rating-mobile" 
                        checked={minRating === rating}
                        onChange={() => setMinRating(rating)}
                        className="w-5 h-5 text-amber-700 focus:ring-amber-700 border-stone-300"
                      />
                      <span className="text-base text-stone-600">
                        {rating === 0 ? 'All Ratings' : `${rating} Stars & Up`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
          </div>
          
          <div className="sticky bottom-0 bg-white border-t border-stone-200 p-4 grid grid-cols-2 gap-4">
            <button 
              onClick={clearFilters}
              className="border border-stone-900 text-stone-900 py-3 text-sm uppercase tracking-wider font-medium"
            >
              Clear All
            </button>
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="bg-stone-900 text-white py-3 text-sm uppercase tracking-wider font-medium"
            >
              View Results ({filteredAndSortedProducts.length})
            </button>
          </div>
        </div>
      )}
    </>
  );
}
