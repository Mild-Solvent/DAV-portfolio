'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { motion, AnimatePresence } from 'framer-motion';

// --- Styled Components ---

const CalendarWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.md};
  }
  
  @media (max-width: 480px) {
    padding: ${theme.spacing.sm};
  }
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
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.xl};
    border-radius: ${theme.borderRadius.lg};
  }
  
  @media (max-width: 480px) {
    padding: ${theme.spacing.lg};
  }
  
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
  
  @media (max-width: 768px) {
    font-size: ${theme.fontSizes['2xl']};
  }
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
  
  &:hover {
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border-color: ${theme.colors.accent};
    color: ${theme.colors.white};
    transform: translateY(-2px);
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
  position: relative;
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border-color: ${theme.colors.accent};
    color: ${theme.colors.white};
    transform: scale(1.08) translateY(-2px);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
  padding: ${theme.spacing.md};
`;

const Popup = styled(motion.div)`
  background: linear-gradient(145deg, rgba(22, 27, 34, 0.98) 0%, rgba(13, 17, 23, 1) 100%);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['2xl']};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
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

  @media (max-width: 480px) {
    padding: ${theme.spacing.lg};
  }
`;

const PopupHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const PopupTitle = styled.h3`
  font-size: ${theme.fontSizes['2xl']};
  font-weight: 700;
  background: ${theme.gradients.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.xs};
`;

const PopupSubtitle = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const StepDot = styled.div<{ $active: boolean; $completed: boolean }>`
  width: ${props => props.$active ? '30px' : '10px'};
  height: 10px;
  border-radius: 5px;
  background: ${props => props.$active || props.$completed ? theme.colors.accent : theme.colors.border};
  transition: all 0.3s ease;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.md};
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const OptionButton = styled.button<{ $selected?: boolean }>`
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${props => props.$selected ? theme.colors.accent : theme.colors.border};
  background: ${props => props.$selected
    ? `linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%)`
    : 'rgba(48, 54, 61, 0.4)'
  };
  color: ${theme.colors.text};
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: ${theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.text};
`;

