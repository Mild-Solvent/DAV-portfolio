'use client';

import BookingCalendar from '@/components/BookingCalendar/BookingCalendar';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-primary)] pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Book Your <span className="text-gradient-purple">Appointment</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Select a date to schedule your consultation
          </p>
        </div>
        
        <BookingCalendar />
      </div>
    </div>
  );
}
