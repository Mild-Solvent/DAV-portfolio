"use client";
import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import SectionDots from '../components/SectionDots/SectionDots';
import ScrollToTop from '../components/ScrollButton/ScrollButton';

export default function Home() {
  return (
    <>
      <SectionDots />
      <ScrollToTop />
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
        <Projects />
        <Contact />
      </main>
    </>
  );
}
