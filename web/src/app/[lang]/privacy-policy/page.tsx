'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  min-height: 100vh;
  padding-top: 120px;
  background: ${props => props.theme.colors.background};
  position: relative;
  overflow-x: hidden;
`;

// Background glow effects
const BackgroundGlow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(31, 111, 235, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 6s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 30%;
    right: 20%;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(88, 166, 255, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 8s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(120deg); }
    66% { transform: translateY(10px) rotate(240deg); }
  }
`;

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 700px;
    padding: 0 ${props => props.theme.spacing.lg};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.md};
  }
`;

const ContentCard = styled(motion.div)`
  background: rgba(22, 27, 34, 0.8);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(48, 54, 61, 0.5);
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing['4xl']};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: ${props => props.theme.gradients.blue};
    opacity: 0.6;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    padding: ${props => props.theme.spacing['3xl']};
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing['2xl']};
    border-radius: ${props => props.theme.borderRadius.lg};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing['4xl']};
`;

const Title = styled(motion.h1)`
  font-family: ${props => props.theme.fonts.display};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.xl};
  background: ${props => props.theme.gradients.blue};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(88, 166, 255, 0.2);
`;

const LastUpdated = styled(motion.p)`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSizes.sm};
  font-weight: 500;
  opacity: 0.8;
