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
    right: 25%;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(163, 113, 247, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 7s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 25%;
    left: 15%;
    width: 180px;
    height: 180px;
    background: radial-gradient(circle, rgba(63, 185, 80, 0.06) 0%, transparent 70%);
    border-radius: 50%;
    animation: float 9s ease-in-out infinite reverse;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-25px) rotate(120deg); }
    66% { transform: translateY(15px) rotate(240deg); }
  }
`;

const Container = styled(motion.div)`
  max-width: 950px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.xl};
  position: relative;
  z-index: 10;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    max-width: 750px;
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
    background: ${props => props.theme.gradients.purple};
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
  background: ${props => props.theme.gradients.purple};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgba(163, 113, 247, 0.2);
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
      background: ${props => props.theme.gradients.purple};
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
  
  ul {
    margin-bottom: ${props => props.theme.spacing.xl};
    padding-left: ${props => props.theme.spacing.xl};
    list-style: none;
    position: relative;
    
    li {
      margin-bottom: ${props => props.theme.spacing.md};
      color: ${props => props.theme.colors.textSecondary};
      position: relative;
      padding-left: ${props => props.theme.spacing.lg};
      
      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: ${props => props.theme.colors.done};
        font-weight: 600;
      }
    }
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
  background: rgba(163, 113, 247, 0.1);
  color: ${props => props.theme.colors.done};
  border: 1px solid rgba(163, 113, 247, 0.3);
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
    background: rgba(163, 113, 247, 0.15);
    border-color: rgba(163, 113, 247, 0.5);
    transform: translateX(-4px);
    box-shadow: 0 8px 25px rgba(163, 113, 247, 0.15);
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

export default function TermsAndConditions() {
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
              Terms & Conditions
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
            <h2>1. Provider</h2>
            <p>
              These Terms &amp; Conditions (&quot;Terms&quot;) govern the use of the website <strong>davdev.eu</strong> and the services offered by <strong>DAV Development</strong>, based in Bratislava, Slovakia (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;). Contact: <a href="mailto:dav.development.official@gmail.com">dav.development.official@gmail.com</a>, phone: +421 918 139 035.
            </p>

            <h2>2. Acceptance of Terms</h2>
            <p>
              By accessing the website or submitting a contact / booking form, you confirm that you have read, understood and agree to be bound by these Terms. If you do not agree, please do not use the website.
            </p>

            <h2>3. Services Offered</h2>
            <p>
              The website presents information about the services we provide, including but not limited to: web development, mobile application development, UI/UX design, SaaS development, e-commerce solutions, hosting and DevOps. The website itself is informational; concrete services are delivered only on the basis of a separate written or electronic agreement (e.g. via email confirmation, signed contract or order).
            </p>

            <h2>4. Inquiries, Quotes and Contracts</h2>
            <ul>
              <li>Information published on the website (including the price calculator) is for guidance only and does not constitute a binding offer within the meaning of §43a of the Slovak Civil Code.</li>
              <li>A binding contract is concluded only after we confirm the order or specification in writing (including email).</li>
              <li>For consumers (Act No. 102/2014 Coll.) we will provide all statutory pre-contractual information, including the right of withdrawal where applicable.</li>
            </ul>

            <h2>5. Permitted Use of the Website</h2>
            <p>You may browse the website for personal and lawful business purposes. You agree not to:</p>
            <ul>
              <li>use the website in any way that violates applicable law;</li>
              <li>attempt to gain unauthorised access, scrape, mass-download, or disrupt the site;</li>
              <li>submit false, misleading, illegal or harmful content through forms;</li>
              <li>introduce viruses, malware, or other harmful code.</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
              All content on this website (texts, graphics, layout, logo, source code, animations, illustrations, calculator logic, etc.) is the intellectual property of DAV Development or its licensors and is protected by Slovak Act No. 185/2015 Coll. (Copyright Act) and applicable EU and international law. Any reproduction, distribution, modification, or commercial use without prior written consent is prohibited.
            </p>
            <p>
              Third-party trademarks, logos and product names mentioned on the site (e.g. React, Next.js, Vue.js, Figma) remain the property of their respective owners and are used only descriptively.
            </p>

            <h2>7. External Links</h2>
            <p>
              The website may contain links to third-party websites. We are not responsible for the content, availability, or privacy practices of any third-party websites and do not endorse them.
            </p>

            <h2>8. Availability and Changes</h2>
            <p>
              We strive to keep the website available, but we provide no guarantee of uninterrupted, error-free or fully secure operation. We reserve the right to modify, suspend or discontinue any part of the website (or change these Terms) at any time, without prior notice.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, DAV Development is not liable for any indirect, incidental, consequential or punitive damages arising out of or in connection with the use of (or inability to use) the website or the information published on it. Nothing in these Terms limits our liability for damage caused intentionally or by gross negligence, or for any liability that cannot be excluded under Slovak law.
            </p>

            <h2>10. Personal Data</h2>
            <p>
              Processing of personal data submitted through the website is described in our <a href="./privacy-policy">Privacy Policy</a> and is performed in accordance with the GDPR and Slovak Act No. 18/2018 Coll.
            </p>

            <h2>11. Consumer Dispute Resolution (ARS)</h2>
            <p>
              If you are a consumer and you believe your rights have been violated, you may turn to the alternative dispute resolution body, such as the <strong>Slovak Trade Inspection (SOI)</strong>, Bajkalská 21/A, 827 99 Bratislava, <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer">www.soi.sk</a>, or use the EU Online Dispute Resolution platform: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
            </p>

            <h2>12. Governing Law &amp; Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the Slovak Republic. Any disputes arising out of or in connection with these Terms shall fall under the jurisdiction of the competent Slovak courts, unless mandatory consumer-protection legislation provides otherwise.
            </p>

            <h2>13. Contact</h2>
            <p>
              For any questions regarding these Terms please contact us at <a href="mailto:dav.development.official@gmail.com">dav.development.official@gmail.com</a> or +421 918 139 035.
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

