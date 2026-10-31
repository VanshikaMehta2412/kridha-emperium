import React from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <SEO
        title="About Us | Luxury Home Decor & Interior Design | Kridha Imperial Homes"
        description="Learn about the design philosophy of Kridha Imperial Homes, a luxury home decor demonstration project focused on elegant furniture, decorative lighting and modern interior decor."
        canonicalUrl="https://kridha-emperium.vercel.app/about"
        robots="index, follow"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Kridha Imperial Homes | Luxury Home Decor",
            description:
              "Learn about Kridha Imperial Homes, a fictional luxury home decor demonstration project created for digital marketing and SEO practice, featuring elegant furniture, decorative lighting and modern interior design.",
            url: "https://kridha-emperium.vercel.app/about",
            about: {
              "@type": "Organization",
              name: "Kridha Imperial Homes",
              url: "https://kridha-emperium.vercel.app/",
            },
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Kridha Imperial Homes",
            url: "https://kridha-emperium.vercel.app/",
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://kridha-emperium.vercel.app/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: "https://kridha-emperium.vercel.app/about",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury modern living room interior with elegant furniture and home decor"
            className="w-full h-full object-cover filter brightness-[0.6]"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
            Luxury Home Decor Brand in India
          </h1>
          <p className="text-stone-200 tracking-widest uppercase text-sm md:text-base">
            Where Timeless Elegance Meets Your Home
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-6 mb-16 text-center text-amber-900 rounded-sm">
          <p className="font-medium text-sm md:text-base">
            <strong>Disclaimer:</strong> Kridha Imperial Homes is a fictional
            demonstration luxury home décor brand created solely as an
            e-commerce website project for Digital Marketing and SEO practice.
            This is not a real established company.
          </p>
        </div>

        <div className="text-center mb-16">
          <p className="text-stone-600 leading-relaxed mb-4">
            Explore our collections of elegant furniture, decorative lighting
            and stylish home accessories for modern interiors.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <Link
              to="/products"
              className="text-amber-800 underline underline-offset-4 hover:text-amber-600"
            >
              Explore Our Products
            </Link>
            <Link
              to="/"
              className="text-amber-800 underline underline-offset-4 hover:text-amber-600"
            >
              Visit Homepage
            </Link>
          </div>
        </div>

        {/* Section 1 */}
        <section className="mb-20">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6 text-center">
            Our Design Philosophy
          </h2>
          <div className="w-16 h-px bg-amber-700 mx-auto mb-8"></div>
          <p className="text-stone-600 text-lg leading-relaxed text-center mb-8">
            At Kridha Imperial Homes, we believe that your living space should
            be a reflection of your personal style. This demonstration project
            explores the idea of luxury home decor through timeless elegance,
            blending classic architectural proportions with modern
            sensibilities. Its curated collections showcase how furniture,
            decorative lighting and accessories can bring sophistication, warmth
            and character to modern interiors.
          </p>
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
            alt="Elegant living room interior with modern luxury home decor"
            loading="lazy"
            className="w-full h-[400px] object-cover rounded-sm"
          />
        </section>

        {/* Section 2 */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
              alt="Curated furniture and decorative accessories for modern interiors"
              loading="lazy"
              className="w-full h-auto object-cover rounded-sm shadow-xl"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-stone-900 mb-6">
              Carefully Curated Collections
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Our collections are meticulously sourced to represent the pinnacle
              of luxury home decor. From hand-knotted Persian heritage rugs to
              statement marble sculptures, every item in our catalog is chosen
              for its superior craftsmanship, premium materials, and striking
              aesthetic appeal. Our approach to premium home decor in India
              combines timeless design with carefully selected pieces for
              sophisticated living spaces.
            </p>
            <p className="text-stone-600 leading-relaxed">
              We strive to offer a cohesive aesthetic—warm, inviting, yet
              undeniably regal—allowing you to confidently style your home
              knowing that every piece will harmonize beautifully.
            </p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-stone-900 text-white p-12 text-center rounded-sm">
          <h2 className="font-serif text-3xl mb-8">
            Why Kridha Imperial Homes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl text-amber-500 mb-3">
                Premium Aesthetic
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                We focus on sophisticated designs that transcend fleeting
                trends, ensuring your home remains stylish for years to come.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-amber-500 mb-3">
                Elegant Materials
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                From genuine marble to solid mahogany and premium velvet, we
                celebrate the inherent beauty of high-quality materials.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl text-amber-500 mb-3">
                Curated Experience
              </h3>
              <p className="text-stone-400 text-sm leading-relaxed">
                Our cohesive collections make it effortless to create a
                professionally styled look in your own home.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
