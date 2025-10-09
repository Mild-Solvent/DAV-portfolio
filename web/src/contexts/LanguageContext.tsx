import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sk: {
    // Header
    'nav.home': 'Domov',
    'nav.about': 'O mne', 
    'nav.skills': 'Zručnosti',
    'nav.services': 'Služby',
    'nav.projects': 'Projekty',
    'nav.contact': 'Kontakt',
    
    // Hero
    'hero.title': 'Vytváranie digitálnych zážitkov budúcnosti',
    'hero.title.highlight': 'digitálnych zážitkov',
    'hero.subtitle': 'Špecializujem sa na vývoj moderných webových aplikácií a používateľských rozhraní s dôrazom na výkonnosť, prístupnosť a skvelý dizajn.',
    'hero.cta.projects': 'Prezrieť projekty',
    'hero.cta.contact': 'Kontakt',
    
    // About
    'about.title': 'O nás',
    'about.heading': 'Weboví vývojári s vášňou pre moderné technológie',
    'about.description': 'Vytvoríme Vám moderné a responzívne webové stránky s dôrazom na používateľskú skúsenosť a výkonnosť. Špecializujeme sa na frontend development s použitím najnovších technológií a máme bohaté skúsenosti s navrhovaním komplexných webových aplikácií - od jednoduchých landing pages až po zložité enterprise systémy. Neustále sa vzdelávame a sledujeme najnovšie trendy vo webovom vývoji, aby sme mohli ponúknuť najlepšie riešenia pre našich klientov.',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.tools': 'Nástroje',
    'about.skills.soft': 'Soft Skills',
    'about.skills.communication': 'Komunikácia s klientmi',
    'about.skills.project': 'Projektový manažment',
    'about.skills.problem': 'Riešenie problémov',
    'about.skills.team': 'Tímová práca',
    'about.skills.learning': 'Kontinuálne učenie',
    
    // Skills
    'skills.title': 'Technológie',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.devops': 'Cloud & DevOps',
    'skills.design': 'Design & UX',
    
    // Services
    'services.title': 'Služby',
    'services.subtitle': 'Špecializujem sa na vytvorenie digitálnych riešení, ktoré pomáhajú firmám dosiahnuť ich ciele pomocou moderných technológií a inovatívneho dizajnu.',
    'services.web.title': 'Webový Vývoj',
    'services.web.description': 'Moderné, responzívne webové aplikácie s najnovšími technológiami',
    'services.mobile.title': 'Mobilné Aplikácie',
    'services.mobile.description': 'Cross-platform mobilné aplikácie pre iOS a Android',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'Používateľsky prívetivý dizajn s dôrazom na skúsenosti',
    'services.audit.title': 'Performance Audit',
    'services.audit.description': 'Optimalizácia výkonu a SEO pre existujúce aplikácie',
    'services.cloud.title': 'Cloud & DevOps',
    'services.cloud.description': 'Nasadenie a správa aplikácií v cloudovom prostredí',
    'services.ai.title': 'AI Integration',
    'services.ai.description': 'Integrácia umelej inteligencie do webových aplikácií',
    
    // Projects
    'projects.title': 'Projekty',
    'projects.ecommerce.title': 'E-commerce Platform',
    'projects.ecommerce.description': 'Moderná e-commerce platforma s pokročilými funkciami ako je správa objednávok, platby a inventory management.',
    'projects.dashboard.title': 'Dashboard Analytics',
    'projects.dashboard.description': 'Interaktívny dashboard pre analýzu dát s reálne časovými grafmi a reportmi pre business intelligence.',
    'projects.social.title': 'Social Media App',
    'projects.social.description': 'Sociálna sieť s možnosťou zdieľania obsahu, komentárov a real-time chatu medzi používateľmi.',
    'projects.portfolio.title': 'Portfolio Website',
    'projects.portfolio.description': 'Krásne portfólio webové stránky pre kreatívnych profesionálov s animáciami a moderným dizajnom.',
    'projects.task.title': 'Task Management Tool',
    'projects.task.description': 'Komplexný nástroj na správu projektov a úloh s možnosťou kolaborácie v reálnom čase.',
    'projects.weather.title': 'Weather App',
    'projects.weather.description': 'Elegantná weather aplikácia s predpoveďou počasia, mapami a personalizovanými upozorneniami.',
    'projects.demo': 'Demo',
    'projects.github': 'GitHub',
    
    // Contact
    'contact.title': 'Kontaktujte ma',
    'contact.heading': 'Poďme spolupracovať',
    'contact.description': 'Máte zaujímavý projekt alebo potrebujete pomoc s webovým vývojom? Neváhajte ma kontaktovať. Rád sa s vami porozprávam o vašich nápadoch a spolu vytvoríme niečo úžasné.',
    'contact.email': 'Email',
    'contact.phone': 'Telefón',
    'contact.location': 'Lokalizácia',
    'contact.form.name': 'Meno',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Predmet',
    'contact.form.message': 'Správa',
    'contact.form.submit': 'Odoslať správu',
    'contact.form.success': 'Správa bola odoslaná! Ďakujem za váš záujem.',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.services': 'Services',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Creating digital experiences of the future',
    'hero.title.highlight': 'digital experiences',
    'hero.subtitle': 'I specialize in developing modern web applications and user interfaces with focus on performance, accessibility and great design.',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Contact',
    
    // About
    'about.title': 'About Me',
    'about.heading': 'Web Developer with passion for modern technologies',
    'about.description': 'I create modern and responsive websites with focus on user experience and performance. I specialize in frontend development using the latest technologies and have extensive experience in designing and implementing complex web applications - from simple landing pages to complex enterprise systems. I constantly educate myself and follow the latest trends in web development to offer the best solutions for my clients.',
    'about.skills.frontend': 'Frontend',
    'about.skills.backend': 'Backend',
    'about.skills.tools': 'Tools',
    'about.skills.soft': 'Soft Skills',
    'about.skills.communication': 'Client Communication',
    'about.skills.project': 'Project Management',
    'about.skills.problem': 'Problem Solving',
    'about.skills.team': 'Team Work',
    'about.skills.learning': 'Continuous Learning',
    
    // Skills
    'skills.title': 'Skills & Technologies',
    'skills.frontend': 'Frontend Development',
    'skills.backend': 'Backend Development',
    'skills.devops': 'Cloud & DevOps',
    'skills.design': 'Design & UX',
    
    // Services
    'services.title': 'What I Do',
    'services.subtitle': 'I specialize in creating digital solutions that help companies achieve their goals using modern technologies and innovative design.',
    'services.web.title': 'Web Development',
    'services.web.description': 'Modern, responsive web applications with latest technologies',
    'services.mobile.title': 'Mobile Applications',
    'services.mobile.description': 'Cross-platform mobile applications for iOS and Android',
    'services.design.title': 'UI/UX Design',
    'services.design.description': 'User-friendly design with focus on experience',
    'services.audit.title': 'Performance Audit',
    'services.audit.description': 'Performance and SEO optimization for existing applications',
    'services.cloud.title': 'Cloud & DevOps',
    'services.cloud.description': 'Deployment and management of applications in cloud environment',
    'services.ai.title': 'AI Integration',
    'services.ai.description': 'Artificial intelligence integration into web applications',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.ecommerce.title': 'E-commerce Platform',
    'projects.ecommerce.description': 'Modern e-commerce platform with advanced features like order management, payments and inventory management.',
    'projects.dashboard.title': 'Dashboard Analytics',
    'projects.dashboard.description': 'Interactive dashboard for data analysis with real-time charts and reports for business intelligence.',
    'projects.social.title': 'Social Media App',
    'projects.social.description': 'Social network with content sharing, comments and real-time chat between users.',
    'projects.portfolio.title': 'Portfolio Website',
    'projects.portfolio.description': 'Beautiful portfolio websites for creative professionals with animations and modern design.',
    'projects.task.title': 'Task Management Tool',
    'projects.task.description': 'Comprehensive tool for project and task management with real-time collaboration capabilities.',
    'projects.weather.title': 'Weather App',
    'projects.weather.description': 'Elegant weather application with weather forecast, maps and personalized notifications.',
    'projects.demo': 'Demo',
    'projects.github': 'GitHub',
    
    // Contact
    'contact.title': 'Contact Me',
    'contact.heading': "Let's work together",
    'contact.description': 'Do you have an interesting project or need help with web development? Don\'t hesitate to contact me. I\'d be happy to discuss your ideas and create something amazing together.',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Message sent! Thank you for your interest.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sk');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};