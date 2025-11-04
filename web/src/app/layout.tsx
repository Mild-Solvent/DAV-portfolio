export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "DAV Development",
              "description": "Professional web development team specializing in modern web applications, mobile development, and digital solutions",
              "url": "https://davdev.eu",
              "knowsAbout": [
                "Web Development",
                "E-commerce Development",
                "SaaS Development",
                "Online Store Development",
                "Shopping Cart Development",
                "Mobile Applications",
                "iOS Development",
                "Android Development",
                "React",
                "Vue.js",
                "TypeScript",
                "Next.js",
                "Node.js",
                "Python",
                "WordPress Development",
                "UI/UX Design",
                "Responsive Design",
                "Frontend Development",
                "Backend Development",
                "Full-Stack Development",
                "Performance Optimization",
                "SEO Optimization",
                "Cloud DevOps",
                "AWS",
                "Docker",
                "Kubernetes",
                "AI Integration",
                "Database Design",
                "API Development",
                "GraphQL",
                "REST API",
                "Express.js",
                "PostgreSQL",
                "MongoDB",
                "Figma",
                "Adobe XD"
              ],
              "offers": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce Development",
                    "description": "Custom e-commerce stores, online shops, shopping carts, payment integration, and WordPress ecommerce solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SaaS Development",
                    "description": "Enterprise SaaS platforms, software as a service applications, subscription-based web applications"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mobile App Development",
                    "description": "Cross-platform mobile applications for iOS and Android, React Native development"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Application Development",
                    "description": "Modern web applications, React, Vue.js, Next.js development, full-stack solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UI/UX Design",
                    "description": "User interface design, user experience optimization, Figma and Adobe XD design services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cloud & DevOps",
                    "description": "Cloud deployment, AWS, Docker, Kubernetes, CI/CD pipelines, DevOps solutions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Performance & SEO Optimization",
                    "description": "Website performance audits, SEO optimization, speed optimization, search engine visibility"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "AI Integration",
                    "description": "Artificial intelligence integration, machine learning features, AI-powered web applications"
                  }
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "David"
              }
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
