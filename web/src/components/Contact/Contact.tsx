import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';

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

const ContactIcon = styled.div`
  width: 48px;
  height: 48px;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.fontSizes.xl};
  color: ${props => props.theme.colors.white};
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

const SocialLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  justify-content: center;

  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

const SocialLink = styled.a`
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 2px solid transparent;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899);
    border-radius: 14px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    background: rgba(59, 130, 246, 0.1);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Message sent! Thank you for your interest.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <ContactSection id="contact">
      <Container>
        <SectionHeading
          title="Contact Me"
        />

        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Let&apos;s work together</h3>
            <p>
              Do you have an interesting project or need help with web development? Don&apos;t hesitate to contact me. I&apos;d be happy to discuss your ideas and create something amazing together.
            </p>

            <ContactDetails>
              <ContactItem>
                <ContactIcon>📧</ContactIcon>
                <ContactText>
                  <h4>Email</h4>
                  <p>hello@portfolio.sk</p>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>📱</ContactIcon>
                <ContactText>
                  <h4>Phone</h4>
                  <p>+421 914 229 122</p>
                </ContactText>
              </ContactItem>

              <ContactItem>
                <ContactIcon>📍</ContactIcon>
                <ContactText>
                  <h4>Location</h4>
                  <p>Bratislava, Slovakia</p>
                </ContactText>
              </ContactItem>
            </ContactDetails>

            <SocialLinks>
              <SocialLink
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
              >
                💼
              </SocialLink>
              
              <SocialLink
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙
              </SocialLink>
              
              <SocialLink
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐦
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSubmit}
          >
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">Subject</Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Message"
              />
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? '...' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact;