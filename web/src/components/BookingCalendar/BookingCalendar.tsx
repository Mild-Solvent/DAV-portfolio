'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './calendar.css';

export default function BookingCalendar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateSelect = (day: number) => {
    const selected = new Date(year, month, day);
    if (selected < today) return;
    
    setSelectedDate(selected);
    // Store in session and redirect to form
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedDate', selected.toISOString());
      router.push('/booking/form');
    }
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const renderDays = () => {
    const days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      days.push(
        <div key={`prev-${day}`} className="calendar-day other-month">
          {day}
        </div>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < today;
      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      
      days.push(
        <div
          key={`current-${day}`}
          className={`calendar-day ${isPast ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => !isPast && handleDateSelect(day)}
        >
          {day}
        </div>
      );
    }
    
    // Next month days
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="calendar-day other-month">
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <>
      <div className="calendar-card">
        <div className="calendar-header">
          <button
            className="month-nav"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            ←
          </button>
          <h2 className="month-title">
            {monthNames[month]} {year}
          </h2>
          <button
            className="month-nav"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            →
          </button>
        </div>

        <div className="calendar-days-header">
          <div className="day-header">Sun</div>
          <div className="day-header">Mon</div>
          <div className="day-header">Tue</div>
          <div className="day-header">Wed</div>
          <div className="day-header">Thu</div>
          <div className="day-header">Fri</div>
          <div className="day-header">Sat</div>
        </div>

        <div className="calendar-grid">
          {renderDays()}
        </div>
      </div>

      {/* Calendar Integration */}
      <div className="integration-section mt-12">
        <h3 className="text-2xl font-semibold text-[var(--color-text-secondary)] text-center mb-8">
          Sync with Your Calendar
        </h3>
        <div className="integration-buttons">
          <button className="integration-btn google">
            <span>📅</span>
            <span>Google Calendar</span>
          </button>
          <button className="integration-btn outlook">
            <span>📆</span>
            <span>Outlook Calendar</span>
          </button>
          <button className="integration-btn apple">
            <span>🍎</span>
            <span>Apple Calendar</span>
          </button>
        </div>
      </div>
    </>
  );
}
