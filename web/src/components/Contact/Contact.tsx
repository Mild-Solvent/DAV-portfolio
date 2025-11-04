import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { SectionHeading } from '../shared';
import { useTranslation } from '../../contexts/TranslationContext';

const ContactSection = styled.section`
  padding: ${props => props.theme.spacing['4xl']} 0;
  background: ${props => props.theme.colors.primary};
  min-height: 100vh;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(180deg, 
      rgba(0, 210, 255, 0.3) 0%, 
      rgba(58, 123, 213, 0.25) 20%, 
      rgba(0, 184, 148, 0.2) 40%, 
      rgba(0, 206, 201, 0.15) 60%, 
      rgba(9, 132, 227, 0.1) 80%, 
      transparent 100%
    );
    filter: blur(8px);
    opacity: 0.7;
    animation: pulse-glow-gradient 4s ease-in-out infinite;
    pointer-events: none;
  }
  
  @keyframes pulse-glow-gradient {
    0%, 100% {
      opacity: 0.7;
      filter: blur(8px);
      transform: scaleY(1);
    }
    50% {
      opacity: 1;
      filter: blur(12px);
      transform: scaleY(1.2);
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 1;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${props => props.theme.spacing['4xl']};
  align-items: start;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing['2xl']};
  }
`;

const ContactInfo = styled(motion.div)`
  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: ${props => props.theme.spacing.xl};
    font-size: ${props => props.theme.fontSizes['2xl']};
  }

  p {
    font-size: ${props => props.theme.fontSizes.lg};
    line-height: 1.6;
    margin-bottom: ${props => props.theme.spacing.xl};
  }
`;

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;


const ContactText = styled.div`
  h4 {
    color: ${props => props.theme.colors.text};
    margin-bottom: ${props => props.theme.spacing.xs};
    font-size: ${props => props.theme.fontSizes.lg};
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

const ContactForm = styled(motion.form)`
  background: ${props => props.theme.colors.backgroundLight};
  padding: ${props => props.theme.spacing['2xl']};
  border-radius: ${props => props.theme.borderRadius.lg};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundLight};
  border: 2px solid transparent;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.base};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  background: ${props => props.theme.colors.backgroundLight};
  border: 2px solid transparent;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.base};
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 25%, #00b894 50%, #00cec9 75%, #0984e3 100%);
  color: ${props => props.theme.colors.white};
  border: none;
  padding: ${props => props.theme.spacing.lg} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-size: ${props => props.theme.fontSizes.lg};
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(0, 210, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s;
  }
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #00b8d4 0%, #2962ff 25%, #00a085 50%, #00acc1 75%, #1565c0 100%);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 8px 25px rgba(0, 210, 255, 0.5),
      0 0 20px rgba(0, 184, 148, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active:not(:disabled) {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.6);
  }

  &:disabled {
    background: linear-gradient(135deg, #a4a4a4 0%, #757575 100%);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    opacity: 0.7;
    
    &::before {
      display: none;
    }
  }
  
  /* Pulsing animation for emphasis */
  &:not(:disabled) {
    animation: pulse-glow 3s infinite;
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(0, 210, 255, 0.4);
    }
    50% {
      box-shadow: 
        0 4px 15px rgba(0, 210, 255, 0.6),
        0 0 20px rgba(0, 184, 148, 0.2);
    }
  }
`;


const StatusMessage = styled.div<{ status: 'success' | 'error' }>`
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  text-align: center;
  animation: slideIn 0.3s ease-out;
  
  background: ${props => props.status === 'success' 
    ? 'rgba(34, 197, 94, 0.1)' 
    : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.status === 'success' 
    ? '#22c55e' 
    : '#ef4444'};
  border: 1px solid ${props => props.status === 'success' 
    ? 'rgba(34, 197, 94, 0.2)' 
    : 'rgba(239, 68, 68, 0.2)'};
    
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const response = await fetch('https://formspree.io/f/mrbowvke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(t('contact.form.success'));
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(t('contact.form.error'));
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionHeading
          title={t('contact.title')}
        />

        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>{t('contact.subtitle')}</h3>
            <p>
              {t('contact.description')}
            </p>

            <ContactDetails>
              <ContactItem>
                <ContactText>
                  <h4>{t('contact.email')}</h4>
                  <p>dav.development.official@gmail.com</p>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactText>
                  <h4>{t('contact.phone')}</h4>
                  <p>+421 914 229 122</p>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactText>
                  <h4>{t('contact.location')}</h4>
                  <p>{t('contact.locationValue')}</p>
                </ContactText>
              </ContactItem>
            </ContactDetails>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            {submitStatus !== 'idle' && submitMessage && (
              <StatusMessage status={submitStatus as 'success' | 'error'}>
                {submitMessage}
              </StatusMessage>
            )}
            <FormGroup>
              <Label htmlFor="name">{t('contact.form.name')}</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t('contact.form.namePlaceholder')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">{t('contact.form.email')}</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t('contact.form.emailPlaceholder')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">{t('contact.form.subject')}</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder={t('contact.form.subjectPlaceholder')}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">{t('contact.form.message')}</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t('contact.form.messagePlaceholder')}
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;