const Input = styled.input`
  background: rgba(13, 17, 23, 0.6);
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.base};
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.2);
  }
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const TypeCard = styled.div<{ $selected: boolean }>`
  border: 1px solid ${props => props.$selected ? theme.colors.accent : theme.colors.border};
  background: ${props => props.$selected ? 'rgba(31, 111, 235, 0.1)' : 'rgba(48, 54, 61, 0.2)'};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  &:hover {
    border-color: ${theme.colors.accent};
    background: rgba(31, 111, 235, 0.05);
  }

  span {
    font-size: 2rem;
  }
  
  strong {
    color: ${theme.colors.text};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  
  ${props => props.$variant === 'primary' ? `
    background: ${theme.gradients.blue};
    border: none;
    color: white;
    box-shadow: 0 4px 12px rgba(31, 111, 235, 0.3);
    
    &:hover:not(:disabled) {
      box-shadow: 0 6px 16px rgba(31, 111, 235, 0.4);
      transform: translateY(-1px);
    }
  ` : `
    background: transparent;
    border: 1px solid ${theme.colors.border};
    color: ${theme.colors.text};
    
    &:hover {
      border-color: ${theme.colors.textSecondary};
      background: rgba(255,255,255,0.05);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LocationOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: ${theme.colors.surfaceLight};
  border-radius: ${theme.borderRadius.md};
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.fontSizes.sm};
  
  input {
    accent-color: ${theme.colors.accent};
  }
`;

const ConfirmationBox = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  
  div {
    font-size: 4rem;
    margin-bottom: ${theme.spacing.md};
  }
  
  h3 {
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    color: ${theme.colors.textSecondary};
  }
`;

// --- Logic ---

type Step = 'time' | 'type' | 'details' | 'success';
type MeetingType = 'online' | 'person';
type LocationPreference = 'custom' | 'tbd';

export default function ContactCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [step, setStep] = useState<Step>('time');

  // Form State
  const [selectedTime, setSelectedTime] = useState('');
  const [meetingType, setMeetingType] = useState<MeetingType>('online');
  const [locationPref, setLocationPref] = useState<LocationPreference>('tbd');
  const [customAddress, setCustomAddress] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calendar Helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleDateClick = (day: number) => {
    const date = new Date(year, month, day);
    if (date < today) return;

    setSelectedDate(date);
    setIsPopupOpen(true);
    setStep('time');
    setSelectedTime('');
  };

  const handleNext = () => {
    if (step === 'time' && selectedTime) setStep('type');
    else if (step === 'type') setStep('details');
  };

  const handleBack = () => {
    if (step === 'type') setStep('time');
    else if (step === 'details') setStep('type');
    else if (step === 'time') setIsPopupOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);

    // Format Message
    const formattedDate = selectedDate.toLocaleDateString('sk-SK', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    let locationString = '';
    if (meetingType === 'online') {
      locationString = '💻 Online (Link will be sent)';
    } else {
      locationString = locationPref === 'custom'
        ? `📍 In Person: ${customAddress}`
        : '📍 In Person: To be decided later';
    }

    const message = `
🌟 New Booking Request 🌟

👤 **User Details**
Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'N/A'}

🗓️ **Meeting Info**
Date: ${formattedDate}
Time: ${selectedTime}
Type: ${meetingType === 'online' ? 'Online Meeting' : 'In-Person Meeting'}

${locationString}
    `.trim();

    try {
      await fetch('https://formspree.io/f/mrbowvke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `New Meeting: ${formData.name} @ ${formattedDate}`,
          message: message,
          date: formattedDate,
          time: selectedTime,
          type: meetingType
        }),
      });
      setStep('success');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Calendar Grid
  const renderDays = () => {
    const days = [];
    const prevMonthDays = new Date(year, month, 0).getDate();

    // Prev Month Padding
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(<DayCell key={`prev-${i}`} $isOtherMonth>{prevMonthDays - i}</DayCell>);
    }

    // Current Month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate?.getDate() === d && selectedDate?.getMonth() === month;

      days.push(
        <DayCell
          key={d}
          $isPast={isPast}
          $isToday={isToday}
          $isSelected={isSelected}
          onClick={() => !isPast && handleDateClick(d)}
        >
          {d}
        </DayCell>
      );
    }
    return days;
  };

  return (
    <CalendarWrapper>
      <CalendarCard>
        <CalendarHeader>
          <NavButton onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>←</NavButton>
          <MonthTitle>{monthNames[month]} {year}</MonthTitle>
          <NavButton onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>→</NavButton>
        </CalendarHeader>

        <DaysHeader>
          {dayNames.map(d => <DayLabel key={d}>{d}</DayLabel>)}
        </DaysHeader>

        <DaysGrid>{renderDays()}</DaysGrid>
      </CalendarCard>

      <AnimatePresence>
        {isPopupOpen && (
          <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsPopupOpen(false)}>
            <Popup onClick={e => e.stopPropagation()} initial={{ scale: 0.95 }} animate={{ scale: 1 }}>

              {step !== 'success' && (
                <>
                  <PopupHeader>
                    <PopupTitle>Book a Meeting</PopupTitle>
                    <PopupSubtitle>
                      {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </PopupSubtitle>
                  </PopupHeader>

                  <StepIndicator>
                    <StepDot $active={step === 'time'} $completed={step !== 'time'} />
                    <StepDot $active={step === 'type'} $completed={step === 'details'} />
                    <StepDot $active={step === 'details'} $completed={false} />
                  </StepIndicator>
                </>
              )}

              {step === 'time' && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  <TimeGrid>
                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                      <OptionButton
                        key={t}
                        $selected={selectedTime === t}
                        onClick={() => setSelectedTime(t)}
                      >
                        {t}
                      </OptionButton>
                    ))}
                  </TimeGrid>
                </motion.div>
              )}

              {step === 'type' && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  <TypeGrid>
                    <TypeCard $selected={meetingType === 'online'} onClick={() => setMeetingType('online')}>
                      <span>💻</span>
                      <strong>Online</strong>
                    </TypeCard>
                    <TypeCard $selected={meetingType === 'person'} onClick={() => setMeetingType('person')}>
                      <span>🤝</span>
                      <strong>In Person</strong>
                    </TypeCard>
                  </TypeGrid>

                  {meetingType === 'person' && (
                    <LocationOptions>
                      <RadioLabel>
                        <input
                          type="radio"
                          name="loc"
                          checked={locationPref === 'custom'}
                          onChange={() => setLocationPref('custom')}
                        />
                        Custom Address (Bratislava)
                      </RadioLabel>

                      {locationPref === 'custom' && (
                        <Input
                          placeholder="Enter address (e.g. Eurovea)"
                          value={customAddress}
                          onChange={e => setCustomAddress(e.target.value)}
                          autoFocus
                          style={{ marginTop: '8px' }}
                        />
                      )}

                      <RadioLabel>
                        <input
                          type="radio"
                          name="loc"
                          checked={locationPref === 'tbd'}
                          onChange={() => setLocationPref('tbd')}
                        />
                        Decide Later (Via Email)
                      </RadioLabel>
                    </LocationOptions>
                  )}
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                  <FormGrid>
                    <FormGroup>
                      <Label>Full Name</Label>
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email Address</Label>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Company (Optional)</Label>
                      <Input
                        placeholder="Acme Corp"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                      />
                    </FormGroup>
                  </FormGrid>
                </motion.div>
              )}

              {step === 'success' && (
                <ConfirmationBox>
                  <div>🎉</div>
                  <h3>Booking Confirmed!</h3>
                  <p>We have received your request. Check your email for details.</p>
                  <Button $variant="secondary" style={{ marginTop: '20px' }} onClick={() => setIsPopupOpen(false)}>
                    Close
                  </Button>
                </ConfirmationBox>
              )}

              {step !== 'success' && (
                <ActionButtons>
                  <Button onClick={handleBack} disabled={step === 'time'}>
                    Back
                  </Button>
                  <Button
                    $variant="primary"
                    onClick={step === 'details' ? handleSubmit : handleNext}
                    disabled={
                      (step === 'time' && !selectedTime) ||
                      (step === 'details' && (!formData.name || !formData.email || isSubmitting)) ||
                      (step === 'type' && meetingType === 'person' && locationPref === 'custom' && !customAddress)
                    }
                  >
                    {step === 'details' ? (isSubmitting ? 'Booking...' : 'Book Now') : 'Next'}
                  </Button>
                </ActionButtons>
              )}

            </Popup>
          </Overlay>
        )}
      </AnimatePresence>
    </CalendarWrapper>
  );
}
