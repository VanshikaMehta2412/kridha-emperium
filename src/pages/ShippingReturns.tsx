import React from 'react';
import SEO from '../components/SEO';

export default function ShippingReturns() {
  return (
    <>
      <SEO title="Shipping & Returns" description="Shipping and Returns policy for Kridha Imperial Homes." />
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">Shipping & Returns (Demo)</h1>
        
        <div className="prose prose-neutral max-w-none text-stone-600 space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 text-amber-900 mb-8 text-center">
            <strong>Notice:</strong> As Kridha Imperial Homes is a fictional demonstration website, no actual products are shipped, and no real returns can be processed. The information below is for layout demonstration purposes only.
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4 border-b border-stone-200 pb-2">Demo Shipping Policy</h2>
              <ul className="space-y-4 list-disc pl-5">
                <li><strong>Standard Delivery:</strong> 5-7 business days (Free on orders over ₹10,000)</li>
                <li><strong>Express Delivery:</strong> 2-3 business days (Flat rate ₹999)</li>
                <li><strong>White Glove Delivery:</strong> Available for large furniture items. Includes in-room placement and packaging removal.</li>
                <li>International shipping is not available at this time.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-serif text-2xl text-stone-900 mb-4 border-b border-stone-200 pb-2">Demo Return Policy</h2>
              <ul className="space-y-4 list-disc pl-5">
                <li>Items can be returned within 14 days of delivery.</li>
                <li>Products must be unused, in their original condition, and with all original packaging intact.</li>
                <li>Custom-made or clearance items are non-refundable.</li>
                <li>Return shipping costs are the responsibility of the customer unless the item arrived damaged.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
