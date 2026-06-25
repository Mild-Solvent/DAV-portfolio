"use client";
import React from 'react';
import Header from '../../components/Header/Header';
import Hero from '../../components/Hero/Hero';
import About from '../../components/About/About';
import Skills from '../../components/Skills/Skills';
import Projects from '../../components/Projects/Projects';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';
import CookieBanner from '../../components/CookieBanner/CookieBanner';
import ScrollToTop from '../../components/ScrollButton/ScrollButton';
import PacmanDivider from '../../components/PacmanDivider/PacmanDivider';
import PacmanLoop from '../../components/PacmanDivider/PacmanLoop';

export default function LangHomeClient() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Hero />
      <main style={{ 
        position: 'relative', 
        zIndex: 10, 
        marginTop: '100vh',
        background: 'transparent',
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ flex: '1' }}>
          <PacmanDivider />
          <About />
          <PacmanLoop />
          <Projects />
          <Skills />
          <Contact />
        </div>
        <Footer />
      </main>
      <CookieBanner />
    </>
  );
}
