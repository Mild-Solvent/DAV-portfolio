"use client";
import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Services from '../components/Services/Services';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import SectionDots from '../components/SectionDots/SectionDots';
import ScrollToTop from '../components/ScrollButton/ScrollButton';
import { LanguageSwitch } from '../components/LanguageSwitch';

export default function Home() {
  return (
    <>
      <SectionDots />
      <ScrollToTop />
      <LanguageSwitch />
      <Header />
      <Hero />
      <main style={{ 
        position: 'relative', 
        zIndex: 10, 
        marginTop: '100vh',
        background: 'transparent'
      }}>
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
