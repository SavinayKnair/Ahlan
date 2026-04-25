import Script from "next/script";

export default function SchemaMarkup() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "BedAndBreakfast"],
    name: "Ahlan Homestays",
    description:
      "Premium Gold Category Homestay in Port Blair, Andaman & Nicobar Islands. Spacious 300+ sq ft deluxe AC rooms, curated island packages, airport transfers and world-class hospitality.",
    url: "https://ahlanhomestays.com",
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
    image: "https://ahlanhomestays.com/og-image.jpg",
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
      "https://www.instagram.com/ahlanhomestays",
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
        name: "What is Ahlan Homestays?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ahlan Homestays is a Premium Gold Category Homestay in Port Blair, Andaman & Nicobar Islands. We offer spacious 300+ sq ft deluxe AC rooms with hotel-grade comfort and homely warmth.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Ahlan Homestays located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are located in Port Blair, Andaman & Nicobar Islands, close to Cellular Jail, Corbyn's Cove Beach, and Veer Savarkar International Airport.",
        },
      },
      {
        "@type": "Question",
        name: "What amenities does Ahlan Homestays offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer AC rooms with premium washrooms, high-speed WiFi, Smart TV, daily housekeeping, airport pickup/drop, breakfast, local travel guidance, and curated island sightseeing packages.",
        },
      },
      {
        "@type": "Question",
        name: "What are your package prices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our 4N/5D package starts at ₹21,999 per person and 5N/6D starts at ₹25,555 per person. Packages include ferry tickets, breakfast, deluxe stay, airport transfers, sightseeing and a dedicated coordinator. Use code A&NLUV10% for 10% off.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book at Ahlan Homestays?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book by WhatsApp at +91 9434281386, by calling us directly, or using our online booking form. We typically respond within minutes.",
        },
      },
      {
        "@type": "Question",
        name: "Is Ahlan Homestays good for honeymoon couples?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We have a special Honeymoon Bliss Package with romantic room décor, candlelight dinner, beach photoshoot and a couple's trip planner.",
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
        item: "https://ahlanhomestays.com",
      },
    ],
  };

  return (
    <>
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
