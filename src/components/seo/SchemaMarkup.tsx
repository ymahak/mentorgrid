"use client";

interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  image?: string;
  url: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

interface CourseSchemaProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  duration?: string;
  level?: string;
  topics?: string[];
}

interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}

interface WebsiteSchemaProps {
  name: string;
  description: string;
  url: string;
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// Person Schema - For Mahak's profile
export function PersonSchema({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs = [],
  knowsAbout = [],
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    image,
    url,
    sameAs,
    knowsAbout,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Guru Gobind Singh Indraprastha University",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Course Schema - For individual courses
export function CourseSchema({
  name,
  description,
  provider,
  url,
  duration,
  level,
  topics = [],
}: CourseSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    provider: {
      "@type": "Person",
      name: provider,
      url: "https://mahakyadav.vercel.app/about",
    },
    url,
    timeRequired: duration,
    educationalLevel: level,
    teaches: topics,
    courseMode: "online",
    inLanguage: "en",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "400",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Article Schema - For blog posts
export function ArticleSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: {
      "@type": "Person",
      name: author,
      url: "https://mahakyadav.vercel.app/about",
    },
    datePublished,
    dateModified: dateModified || datePublished,
    image,
    url,
    publisher: {
      "@type": "Person",
      name: "Mahak Yadav",
      logo: {
        "@type": "ImageObject",
        url: "https://mahakyadav.vercel.app/images/mahak-yadav.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema - For homepage
export function WebsiteSchema({ name, description, url }: WebsiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Educational Organization Schema
export function EducationalOrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Mahak Yadav - Tech Training",
    description: "Personalized tech training in AI/ML, Data Science, and Full-Stack Development",
    url: "https://mahakyadav.vercel.app",
    logo: "https://mahakyadav.vercel.app/images/mahak-yadav.jpg",
    founder: {
      "@type": "Person",
      name: "Mahak Yadav",
    },
    areaServed: "India",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tech Courses",
      itemListElement: [
        {
          "@type": "Course",
          name: "Python Programming",
          description: "Learn Python from basics to advanced",
        },
        {
          "@type": "Course",
          name: "Data Science & Analytics",
          description: "Master data analysis and visualization",
        },
        {
          "@type": "Course",
          name: "AI & Machine Learning",
          description: "Build intelligent AI systems",
        },
        {
          "@type": "Course",
          name: "Full-Stack Web Development",
          description: "Build complete web applications",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "400",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9817748915",
      contactType: "customer service",
      email: "ymahaky@gmail.com",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.linkedin.com/in/mahak-42675a39b/",
      "https://github.com/ymahak",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema - For FAQ sections
export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
