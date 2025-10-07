"use client";
import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Skills from '../components/Skills/Skills';
import Services from '../components/Services/Services';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import { LanguageSwitch } from '../components/LanguageSwitch';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <LanguageSwitch />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
