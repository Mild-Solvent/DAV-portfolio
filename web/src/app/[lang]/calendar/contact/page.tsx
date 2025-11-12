'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import SiteHeader from '@/components/Header/Header';
import { motion } from 'framer-motion';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${theme.colors.primary};
  padding-top: 140px;
  padding-bottom: 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50vh;
    background: radial-gradient(ellipse at top, rgba(163, 113, 247, 0.12) 0%, transparent 60%),
                radial-gradient(ellipse at bottom left, rgba(31, 111, 235, 0.08) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const FormCard = styled(motion.div)`
  background: linear-gradient(145deg, rgba(22, 27, 34, 0.95) 0%, rgba(13, 17, 23, 0.98) 100%);
  border: 1px solid rgba(88, 166, 255, 0.25);
  border-radius: ${theme.borderRadius.xl};
  padding: ${theme.spacing['3xl']};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
              0 0 50px rgba(88, 166, 255, 0.15),
              inset 0 1px 0 rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${theme.gradients.hero};
    opacity: 0.6;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: 800;
  background: ${theme.gradients.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: ${theme.spacing.lg};
  letter-spacing: -0.02em;
`;

const SelectedDate = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, rgba(31, 111, 235, 0.15) 0%, rgba(88, 166, 255, 0.1) 100%);
  border: 1px solid rgba(88, 166, 255, 0.3);
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.accent};
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(88, 166, 255, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  color: ${theme.colors.text};
`;

const Input = styled.input`
  background: linear-gradient(135deg, rgba(48, 54, 61, 0.5) 0%, rgba(33, 38, 45, 0.6) 100%);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.primary};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: rgba(48, 54, 61, 0.7);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.15),
                0 4px 20px rgba(88, 166, 255, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const TextArea = styled.textarea`
  background: linear-gradient(135deg, rgba(48, 54, 61, 0.5) 0%, rgba(33, 38, 45, 0.6) 100%);
  border: 1px solid rgba(48, 54, 61, 0.8);
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  font-family: ${theme.fonts.primary};
  min-height: 180px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    background: rgba(48, 54, 61, 0.7);
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.15),
                0 4px 20px rgba(88, 166, 255, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: ${theme.colors.textMuted};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: ${theme.fontSizes.base};
  font-weight: 700;
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: ${theme.fonts.primary};
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
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover:not(:disabled)::before {
    width: 300%;
    height: 300%;
  }

  ${props => props.$variant === 'primary' ? `
    background: linear-gradient(135deg, ${theme.colors.secondary} 0%, ${theme.colors.secondaryDark} 100%);
    border: 1px solid ${theme.colors.accent};
    color: ${theme.colors.white};
    box-shadow: 0 4px 15px rgba(88, 166, 255, 0.3);

    &:hover:not(:disabled) {
      box-shadow: 0 6px 25px rgba(88, 166, 255, 0.4),
                  0 0 30px rgba(88, 166, 255, 0.2);
      transform: translateY(-2px);
    }
  ` : `
    background: linear-gradient(135deg, rgba(48, 54, 61, 0.6) 0%, rgba(33, 38, 45, 0.7) 100%);
    border: 1px solid rgba(88, 166, 255, 0.3);
    color: ${theme.colors.text};

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(48, 54, 61, 0.8) 0%, rgba(33, 38, 45, 0.9) 100%);
      border-color: ${theme.colors.accent};
      box-shadow: 0 4px 15px rgba(88, 166, 255, 0.2);
      transform: translateY(-2px);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
`;

const ErrorMessage = styled.div`
  background: rgba(248, 81, 73, 0.1);
  border: 1px solid ${theme.colors.danger};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  color: ${theme.colors.danger};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.md};
`;

const SuccessMessage = styled.div`
  background: rgba(63, 185, 80, 0.1);
  border: 1px solid ${theme.colors.success};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.md};
  color: ${theme.colors.success};
  font-size: ${theme.fontSizes.sm};
  margin-top: ${theme.spacing.md};
`;

export default function ContactFormPage() {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'sk';

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dateStr = sessionStorage.getItem('selectedDate');
      if (dateStr) {
        const date = new Date(dateStr);
        setSelectedDate(date.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));
      } else {
        // No date selected, redirect to calendar
        window.location.href = `/${lang}/calendar`;
      }
    }
  }, [lang]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.phone || !formData.message) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: sessionStorage.getItem('selectedDate')
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ email: '', phone: '', message: '' });
      
      setTimeout(() => {
        sessionStorage.removeItem('selectedDate');
        router.push(`/${lang}/calendar`);
      }, 3000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem('selectedDate');
    router.push(`/${lang}/calendar`);
  };

  return (
    <>
      <SiteHeader />
      <PageWrapper>
        <Container>
          <FormCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          <FormHeader>
            <Title>Contact Form</Title>
            {selectedDate && <SelectedDate>{selectedDate}</SelectedDate>}
          </FormHeader>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                disabled={loading || success}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+421 XXX XXX XXX"
                required
                disabled={loading || success}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message *</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your inquiry..."
                required
                disabled={loading || success}
              />
            </FormGroup>

            <ButtonGroup>
              <Button
                type="button"
                $variant="secondary"
                onClick={handleCancel}
                disabled={loading || success}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                $variant="primary"
                disabled={loading || success}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </ButtonGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && (
              <SuccessMessage>
                Message sent successfully! Redirecting back to calendar...
              </SuccessMessage>
            )}
          </Form>
          </FormCard>
        </Container>
      </PageWrapper>
    </>
  );
}
