import React from 'react';
import SEO from '../components/SEO';

export default function TermsConditions() {
  return (
    <>
      <SEO title="Terms & Conditions" description="Terms & Conditions for Kridha Imperial Homes (Demo)." />
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">Terms & Conditions</h1>
        
        <div className="prose prose-neutral max-w-none text-stone-600 space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 text-amber-900 mb-8">
            <strong>CRITICAL NOTICE:</strong> Kridha Imperial Homes is a fictional demonstration website created for educational, portfolio, and SEO practice purposes. 
          </div>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">1. Educational Purpose</h2>
          <p>
            This website is not a real business. All products, descriptions, prices, and company information are fictional. The site is intended solely to demonstrate web development capabilities and functional UI design.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">2. No Real Transactions</h2>
          <p>
            Under no circumstances do real financial transactions occur on this website. The checkout process is a simulation. Do not enter real credit card information or sensitive financial details into any forms on this site.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">3. Fictional Products and Pricing</h2>
          <p>
            All products listed, including their specifications, images, and pricing in INR (₹), are fictional. We do not manufacture, sell, or ship any physical goods.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            The design, layout, and code structure of this demo site are created for educational purposes. Images used are sourced from public platforms (e.g., Unsplash) and remain the property of their respective creators.
          </p>

          <p className="mt-12 text-sm text-stone-500">Last updated: August 2026</p>
        </div>
      </div>
    </>
  );
}
