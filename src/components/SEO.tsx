import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  type?: string;
  name?: string;
  canonicalUrl?: string;
  image?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  robots = "index, follow",
  type = "website",
  name = "Kridha Imperial Homes",
  canonicalUrl,
  image = "https://kridha-emperium.vercel.app/og-image.png",
}: SEOProps) {
  const pageUrl =
    canonicalUrl ?? `${window.location.origin}${window.location.pathname}`;

  const fullTitle = `${title} | ${name}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />

      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
