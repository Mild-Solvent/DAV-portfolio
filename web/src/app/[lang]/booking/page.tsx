'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookingCalendar from '@/components/BookingCalendar/BookingCalendar';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] pt-32 pb-16">
      <div className="max-w-[1400px] mx-auto px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Book Your <span className="text-gradient-purple">Appointment</span>
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Select a date to schedule your consultation
          </p>
        </div>
        
        <BookingCalendar />
      </div>
    </div>
  );
}
