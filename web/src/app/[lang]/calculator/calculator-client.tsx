'use client';
import React from 'react';
import Header from '../../../components/Header/Header';
import Calculator from '../../../components/Calculator/Calculator';
import Footer from '../../../components/Footer/Footer';

export default function CalculatorPageClient() {
  return (
    <>
      <Header />
      <main style={{ 
        position: 'relative', 
        zIndex: 10, 
        marginTop: '100px',
        background: 'transparent',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Calculator />
        <Footer />
      </main>
    </>
  );
}
