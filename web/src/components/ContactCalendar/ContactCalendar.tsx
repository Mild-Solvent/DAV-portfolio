'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import { theme } from '@/styles/theme';

const CalendarWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
`;

const CalendarCard = styled.div`
  background: linear-gradient(145deg, rgba(22, 27, 34, 0.95) 0%, rgba(13, 17, 23, 0.98) 100%);
  border: 1px solid rgba(88, 166, 255, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4),
              0 0 40px rgba(88, 166, 255, 0.1),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${theme.gradients.blue};
    opacity: 0.5;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(163, 113, 247, 0.05) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
`;

const MonthTitle = styled.h2`
  font-size: ${theme.fontSizes['3xl']};
  font-weight: 700;
  background: ${theme.gradients.blue};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  letter-spacing: -0.01em;
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, rgba(48, 54, 61, 0.8) 0%, rgba(33, 38, 45, 0.9) 100%);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.xl};
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(88, 166, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:hover {
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border-color: ${theme.colors.accent};
    color: ${theme.colors.white};
    box-shadow: 0 4px 20px rgba(88, 166, 255, 0.3);
    transform: translateY(-2px);
    
    &::before {
      width: 100%;
      height: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const DaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const DayLabel = styled.div`
  text-align: center;
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.sm};
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${theme.spacing.sm};
`;

const DayCell = styled.button<{ $isOtherMonth?: boolean; $isPast?: boolean; $isToday?: boolean; $isSelected?: boolean }>`
  aspect-ratio: 1;
  border: 1px solid ${props => 
    props.$isSelected ? theme.colors.accent : 
    props.$isToday ? theme.colors.secondary : 
    'rgba(48, 54, 61, 0.6)'
  };
  border-radius: ${theme.borderRadius.md};
  background: ${props => 
    props.$isSelected ? `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%)` :
    props.$isOtherMonth ? 'transparent' : 
    props.$isPast ? 'rgba(13, 17, 23, 0.5)' : 
    'linear-gradient(135deg, rgba(48, 54, 61, 0.4) 0%, rgba(33, 38, 45, 0.5) 100%)'
  };
  color: ${props => 
    props.$isOtherMonth ? theme.colors.textMuted : 
    props.$isPast ? theme.colors.textMuted :
    props.$isSelected ? theme.colors.white :
    theme.colors.text
  };
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  cursor: ${props => (props.$isPast || props.$isOtherMonth) ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${theme.gradients.blue};
    opacity: 0;
    transition: opacity 0.3s;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border-color: ${theme.colors.accent};
    color: ${theme.colors.white};
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 8px 25px rgba(88, 166, 255, 0.35),
                0 0 20px rgba(88, 166, 255, 0.2);
    
    &::before {
      opacity: 0.15;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${props => props.$isToday && !props.$isSelected && `
    box-shadow: 0 0 0 2px ${theme.colors.secondary},
                0 0 20px rgba(31, 111, 235, 0.4);
    border-color: ${theme.colors.secondary};
  `}
  
  ${props => props.$isSelected && `
    box-shadow: 0 8px 30px rgba(88, 166, 255, 0.4),
                0 0 30px rgba(88, 166, 255, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
  `}
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xl};
  margin-top: ${theme.spacing.xl};
  padding-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.border};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

const LegendColor = styled.div<{ $color: string }>`
  width: 20px;
  height: 20px;
  border-radius: ${theme.borderRadius.sm};
  background: ${props => props.$color};
  border: 1px solid ${theme.colors.border};
`;

export default function ContactCalendar() {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'sk';
  
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

  const handleDateSelect = (day: number, isOtherMonth: boolean) => {
    if (isOtherMonth) return;
    
    const selected = new Date(year, month, day);
    if (selected < today) return;
    
    setSelectedDate(selected);
    
    // Store in session and redirect to contact form
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedDate', selected.toISOString());
      router.push(`/${lang}/calendar/contact`);
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
        <DayCell
          key={`prev-${day}`}
          $isOtherMonth={true}
          disabled
        >
          {day}
        </DayCell>
      );
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      
      days.push(
        <DayCell
          key={`current-${day}`}
          $isPast={isPast}
          $isToday={isToday}
          $isSelected={isSelected}
          onClick={() => handleDateSelect(day, false)}
          disabled={isPast}
        >
          {day}
        </DayCell>
      );
    }
    
    // Next month days to fill grid
    const totalCells = days.length;
    const remainingCells = 42 - totalCells;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <DayCell
          key={`next-${day}`}
          $isOtherMonth={true}
          disabled
        >
          {day}
        </DayCell>
      );
    }
    
    return days;
  };

  return (
    <CalendarWrapper>
      <CalendarCard>
        <CalendarHeader>
          <NavButton
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            ←
          </NavButton>
          <MonthTitle>
            {monthNames[month]} {year}
          </MonthTitle>
          <NavButton
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            →
          </NavButton>
        </CalendarHeader>

        <DaysHeader>
          <DayLabel>Sun</DayLabel>
          <DayLabel>Mon</DayLabel>
          <DayLabel>Tue</DayLabel>
          <DayLabel>Wed</DayLabel>
          <DayLabel>Thu</DayLabel>
          <DayLabel>Fri</DayLabel>
          <DayLabel>Sat</DayLabel>
        </DaysHeader>

        <DaysGrid>
          {renderDays()}
        </DaysGrid>

        <Legend>
          <LegendItem>
            <LegendColor $color={theme.colors.secondary} />
            <span>Today</span>
          </LegendItem>
          <LegendItem>
            <LegendColor $color={theme.colors.surface} />
            <span>Available</span>
          </LegendItem>
          <LegendItem>
            <LegendColor $color={theme.colors.primaryDark} />
            <span>Past</span>
          </LegendItem>
        </Legend>
      </CalendarCard>
    </CalendarWrapper>
  );
}
