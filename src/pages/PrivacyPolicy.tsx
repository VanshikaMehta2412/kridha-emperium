import React from 'react';
import SEO from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description="Privacy Policy for Kridha Imperial Homes (Demo)." />
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8">Privacy Policy (Demo)</h1>
        
        <div className="prose prose-neutral max-w-none text-stone-600 space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 text-amber-900 mb-8">
            <strong>Note:</strong> This is a fictional Privacy Policy for a demonstration website. No real personal data is collected or processed for commercial purposes.
          </div>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">1. Information Collection</h2>
          <p>
            As a demonstration website, Kridha Imperial Homes does not actively collect, store, or process real personal data on external servers. Any information entered into forms (such as contact forms or checkout) is purely for functional demonstration and is not saved persistently in a database.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">2. Local Storage</h2>
          <p>
            To provide a realistic e-commerce experience, this website uses your browser's local storage (localStorage) to save your Shopping Cart and Wishlist data. This data remains on your device and is not transmitted to any external server.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">3. Use of Information</h2>
          <p>
            Any fictional information entered during the demo checkout process is used solely to generate a demo order confirmation screen and is immediately discarded upon refreshing the page or leaving the site.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mt-8 mb-4">4. Third-Party Services</h2>
          <p>
            This demo site may use publicly available images from sources like Unsplash. Your IP address may be exposed to these third-party image hosting services when images are loaded.
          </p>

          <p className="mt-12 text-sm text-stone-500">Last updated: August 2026</p>
        </div>
      </div>
    </>
  );
}
