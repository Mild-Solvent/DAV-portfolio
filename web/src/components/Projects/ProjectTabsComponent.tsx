import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TabsContainer = styled.div`
  width: 100%;
  margin-bottom: ${props => props.theme.spacing['3xl']};
`;

const TabsList = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing['2xl']};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: ${props => props.theme.spacing.sm};
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background: ${props => props.$active 
    ? props.theme.colors.accent 
    : 'transparent'};
  color: ${props => props.$active 
    ? props.theme.colors.primary 
    : props.theme.colors.textSecondary};
  border: 1px solid ${props => props.$active 
    ? props.theme.colors.accent 
    : props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active 
      ? props.theme.colors.accent 
      : props.theme.colors.surfaceLight};
    border-color: ${props => props.theme.colors.accent};
    color: ${props => props.$active 
      ? props.theme.colors.primary 
      : props.theme.colors.accent};
  }
  
  @media (max-width: 768px) {
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
    font-size: ${props => props.theme.fontSizes.sm};
  }
`;

const TabContent = styled(motion.div)`
  width: 100%;
`;

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ProjectTabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ tabs, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <TabsContainer>
      <TabsList>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsList>
      
      <AnimatePresence mode="wait">
        <TabContent
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTabContent}
        </TabContent>
      </AnimatePresence>
    </TabsContainer>
  );
};

export default ProjectTabs;
