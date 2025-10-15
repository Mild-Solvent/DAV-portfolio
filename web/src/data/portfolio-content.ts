export const portfolioContent = {
  // Services & Pricing
  services: [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Modern, responsive web applications with latest technologies',
      price: 'From $500',
      category: 'development'
    },
    {
      id: 'mobile-applications',
      title: 'Mobile Applications', 
      description: 'Cross-platform mobile applications for iOS and Android',
      price: 'From $875',
      category: 'development'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-friendly design with focus on experience',
      price: 'From $375',
      category: 'design'
    },
    {
      id: 'performance-audit',
      title: 'Performance Audit',
      description: 'Performance and SEO optimization for existing applications',
      price: 'From $200',
      category: 'optimization'
    },
    {
      id: 'cloud-devops',
      title: 'Cloud & DevOps',
      description: 'Deployment and management of applications in cloud environment',
      price: 'From $300',
      category: 'infrastructure'
    },
    {
      id: 'ai-integration',
      title: 'AI Integration',
      description: 'Artificial intelligence integration into web applications',
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