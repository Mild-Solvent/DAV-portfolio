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
                "Mobile Applications",
                "React",
                "TypeScript",
                "Next.js",
                "Node.js",
                "UI/UX Design",
                "Performance Optimization",
                "Cloud DevOps",
                "AI Integration"
              ],
              "offers": {
                "@type": "Offer",
                "description": "Professional web development services including modern web applications, mobile apps, UI/UX design, performance audits, cloud solutions, and AI integration"
              },
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
