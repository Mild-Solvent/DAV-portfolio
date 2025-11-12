'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { motion, AnimatePresence } from 'framer-motion';

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

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing.xl};
`;

const Popup = styled(motion.div)`
  background: linear-gradient(145deg, rgba(22, 27, 34, 0.98) 0%, rgba(13, 17, 23, 1) 100%);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  max-width: 500px;
  width: 100%;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.6),
              0 0 60px rgba(88, 166, 255, 0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.gradients.blue};
  }
`;

const PopupTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  background: ${theme.gradients.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const TimeButton = styled.button<{ $selected?: boolean }>`
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${props => props.$selected ? theme.colors.accent : 'rgba(48, 54, 61, 0.8)'};
  background: ${props => props.$selected 
    ? `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%)`
    : 'linear-gradient(135deg, rgba(48, 54, 61, 0.4) 0%, rgba(33, 38, 45, 0.5) 100%)'
  };
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border-color: ${theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);
  }
  
  ${props => props.$selected && `
    box-shadow: 0 4px 20px rgba(88, 166, 255, 0.4);
  `}
`;

const PopupButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const PopupButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-weight: 700;
  font-size: ${theme.fontSizes.base};
  cursor: pointer;
  transition: all 0.3s;
  
  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border: 1px solid ${theme.colors.accent};
    color: ${theme.colors.white};
    box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);
    
    &:hover {
      box-shadow: 0 6px 25px rgba(88, 166, 255, 0.4);
      transform: translateY(-2px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  ` : `
    background: rgba(48, 54, 61, 0.6);
    border: 1px solid rgba(88, 166, 255, 0.2);
    color: ${theme.colors.text};
    
    &:hover {
      background: rgba(48, 54, 61, 0.8);
      border-color: ${theme.colors.accent};
    }
  `}
`;

const ConfirmationText = styled.p`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
  text-align: center;
  line-height: 1.6;
  margin-bottom: ${theme.spacing.lg};
`;

const ConfirmationAddress = styled.div`
  background: linear-gradient(135deg, rgba(31, 111, 235, 0.1) 0%, rgba(88, 166, 255, 0.05) 100%);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  text-align: center;
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.accent};
  box-shadow: 0 4px 15px rgba(88, 166, 255, 0.2);
`;

export default function ContactCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setShowTimePicker(true);
  };

  const handleTimeSubmit = async () => {
    if (!selectedTime || !selectedDate) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          time: selectedTime,
        }),
      });

      if (response.ok) {
        setShowTimePicker(false);
        setShowConfirmation(true);
        
        setTimeout(() => {
          setShowConfirmation(false);
          setSelectedDate(null);
          setSelectedTime('');
        }, 5000);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
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
      const isSelected = selectedDate
        ? selectedDate.getDate() === day &&
          selectedDate.getMonth() === month &&
          selectedDate.getFullYear() === year
        : undefined;
      
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

      {/* Time Picker Popup */}
      <AnimatePresence>
        {showTimePicker && selectedDate && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTimePicker(false)}
          >
            <Popup
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <PopupTitle>
                Vyberte čas pre {selectedDate.toLocaleDateString('sk-SK', { day: 'numeric', month: 'long' })}
              </PopupTitle>
              
              <TimeGrid>
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                  <TimeButton
                    key={time}
                    $selected={selectedTime === time}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </TimeButton>
                ))}
              </TimeGrid>
              
              <PopupButtons>
                <PopupButton
                  $variant="secondary"
                  onClick={() => {
                    setShowTimePicker(false);
                    setSelectedTime('');
                  }}
                >
                  Zrušiť
                </PopupButton>
                <PopupButton
                  $variant="primary"
                  onClick={handleTimeSubmit}
                  disabled={!selectedTime || isSubmitting}
                >
                  {isSubmitting ? 'Odosielam...' : 'Potvrdiť'}
                </PopupButton>
              </PopupButtons>
            </Popup>
          </Overlay>
        )}
      </AnimatePresence>

      {/* Confirmation Popup */}
      <AnimatePresence>
        {showConfirmation && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Popup
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <PopupTitle>✨ Rezervácia potvrdená!</PopupTitle>
              <ConfirmationText>
                Tešíme sa na vás na adrese:
              </ConfirmationText>
              <ConfirmationAddress>
                📍 Mliekárenská 1<br />
                (zvonček Kováč)
              </ConfirmationAddress>
            </Popup>
          </Overlay>
        )}
      </AnimatePresence>
    </CalendarWrapper>
  );
}
