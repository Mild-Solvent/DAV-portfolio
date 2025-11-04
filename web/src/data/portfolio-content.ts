export const portfolioContent = {
  // Services & Pricing
  services: [
    {
      id: 'web-development',
      title: 'Web Development & E-commerce',
      description: 'Modern, responsive web applications, e-commerce stores, online shops, SaaS platforms, and custom web solutions with latest technologies (React, Vue.js, Next.js, TypeScript)',
      price: 'From $500',
      category: 'development'
    },
    {
      id: 'mobile-applications',
      title: 'Mobile App Development', 
      description: 'Cross-platform mobile applications for iOS and Android, React Native apps, native mobile development for smartphones and tablets',
      price: 'From $875',
      category: 'development'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design & Responsive Design',
      description: 'User-friendly design with focus on user experience, responsive layouts, Figma prototypes, Adobe XD mockups, and modern interface design',
      price: 'From $375',
      category: 'design'
    },
    {
      id: 'performance-audit',
      title: 'Performance & SEO Optimization',
      description: 'Website performance audits, SEO optimization, speed improvements, search engine visibility, and technical optimization for web applications',
      price: 'From $200',
      category: 'optimization'
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps Solutions',
      description: 'Cloud deployment and management (AWS, Docker, Kubernetes), CI/CD pipelines, DevOps automation, scalable infrastructure for web and mobile applications',
      price: 'From $300',
      category: 'infrastructure'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration & Machine Learning',
      description: 'Artificial intelligence integration, machine learning features, AI-powered chatbots, intelligent automation, and smart web application features',
      price: 'Contact for pricing',
      category: 'ai'
    }
  ],

  // Technical Skills by Category
  skills: {
    frontend: {
      title: 'Frontend Development',
      technologies: [
        'React',
        'TypeScript', 
        'Next.js',
        'Vue.js',
        'Tailwind CSS',
        'Styled Components',
        'Framer Motion'
      ]
    },
    backend: {
      title: 'Backend Development',
      technologies: [
        'Node.js',
        'Express',
        'Python',
        'PostgreSQL',
        'MongoDB', 
        'GraphQL',
        'REST APIs'
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      technologies: [
        'AWS',
        'Docker',
        'Kubernetes',
        'CI/CD',
        'GitHub Actions',
        'Vercel',
        'Heroku'
      ]
    },
    design: {
      title: 'Design & UX',
      technologies: [
        'Figma',
        'Adobe XD',
        'Photoshop',
        'UI/UX Design',
        'Responsive Design',
        'Accessibility'
      ]
    }
  },

  // Proficiency Levels
  proficiency: [
    {
      skill: 'React & TypeScript',
      level: 95,
      color: '#61DAFB'
    },
    {
      skill: 'CSS/SCSS & Design', 
      level: 92,
      color: '#1572B6'
    },
    {
      skill: 'Node.js & Express',
      level: 88,
      color: '#339933'
    },
    {
      skill: 'Database Design',
      level: 85,
      color: '#336791'
    },
    {
      skill: 'DevOps & Cloud',
      level: 75,
      color: '#FF9900'
    },
    {
      skill: 'Mobile Development',
      level: 70,
      color: '#A4C639'
    }
  ],

  // Service Categories for filtering
  categories: {
    development: 'Development',
    design: 'Design',
    optimization: 'Optimization', 
    infrastructure: 'Infrastructure',
    ai: 'AI & Machine Learning'
  }
};

export type Service = typeof portfolioContent.services[0];
export type SkillCategory = keyof typeof portfolioContent.skills;
export type ProficiencyItem = typeof portfolioContent.proficiency[0];