`;

const Content = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.7;
  font-size: ${props => props.theme.fontSizes.base};
  
  h2 {
    color: ${props => props.theme.colors.textEmphasis};
    font-family: ${props => props.theme.fonts.display};
    font-size: ${props => props.theme.fontSizes['2xl']};
    font-weight: 600;
    margin: ${props => props.theme.spacing['3xl']} 0 ${props => props.theme.spacing.xl} 0;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 40px;
      height: 2px;
      background: ${props => props.theme.gradients.blue};
      border-radius: ${props => props.theme.borderRadius.full};
    }
    
    &:first-of-type {
      margin-top: ${props => props.theme.spacing['2xl']};
    }
  }
  
  p {
    margin-bottom: ${props => props.theme.spacing.xl};
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.fontSizes.base};
    line-height: 1.7;
  }
  
  strong {
    color: ${props => props.theme.colors.textEmphasis};
    font-weight: 600;
  }
  
  a {
    color: ${props => props.theme.colors.accent};
    text-decoration: none;
    font-weight: 500;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${props => props.theme.colors.accentDark};
      border-bottom-color: ${props => props.theme.colors.accent};
    }
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background: rgba(88, 166, 255, 0.1);
  color: ${props => props.theme.colors.accent};
  border: 1px solid rgba(88, 166, 255, 0.3);
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  backdrop-filter: blur(8px);
  
  &:hover {
    background: rgba(88, 166, 255, 0.15);
    border-color: rgba(88, 166, 255, 0.5);
    transform: translateX(-4px);
    box-shadow: 0 8px 25px rgba(88, 166, 255, 0.15);
  }
  
  &::before {
    content: '←';
    font-size: ${props => props.theme.fontSizes.lg};
  }
`;

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${props => props.theme.spacing['2xl']};
`;

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export default function PrivacyPolicy() {
  return (
    <PageContainer>
      <BackgroundGlow />
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ContentCard
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <Header>
            <Title
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Privacy Policy
            </Title>
            <LastUpdated
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              Last updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </LastUpdated>
          </Header>
          
          <Content>
            <h2>1. Data Controller</h2>
            <p>
              <strong>DAV Development</strong>, based in Bratislava, Slovakia (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is the controller of personal data processed through this website (davdev.eu). Contact: <a href="mailto:dav.development.official@gmail.com">dav.development.official@gmail.com</a>, phone: +421 918 139 035.
            </p>

            <h2>2. What Data We Collect</h2>
            <p>
              We only process personal data that you voluntarily provide to us:
            </p>
            <ul>
              <li><strong>Contact form / booking form:</strong> name, email address, phone number (optional), subject, message content and any project details you submit.</li>
              <li><strong>Communication data:</strong> the content of emails or messages you send to us directly.</li>
              <li><strong>Technical data:</strong> language preference stored in your browser&apos;s local storage solely to remember your language choice.</li>
            </ul>
            <p>
              We do <strong>not</strong> use marketing cookies, advertising trackers, or third-party analytics scripts (such as Google Analytics, Meta Pixel, etc.).
            </p>

            <h2>3. Legal Basis &amp; Purpose</h2>
            <p>
              We process your personal data on the following legal bases under Regulation (EU) 2016/679 (GDPR) and Slovak Act No. 18/2018 Coll. on the Protection of Personal Data:
            </p>
            <ul>
              <li><strong>Art. 6(1)(b) GDPR – performance of a contract / pre-contractual steps:</strong> to respond to your inquiry, prepare a quote, or deliver our services.</li>
              <li><strong>Art. 6(1)(f) GDPR – legitimate interest:</strong> to maintain security of the website and respond to legitimate business communication.</li>
              <li><strong>Art. 6(1)(c) GDPR – legal obligation:</strong> to comply with accounting, tax and other statutory obligations.</li>
            </ul>

            <h2>4. Storage Period</h2>
            <p>
              We keep personal data only as long as necessary for the purpose for which it was collected:
            </p>
            <ul>
              <li>Inquiries that do not lead to a contract: up to 6 months.</li>
              <li>Inquiries that lead to a contract: for the duration of the contract and up to 10 years afterwards (statutory accounting period under Slovak law).</li>
              <li>Language preference (local storage): until you clear your browser data.</li>
            </ul>

            <h2>5. Recipients of Data</h2>
            <p>
              Personal data may be shared with the following categories of recipients, only to the extent strictly necessary:
            </p>
            <ul>
              <li><strong>Email and hosting providers</strong> (e.g. Google Workspace / Gmail) used to receive and store your messages.</li>
              <li><strong>Hosting and infrastructure providers</strong> for the website itself.</li>
              <li><strong>Accountants, tax advisors and legal advisors</strong> bound by professional confidentiality.</li>
              <li><strong>Public authorities</strong> where required by law.</li>
            </ul>
            <p>
              We do not sell your personal data and do not transfer it outside the EU/EEA unless an appropriate safeguard under Chapter V of the GDPR is in place (e.g. EU Standard Contractual Clauses).
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Under the GDPR you have the following rights, which you can exercise at any time by writing to <a href="mailto:dav.development.official@gmail.com">dav.development.official@gmail.com</a>:
            </p>
            <ul>
              <li>Right of access (Art. 15)</li>
              <li>Right to rectification (Art. 16)</li>
              <li>Right to erasure / &quot;right to be forgotten&quot; (Art. 17)</li>
              <li>Right to restriction of processing (Art. 18)</li>
              <li>Right to data portability (Art. 20)</li>
              <li>Right to object to processing (Art. 21)</li>
              <li>Right to withdraw consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal</li>
              <li>Right to lodge a complaint with the supervisory authority: <strong>Úrad na ochranu osobných údajov SR</strong>, Hraničná 12, 820 07 Bratislava 27, <a href="https://dataprotection.gov.sk" target="_blank" rel="noopener noreferrer">dataprotection.gov.sk</a></li>
            </ul>

            <h2>7. Cookies &amp; Local Storage</h2>
            <p>
              This website uses only technically necessary local storage to remember your language preference. It does not place advertising or analytics cookies. No consent is required for strictly necessary storage under §55(5) of the Slovak Electronic Communications Act.
            </p>

            <h2>8. Security</h2>
            <p>
              We implement appropriate technical and organisational measures (TLS encryption, access controls, regular updates) to protect your personal data against unauthorised access, loss or disclosure.
            </p>

            <h2>9. Children</h2>
            <p>
              Our services are not directed to children under 16. We do not knowingly process personal data of children without parental consent.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. The current version is always available on this page with the &quot;Last updated&quot; date above. Material changes will be communicated where appropriate.
            </p>
          </Content>
        </ContentCard>
        
        <BackButtonContainer>
          <Link href="/" passHref legacyBehavior>
            <BackButton
              as="a"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </BackButton>
          </Link>
        </BackButtonContainer>
      </Container>
    </PageContainer>
  );
}
