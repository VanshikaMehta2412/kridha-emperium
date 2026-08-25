import React, { useState } from 'react';
import SEO from '../components/SEO';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is this a real store?",
      answer: "No, Kridha Imperial Homes is a fictional demonstration website created for educational, design, and SEO practice purposes. No real business operations exist."
    },
    {
      question: "Are the products real?",
      answer: "The products listed on this website are fictional. The images used are high-quality stock photography meant to represent the luxurious aesthetic of the fictional brand. You cannot actually purchase these items."
    },
    {
      question: "How do I place an order?",
      answer: "Since this is a demo site, you can simulate placing an order by adding items to your cart and proceeding through the checkout process. The checkout form accepts dummy data and will generate a fictional order confirmation without processing any real payments."
    },
    {
      question: "Can I add products to a wishlist?",
      answer: "Yes, you can click the heart icon on any product card or product details page to add it to your wishlist. Your wishlist is saved in your browser's local storage so it persists even if you refresh the page."
    },
    {
      question: "How does the cart work?",
      answer: "The cart allows you to add products, adjust quantities, and remove items. It automatically calculates the subtotal. Like the wishlist, cart data is stored locally in your browser."
    },
    {
      question: "What payment methods are available?",
      answer: "For demonstration purposes, the checkout page offers options like 'Cash on Delivery', 'Demo Card Payment', and 'Demo UPI'. None of these actually process real financial transactions."
    },
    {
      question: "What is the return policy?",
      answer: "As this is a fictional store, there is no actual return policy. However, in a real scenario, a luxury brand like this would typically offer a 14 to 30-day return window for items in their original condition."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <SEO title="FAQ" description="Frequently Asked Questions about Kridha Imperial Homes." />
      
      <div className="bg-stone-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Find answers to common questions about our fictional demonstration website.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl min-h-[50vh]">
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-stone-200 bg-white rounded-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <span className="font-medium text-stone-900 pr-8">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-amber-700 flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-stone-400 flex-shrink-0" size={20} />
                )}
              </button>
              
              <div 
                className={cn(
                  "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
