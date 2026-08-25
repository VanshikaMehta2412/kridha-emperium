import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="container mx-auto px-4 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl md:text-7xl text-stone-900 mb-6">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 mb-6">This Room Seems to Be Missing.</h2>
        <p className="text-stone-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-800 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </>
  );
}
