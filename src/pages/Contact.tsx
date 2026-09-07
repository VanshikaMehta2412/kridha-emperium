import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Helmet } from 'react-helmet-async';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <>
      <SEO
        title="Luxury Home Decor Contact"
        description="Contact Kridha Imperial Homes for luxury home decor inquiries, product assistance, orders, and home decor customer support."
      />

      <Helmet>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Luxury Home Decor Contact",
      "description": "Contact Kridha Imperial Homes for luxury home decor inquiries, product assistance, orders, and home decor customer support.",
      "url": "https://kridha-emperium.vercel.app/contact",
      "mainEntity": {
        "@type": "Organization",
        "name": "Kridha Imperial Homes",
        "url": "https://kridha-emperium.vercel.app/"
      }
    })}
  </script>

  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kridha-emperium.vercel.app/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Contact Us",
          "item": "https://kridha-emperium.vercel.app/contact"
        }
      ]
    })}
  </script>
</Helmet>
      
      {/* Page Header */}
      <div className="bg-stone-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">
          Luxury Home Decor Contact
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
          Have questions about our luxury home decor collections, orders, or styling advice? Contact Kridha Imperial Homes for home decor customer support and assistance.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="font-serif text-3xl text-stone-900 mb-8">
            Home Decor Customer Support
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2 uppercase tracking-wide text-sm">Contact Information (Demo)</h3>
                <p className="text-stone-600">
                  Phone: +91 98765 43210<br />
                  Email: kridha.imperialhomes@gmail.com
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2 uppercase tracking-wide text-sm">Business Hours (Demo)</h3>
                <p className="text-stone-600">
                  Monday - Saturday: 10:00 AM - 7:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 p-8 text-center h-full flex flex-col justify-center items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-stone-900 mb-2">Thank you!</h3>
                <p className="text-stone-600">Your message has been received. We will get back to you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-amber-700 underline underline-offset-4 hover:text-amber-800"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors bg-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-2">Subject *</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required 
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-stone-300 px-4 py-3 focus:outline-none focus:border-amber-700 focus:ring-1 focus:ring-amber-700 transition-colors bg-transparent resize-y"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="bg-stone-900 text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-amber-800 transition-colors w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
