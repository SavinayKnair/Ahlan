import Script from "next/script";

export default function SchemaMarkup() {
  const siteName = "Ahlan Homestays";
  const alternateName = "Ahlanandaman.in";
  const baseUrl = "https://ahlanandaman.in";

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "alternateName": alternateName,
    "url": baseUrl
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "BedAndBreakfast"],
    name: siteName,
    description:
      "Ahlan Homestays | Premium Gold Category Homestay in Port Blair. Spacious 300+ sq ft deluxe AC rooms, curated island packages, airport transfers and world-class hospitality.",
    url: baseUrl,
    telephone: "+91-9434281386",
    email: "ahlanhomestays@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Port Blair",
      addressLocality: "Port Blair",
      addressRegion: "Andaman and Nicobar Islands",
      postalCode: "744101",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.6234,
      longitude: 92.7265,
    },
    image: `${baseUrl}/images/rooms/forest-view.jpeg`,
    priceRange: "₹₹",
    starRating: {
      "@type": "Rating",
      ratingValue: "5",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Air Conditioning", value: true },
      { "@type": "LocationFeatureSpecification", name: "Airport Shuttle", value: true },
      { "@type": "LocationFeatureSpecification", name: "Breakfast", value: true },
      { "@type": "LocationFeatureSpecification", name: "Smart TV", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "450",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [
      "https://www.instagram.com/_ahlan.homestays_",
      "https://www.facebook.com/ahlanhomestays",
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${siteName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${siteName} is a Premium Gold Category Homestay in Port Blair, Andaman & Nicobar Islands. We offer spacious 300+ sq ft deluxe AC rooms with hotel-grade comfort and homely warmth.`,
        },
      },
      {
        "@type": "Question",
        name: `Where is ${siteName} located?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are located in Port Blair, Andaman & Nicobar Islands, close to Cellular Jail, Corbyn's Cove Beach, and Veer Savarkar International Airport.",
        },
      },
      {
        "@type": "Question",
        name: `What amenities does ${siteName} offer?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer AC rooms with premium washrooms, high-speed WiFi, Smart TV, daily housekeeping, airport pickup/drop, breakfast, local travel guidance, and curated island sightseeing packages.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
    ],
  };

  return (
    <>
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
