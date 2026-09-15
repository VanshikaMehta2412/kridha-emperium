import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  type?: string;
  name?: string;
}

export default function SEO({ title, description, type = 'website', name = 'Kridha Imperial Homes' }: SEOProps) {
  const canonicalUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`;

  return (
    <Helmet>
      <title>{title} | {name}</title>
      <meta name='description' content={description} />

      <link rel='canonical' href={canonicalUrl} />

      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  );
}